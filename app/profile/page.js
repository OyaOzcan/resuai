// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Document, Page, pdfjs } from 'react-pdf';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// export default function ProfilePage() {
//   const [cvList, setCvList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pdfBlobs, setPdfBlobs] = useState({});

//   useEffect(() => {
//     const fetchCVs = async () => {
//       const token = localStorage.getItem('accessToken');
//       if (!token) return;

//       try {
//         const res = await axios.get('http://localhost:5001/api/cv/history', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setCvList(res.data);
//       } catch (err) {
//         console.error('CV geçmişi alınamadı:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCVs();
//   }, []);
// useEffect(() => {
//   const fetchPDFs = async () => {
//     for (const cv of cvList) {
//       try {
//         console.log('➡️ PDF isteği atılıyor:', cv.filename);
//         const res = await axios.get(`http://localhost:5001/uploads/${cv.filename}`, {
//           responseType: 'blob',
//         });
//         const blobUrl = URL.createObjectURL(res.data);
//         console.log('✅ Blob URL:', blobUrl);

//         setPdfBlobs(prev => ({
//           ...prev,
//           [cv._id]: blobUrl,
//         }));
//       } catch (error) {
//         console.error(`❌ PDF indirilemedi (${cv.filename}):`, error);
//       }
//     }
//   };

//   if (cvList.length > 0) {
//     fetchPDFs();
//   } else {
//     console.warn('⚠️ cvList boş.');
//   }
// }, [cvList]);

//   return (
//     <div className="max-w-6xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6 text-center">📄 Profil Sayfası</h1>

//       {loading ? (
//         <p className="text-center">Yükleniyor...</p>
//       ) : cvList.length === 0 ? (
//         <p className="text-center">Henüz kaydedilmiş bir CV yok.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {cvList.map((cv) => (
//             <div
//               key={cv._id}
//               className="bg-white p-4 shadow rounded flex flex-col items-center"
//             >
//               <h2 className="font-semibold text-center text-sm mb-2">{cv.filename}</h2>

//               <div className="w-full flex justify-center bg-gray-100 rounded overflow-hidden mb-3 min-h-[250px]">
//                 {pdfBlobs[cv._id] ? (
//                   <Document
//                     file={pdfBlobs[cv._id]}
//                     onLoadError={(err) => console.error('PDF yüklenemedi:', err)}
//                   >
//                     <Page pageNumber={1} width={200} />
//                   </Document>
//                 ) : (
//                   <p className="text-sm text-gray-400">Yükleniyor...</p>
//                 )}
//               </div>

//               <p className="text-xs text-gray-500 mb-2">
//                 Oluşturulma: {new Date(cv.createdAt).toLocaleString()}
//               </p>

//               <div className="flex gap-4">
//                 <a
//                   href={`http://localhost:5001/uploads/${cv.filename}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-blue-600 hover:underline"
//                 >
//                   Preview 👁️
//                 </a>
//                 <a
//                   href={`http://localhost:5001/uploads/${cv.filename}`}
//                   download
//                   className="text-green-600 hover:underline"
//                 >
//                   Download ⬇️
//                 </a>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
