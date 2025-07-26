
import api from './axiosInstance'; 

const saveCV = async (filename) => {
  const token = localStorage.getItem('accessToken'); 
  if (!token) return;

  try {
    await api.post(
      'http://localhost:5001/api/cv/save',
      { filename },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (err) {
    console.error('CV kayıt hatası:', err.response?.data || err.message);
  }
};

export default saveCV;
