
// 'use client';

// import Link from 'next/link';
// import ImgTilt from './ImgTilt';
// import { IoIosRocket } from 'react-icons/io';
// import { FaUserCircle } from 'react-icons/fa';
// import { useState, useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// const Page = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const router = useRouter();
//   const dropdownRef = useRef();
//   const [isRegistering, setIsRegistering] = useState(false);


//  useEffect(() => {
//   const accessToken = localStorage.getItem('accessToken'); // ✅ DOĞRU ANAHTAR
//   if (accessToken) {
//     setIsLoggedIn(true);
//   }

//   const handleClickOutside = (e) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//       setDropdownOpen(false);
//     }
//   };

//   document.addEventListener('mousedown', handleClickOutside);
//   return () => document.removeEventListener('mousedown', handleClickOutside);
// }, []);

// const handleSaveToProfile = async () => {
//   const token = localStorage.getItem('accessToken');
//   if (!token) return alert('Giriş yapmalısınız.');

//   try {
//     // 1. Dosyayı backend'e yükle
//     const formData = new FormData();
//     formData.append('file', resumeBlob, 'resume.pdf'); // 👈 PDF blob’un varsa burada

//     const uploadRes = await fetch('http://localhost:5001/api/cv/upload', {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });

//     if (!uploadRes.ok) throw new Error('Yükleme başarısız');

//     const { filename } = await uploadRes.json(); // backend dosya adını döndürüyor

//     // 2. Veritabanına filename'i kaydet
//     const saveRes = await fetch('http://localhost:5001/api/cv/save', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ filename }),
//     });

//     if (!saveRes.ok) throw new Error('Veritabanı kaydı başarısız');

//     alert('✅ Profilinize başarıyla kaydedildi!');
//   } catch (err) {
//     console.error('Kaydetme hatası:', err);
//     alert('❌ Kaydedilemedi: ' + err.message);
//   }
// };
//  const handleRegister = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post('http://localhost:5001/api/auth/register', {
//       email,
//       password,
//     });

//     localStorage.setItem('accessToken', response.data.accessToken);
//     localStorage.setItem('refreshToken', response.data.refreshToken);

//     setSuccess('Kayıt başarılı!');
//     setError('');
//     setIsLoggedIn(true);
//   } catch (err) {
//     setError(err.response?.data?.error || 'Sunucu hatası.');
//     setSuccess('');
//   }
// };

//   const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     const response = await axios.post('http://localhost:5001/api/auth/login', {
//       email,
//       password,
//     });

//     // ✅ Yeni sistem: iki token'ı kaydet
//     localStorage.setItem('accessToken', response.data.accessToken);
//     localStorage.setItem('refreshToken', response.data.refreshToken);

//     setSuccess('Giriş başarılı!');
//     setError('');
//     setIsLoggedIn(true);
//   } catch (err) {
//     setError(err.response?.data?.error || 'Sunucu hatası.');
//     setSuccess('');
//   }
// };


// const handleLogout = () => {
//   localStorage.removeItem('accessToken');
//   localStorage.removeItem('refreshToken');
//   setIsLoggedIn(false);
//   setDropdownOpen(false);
// };


