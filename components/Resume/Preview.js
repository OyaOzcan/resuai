
'use client';

import { useEffect, useRef } from 'react';
import Resume from './pdf';
import { useSelector } from 'react-redux';
import { CgSpinner } from 'react-icons/cg';
import saveCV from '@/utils/saveCV';

import { usePDF } from '@react-pdf/renderer';
import { Document, Page, pdfjs } from 'react-pdf';
import { FaDownload, FaEye } from 'react-icons/fa6';

pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

const Loader = () => (
  <div className="flex min-h-96 w-full items-center justify-center">
    <CgSpinner className="mx-auto mt-16 animate-spin text-center text-4xl text-primary-400 md:text-5xl" />
  </div>
);


const preview = (url) => {
  window.open(
    url,
    'Resume Preview',
    `toolbar=no, location=no, menubar=no, scrollbars=no, status=no, titlebar=no, resizable=no, width=600, height=800, left=${window.innerWidth / 2 - 300}, top=100`,
  );
};
const Preview = () => {
  const parentRef = useRef(null);
  const resumeData = useSelector((state) => state.resume);
  const document = <Resume data={resumeData} />;
  const [instance, updateInstance] = usePDF({ document });

  const filename = `${resumeData.contact?.name || 'resume'}_${Date.now()}.pdf`; // 🔧 Buraya taşıdık

  useEffect(() => {
    if (resumeData.saved) updateInstance(document);
  }, [resumeData.saved]);
const handleSaveOnProfile = async () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    alert('Giriş yapmalısınız');
    return;
  }

  try {
    const blobRes = await fetch(instance.url);
    const blob = await blobRes.blob();

    const filename = `${resumeData.contact?.name || 'resume'}_${Date.now()}.pdf`;
    const formData = new FormData();
    formData.append('file', blob, filename);

    const saveRes = await fetch('http://localhost:5001/api/cv/save', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!saveRes.ok) throw new Error('Kayıt başarısız');

    alert('✅ Profilinize kaydedildi!');
  } catch (err) {
    console.error(err);
    alert('❌ Hata: ' + err.message);
  }
};

  return (
    <div ref={parentRef} className="relative w-full md:max-w-[24rem] 2xl:max-w-[28rem]">
      {instance.loading ? (
        <Loader />
      ) : (
        <Document loading={<Loader />} file={instance.url}>
          <Page
            pageNumber={1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            loading={<Loader />}
            width={parentRef.current?.clientWidth}
          />
        </Document>
      )}

      {!instance.loading && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <button onClick={() => preview(instance.url)} className="btn text-sm">
            <span>Preview</span>
            <FaEye />
          </button>

          <a
            href={instance.url}
            download={filename}
            className="btn text-sm"
            onClick={() => saveCV(filename)}
          >
            <span>Download</span>
            <FaDownload />
          </a>
<button
  onClick={handleSaveOnProfile}
  className="btn text-sm"
>
  <span>Save on Profile</span>
</button>

        </div>
      )}
    </div>
  );
};


export default Preview;

     