'use client';

import { useState } from 'react';

export default function UploadCV() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    const token = localStorage.getItem('accessToken');
    if (!selectedFile || !token) return alert('Dosya seçilmeli ve giriş yapılmalı.');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5001/api/cv/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('✅ Yükleme başarılı');
        window.location.reload(); 
      } else {
        setMessage(data.error || '❌ Hata oluştu');
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Sunucu hatası');
    }
  };

  return (
    <div className="mb-8 text-center">
      <input
        type="file"
        onChange={(e) => setSelectedFile(e.target.files[0])}
        accept="application/pdf"
        className="mb-2"
      />
      <br />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        CV Yükle
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
