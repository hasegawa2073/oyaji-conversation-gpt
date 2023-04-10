import Script from 'next/script';
import './globals.css';

const title = 'おやじの会話GPT';
const description = 'おやじ2人が会話します。';
const ogImageURL = `${process.env.NEXT_PUBLIC_BASE_URL}/ogp.png`;

export const metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: title,
    images: [
      {
        url: ogImageURL,
        width: 1440,
        height: 940,
      },
    ],
    type: 'website',
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    creator: '@hasegawa2073',
    images: [ogImageURL],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      ></Script>
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `,
        }}
      ></Script>
      <body>{children}</body>
    </html>
  );
}
