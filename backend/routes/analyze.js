import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import fs from 'fs';
import path from 'path';
import { Configuration, OpenAIApi } from 'openai';
import jwt from 'jsonwebtoken';
import History from '../models/History.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// OpenAI yapılandırması
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// PDF dosyasını metne dönüştür
async function extractTextFromPDF(filePath) {
    const buffer = fs.readFileSync(filePath);
    const data = await pdfParse(buffer);
    return data.text;
}

// GPT çağrısı yapan fonksiyon
async function askGPT(messages) {
    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
    });
    return completion.data.choices[0].message.content;
}

// Analiz endpoint'i
router.post('/', upload.single('file[]'), async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const file = req.file;
        const { job_description, mandatory_keywords } = req.body;

        if (!file || !job_description || !mandatory_keywords) {
            return res.status(400).json({ message: 'Eksik bilgi gönderildi.' });
        }

        const filePath = path.resolve(file.path);
        const resumeText = await extractTextFromPDF(filePath);

        const conversation = [
            { role: 'system', content: 'You are a helpful assistant specialized in recruitment and talent management.' },
            { role: 'user', content: `Mandatory keywords: ${mandatory_keywords}` },
            { role: 'user', content: `Is this resume suitable for the job? Job description: ${job_description}, Resume: ${resumeText}. At the end, write: Suitable, Not Suitable, or Maybe Suitable.` }
        ];

        const gptResponse = await askGPT(conversation);
        const responseLower = gptResponse.toLowerCase();

        let suitability = 'Maybe Suitable';
        if (responseLower.includes('not suitable')) {
            suitability = 'Not Suitable';
        } else if (responseLower.includes('suitable')) {
            suitability = 'Suitable';
        }

        // Geçmişe kaydet
        const newHistory = new History({
            userId,
            fileName: file.originalname,
            suitability,
            gptComment: gptResponse,
        });

        await newHistory.save();
        fs.unlinkSync(filePath); // geçici dosyayı sil

        res.status(200).json({
            fileName: file.originalname,
            suitability,
            gptComment: gptResponse,
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Analiz sırasında bir hata oluştu.' });
    }
});

export default router;
