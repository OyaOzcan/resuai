import Header from '@/components/Header';
import './globals.scss';
import ReduxProvider from '@/store/ReduxProvider';

export const metadata = {
    title: 'Free Resume Maker | ResuAI',
    description:
        'Our tool helps you create a resume that works with job application systems. It makes sure you look good to employers.',
    openGraph: {
        title: 'ResuAI',
        images: `/banner.png`,
        icons: {
            icon: `/favicon.png`,
        },
        type: 'website',
    },
    alternates: {
        canonical: '/',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    <Header />
                    <div className="mx-auto min-h-[calc(100vh-3rem)]">
                        {children}
                    </div>
                </ReduxProvider>
            </body>
        </html>
    );
}
