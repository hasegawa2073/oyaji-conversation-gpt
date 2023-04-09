import './globals.css';

const title = 'おやじの会話GPT';
const description = 'おやじ2人が会話します。';
const ogImageURL = `${process.env.NEXT_PUBLIC_BASE_URL}/opg.png`;

export const metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    images: [
      {
        url: ogImageURL,
        width: 1440,
        height: 940,
      },
    ],
  },
  icons: {
    icon: '/icon.png',
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
      <body>{children}</body>
    </html>
  );
}
