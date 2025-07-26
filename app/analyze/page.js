// 'use client';

// import { useState } from 'react';

// const suitabilityScore = (label) => {
//   if (label === "Suitable") return 90;
//   if (label === "Maybe Suitable") return 60;
//   return 20;
// };

// export default function AnalyzePage() {
//   const [file, setFile] = useState(null);
//   const [jobDescription, setJobDescription] = useState('');
//   const [mandatoryKeywords, setMandatoryKeywords] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!file || !jobDescription || !mandatoryKeywords) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file[]', file);
//     formData.append('job_description', jobDescription);
//     formData.append('mandatory_keywords', mandatoryKeywords);

//     setLoading(true);

//     try {
//       const res = await fetch('http://localhost:5002/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       console.log("🟢 API response:", res);

//       const data = await res.json();
//       console.log("🟢 JSON parsed:", data);

//       setResults(data.results || []);
//     } catch (error) {
//       console.error("❌ Server error:", error);
//       alert("Server error: " + (error.message || "Unknown error"));
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-8 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Resume Analyzer</h1>

//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="file"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           required
//         />

//         <textarea
//           placeholder="Job description"
//           value={jobDescription}
//           onChange={(e) => setJobDescription(e.target.value)}
//           className="border p-2"
//           rows={4}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Mandatory keywords (comma-separated)"
//           value={mandatoryKeywords}
//           onChange={(e) => setMandatoryKeywords(e.target.value)}
//           className="border p-2"
//           required
//         />

//         <button type="submit" className="btn-filled w-fit">
//           {loading ? 'Analyzing...' : 'Analyze'}
//         </button>
//       </form>

//       {results.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-xl font-semibold mb-4">Results</h2>

//           {results.map((result, index) => (
//             <div key={index} className="p-4 border rounded mb-6 bg-white shadow-sm">
//               <p className="text-lg font-semibold">📄 {result[0]}</p>

//               <div className="mt-2">
//                 <span
//                   className={`inline-block px-2 py-1 rounded text-white text-xs font-semibold ${
//                     result[2] === "Suitable"
//                       ? "bg-green-600"
//                       : result[2] === "Maybe Suitable"
//                       ? "bg-yellow-500"
//                       : "bg-red-600"
//                   }`}
//                 >
//                   {result[2]}
//                 </span>
//               </div>

//               <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
//                 <div
//                   className={`h-4 rounded-full ${
//                     result[2] === "Suitable"
//                       ? "bg-green-500"
//                       : result[2] === "Maybe Suitable"
//                       ? "bg-yellow-500"
//                       : "bg-red-500"
//                   }`}
//                   style={{ width: `${suitabilityScore(result[2])}%` }}
//                 ></div>
//               </div>

//               <details className="mt-4 cursor-pointer bg-gray-50 p-2 rounded">
//                 <summary className="font-semibold text-sm text-gray-700">
//                   GPT Evaluation (Click to Expand)
//                 </summary>
//                 <p className="text-sm mt-2">{result[1]}</p>
//               </details>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }




'use client';

import { useState } from 'react';

const suitabilityScore = (label) => {
  if (label === "Suitable") return 90;
  if (label === "Maybe Suitable") return 60;
  return 20;
};

export default function AnalyzePage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [mandatoryKeywords, setMandatoryKeywords] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !jobDescription || !mandatoryKeywords) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append('file[]', file);
    formData.append('job_description', jobDescription);
    formData.append('mandatory_keywords', mandatoryKeywords);

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5002/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      alert("Server error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    
    <div className="p-6 max-w-6xl mx-auto">

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Resume Panel */}
        <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Resume</h2>
          {file ? (
            <div className="mb-2 text-sm text-gray-800">{file.name}</div>
          ) : (
            <p className="italic text-sm text-gray-400">No file selected.</p>
          )}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="mt-2"
            required
          />
        </div>

        {/* Job Description Panel */}
        <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
          <h2 className="font-semibold text-lg mb-2">Job Description</h2>
          <textarea
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="border p-2 w-full h-40 text-sm"
            required
          />
        </div>

        {/* Mandatory Keywords */}
        <div className="md:col-span-2">
          <input
            type="text"
            placeholder="Mandatory keywords (comma-separated)"
            value={mandatoryKeywords}
            onChange={(e) => setMandatoryKeywords(e.target.value)}
            className="border p-2 w-full text-sm"
            required
          />
        </div>

        {/* Submit */}
      <div className="md:col-span-2 flex justify-center">
       {/* Submit */}
<div className="md:col-span-2 flex justify-center">
  <button
    type="submit"
    className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded font-semibold shadow-md transition-all hover:opacity-90"
    disabled={loading} // analiz sırasında tekrar tıklanmasın
  >
    Scan
  </button>
</div>

        </div>
      </form>

      {/* Results */}
      {results.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          {results.map((result, index) => (
            <div key={index} className="p-4 border rounded mb-6 bg-white shadow">
              <p className="text-lg font-semibold">📄 {result[0]}</p>

              <span
                className={`inline-block mt-2 px-2 py-1 rounded text-white text-xs font-semibold ${
                  result[2] === "Suitable"
                    ? "bg-green-600"
                    : result[2] === "Maybe Suitable"
                    ? "bg-yellow-500"
                    : "bg-red-600"
                }`}
              >
                {result[2]}
              </span>

              <div className="mt-2 w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`h-4 rounded-full ${
                    result[2] === "Suitable"
                      ? "bg-green-500"
                      : result[2] === "Maybe Suitable"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${suitabilityScore(result[2])}%` }}
                ></div>
              </div>

              <details className="mt-4 cursor-pointer bg-gray-50 p-2 rounded">
                <summary className="font-semibold text-sm text-gray-700">
                  GPT Evaluation (Click to Expand)
                </summary>
                <p className="text-sm mt-2">{result[1]}</p>
              </details>
            </div>
          ))}
        </div>
      )}
      
    </div>
    
    
  );
}