//   return (
//     <>
//       {/* Profil İkonu ve Dropdown */}
//       {isLoggedIn && (
//         <div className="absolute top-4 right-4 z-50" ref={dropdownRef}>
//           <div
//             className="cursor-pointer"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//             title="Profil"
//           >
//             <FaUserCircle
//   size={36}
//   className="text-primary-500 hover:text-primary-700 transition"
//  />
//           </div>
//           {dropdownOpen && (
//             <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
//               <button
//                 onClick={() => router.push('/profile')}
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Profile
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       )}{!isLoggedIn && (
//   <div className="absolute top-4 right-20 z-50 bg-white p-2 rounded-lg shadow-lg w-52 border border-gray-200">
//     <form
//       onSubmit={isRegistering ? handleRegister : handleLogin}
//       className="flex flex-col gap-2"
//     >
//       <h2 className="text-sm font-semibold text-gray-800 text-center">
//         {isRegistering ? 'Register' : 'Login'}
//       </h2>

//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         className="px-2 py-1 text-[10px] rounded border border-gray-300 focus:outline-none focus:ring-[1px] focus:ring-blue-300"
//         required
//       />

//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//         className="px-2 py-1 text-[10px] rounded border border-gray-300 focus:outline-none focus:ring-[1px] focus:ring-blue-300"
//         required
//       />

//       <button
//         type="submit"
//         className="bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 text-white font-semibold py-1 text-xs rounded-md shadow transition-all duration-200"
//       >
//         {isRegistering ? 'Register' : 'Login'}
//       </button>

//       {error && <p className="text-red-500 text-[10px] text-center">{error}</p>}
//       {success && <p className="text-green-500 text-[10px] text-center">{success}</p>}

//       <p
//         className="text-[10px] text-gray-500 hover:underline text-center cursor-pointer"
//         onClick={() => {
//           setIsRegistering(!isRegistering);
//           setError('');
//           setSuccess('');
//         }}
//       >
//         {isRegistering
//           ? 'Already have an account? Login'
//           : 'Don’t have an account? Register'}
//       </p>
//     </form>
//   </div>
// )}


//       {/* Ana İçerik */}
//       <div className="mx-auto flex h-full min-h-[calc(100vh-5rem)] max-w-screen-xl flex-col-reverse items-center justify-center gap-8 overflow-hidden px-3 py-6 text-center md:flex-row md:justify-between md:text-left">
//         <div>
//           <h4 className="text-base md:text-xl">
//             <span className="text-gradient">Smart Resume Creation & Instant Analysis</span>
//           </h4>
//           <h1 className="text-3xl md:mt-2 md:text-4xl 2xl:text-[2.75rem] ">
//             <span className="text-gradient">AI-Powered Resume Builder & Analyzer</span>
//           </h1>
//           <p className="mt-3 max-w-screen-sm text-sm text-gray-300 md:mt-10 md:text-lg">
//             ResuAI is an open-source platform designed to help you create and analyze professional resumes with ease. 
//   No sign-up or login required — just enter your information, export your CV as a clean A4 PDF, and get instant feedback with our AI-powered analyzer. 
//   Optimize your resume for success in seconds!
      
//           </p>

//           <div className="mt-8 flex flex-col items-center justify-start gap-3 md:mt-16 md:flex-row md:gap-8">
//             <Link href="/editor" className="btn-filled w-full md:w-auto">
//               <span>Create My Resume</span>
//               <IoIosRocket />
//             </Link>
//             <Link href="/analyze" className="btn w-full md:w-auto">
//               <span>Analyze Resume</span>
//             </Link>
//           </div>
//         </div>
//         <div>
//           <ImgTilt>
//             <img src="/sample.png" />
//           </ImgTilt>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;





'use client';

import Link from 'next/link';
import ImgTilt from './ImgTilt';
import { IoIosRocket } from 'react-icons/io';
import { FaUserCircle } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Page = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const dropdownRef = useRef();
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setIsLoggedIn(true);
    }

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/register', {
        email,
        password,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      setSuccess('Registration successful!');
      setError('');
      setIsLoggedIn(true);
    } catch (err) {
      const errorMsg = err.response?.data?.error;
      if (errorMsg === 'Email is already registered.') {
        setError('This email is already in use. Please login or use a different one.');
      } else {
        setError(errorMsg || 'Server error.');
      }
      setSuccess('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      setSuccess('Login successful!');
      setError('');
      setIsLoggedIn(true);
    } catch (err) {
      const errorMsg = err.response?.data?.error;
      if (errorMsg === 'User not found.') {
        setError('No account found with this email.');
      } else if (errorMsg === 'Incorrect password.') {
        setError('Wrong password. Please try again.');
      } else {
        setError(errorMsg || 'Server error.');
      }
      setSuccess('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
    setDropdownOpen(false);
  };

  const handleSaveToProfile = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return alert('You need to be logged in.');

    try {
      const formData = new FormData();
      formData.append('file', resumeBlob, 'resume.pdf'); // 👈 Replace with your actual blob

      const uploadRes = await fetch('http://localhost:5001/api/cv/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!uploadRes.ok) throw new Error('Upload failed.');

      const { filename } = await uploadRes.json();

      const saveRes = await fetch('http://localhost:5001/api/cv/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filename }),
      });

      if (!saveRes.ok) throw new Error('Database save failed.');

      alert('✅ Successfully saved to your profile!');
    } catch (err) {
      console.error('Save error:', err);
      alert('❌ Save failed: ' + err.message);
    }
  };

  return (
    <>
      {/* Profile Dropdown */}
      {isLoggedIn && (
        <div className="absolute top-4 right-4 z-50" ref={dropdownRef}>
          <div
            className="cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            title="Profile"
          >
            <FaUserCircle size={36} className="text-primary-500 hover:text-primary-700 transition" />
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2">
             
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {/* Login/Register Form */}
      {!isLoggedIn && (
        <div className="absolute top-4 right-20 z-50 bg-white p-2 rounded-lg shadow-lg w-52 border border-gray-200">
          <form
            onSubmit={isRegistering ? handleRegister : handleLogin}
            className="flex flex-col gap-2"
          >
            <h2 className="text-sm font-semibold text-gray-800 text-center">
              {isRegistering ? 'Register' : 'Login'}
            </h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="px-2 py-1 text-[10px] rounded border border-gray-300 focus:outline-none focus:ring-[1px] focus:ring-blue-300"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="px-2 py-1 text-[10px] rounded border border-gray-300 focus:outline-none focus:ring-[1px] focus:ring-blue-300"
              required
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 text-white font-semibold py-1 text-xs rounded-md shadow transition-all duration-200"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>

            {error && <p className="text-red-500 text-[10px] text-center">{error}</p>}
            {success && <p className="text-green-500 text-[10px] text-center">{success}</p>}

            <p
              className="text-[10px] text-gray-500 hover:underline text-center cursor-pointer"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
                setSuccess('');
              }}
            >
              {isRegistering
                ? 'Already have an account? Login'
                : 'Don’t have an account? Register'}
            </p>
          </form>
        </div>
      )}

      {/* Landing Content */}
      <div className="mx-auto flex h-full min-h-[calc(100vh-5rem)] max-w-screen-xl flex-col-reverse items-center justify-center gap-8 overflow-hidden px-3 py-6 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <h4 className="text-base md:text-xl">
            <span className="text-gradient">Smart Resume Creation & Instant Analysis</span>
          </h4>
          <h1 className="text-3xl md:mt-2 md:text-4xl 2xl:text-[2.75rem]">
            <span className="text-gradient">AI-Powered Resume Builder & Analyzer</span>
          </h1>
          <p className="mt-3 max-w-screen-sm text-sm text-gray-300 md:mt-10 md:text-lg">
         ResuAI helps you create and analyze professional resumes with ease.
         Sign up, enter your information, preview and export your CV as a clean A4 PDF — then get instant feedback with our AI-powered analyzer.
         Optimize your resume for success in seconds!
          </p>

          <div className="mt-8 flex flex-col items-center justify-start gap-3 md:mt-16 md:flex-row md:gap-8">
            <Link href="/editor" className="btn-filled w-full md:w-auto">
              <span>Create My Resume</span>
              <IoIosRocket />
            </Link>
            <Link href="/analyze" className="btn w-full md:w-auto">
              <span>Analyze Resume</span>
            </Link>
          </div>
        </div>
        <div>
          <ImgTilt>
            <img src="/sample.png" alt="Resume Sample" />
          </ImgTilt>
        </div>
      </div>
    </>
  );
};

export default Page;
