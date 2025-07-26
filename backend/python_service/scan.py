import os
import pdfplumber
import csv
from flask import Flask, request, jsonify, render_template, send_file
from werkzeug.utils import secure_filename
from openai import OpenAI
from flask_cors import CORS

app = Flask(__name__)
CORS(app)



client = OpenAI(api_key="API_KEY")  

results = []

def chat_gpt(conversation):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=conversation
    )
    return response.choices[0].message.content

def pdf_to_text(file):
    text = ''
    with pdfplumber.open(file) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text
    return text

def update_csv(results):
    with open('results.csv', 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(["Resume Name", "Comments", "Suitability"])
        writer.writerows(results)

@app.route('/upload', methods=['POST'])
def upload_resume():
    global results
    resume_files = request.files.getlist('file[]')
    job_description = request.form['job_description']
    mandatory_keywords = request.form['mandatory_keywords']

    if not resume_files or not job_description or not mandatory_keywords:
        return jsonify({"error": "Missing required fields."}), 400

    results = []
    for resume_file in resume_files:
        filepath = os.path.join("uploads", secure_filename(resume_file.filename))
        resume_file.save(filepath)
        resume_text = pdf_to_text(filepath)

        conversation = [
            {"role": "system", "content": "You are a helpful assistant specialized in recruitment and talent management."},
            {"role": "user", "content": f"Mandatory keywords: {mandatory_keywords}"},
            {"role": "user", "content": f"Is this resume suitable for the job? Job description: {job_description}, Resume: {resume_text} (also at the end of the prompt write is the candidate Suitable, Not Suitable or Maybe Suitable. This label is mandatory.)"}
        ]

        response = chat_gpt(conversation).replace('\n', ' ')
        label = "Suitable"
        if "not suitable" in response.lower():
            label = "Not Suitable"
        elif "maybe suitable" in response.lower():
            label = "Maybe Suitable"

        results.append([resume_file.filename, response, label])
        os.remove(filepath)

    return jsonify({"results": results})

@app.route('/download_csv', methods=['GET'])
def download_csv():
    update_csv(results)
    return send_file('results.csv', as_attachment=True)

if __name__ == '__main__':
    os.makedirs("uploads", exist_ok=True)
    app.run(debug=True, port=5002)