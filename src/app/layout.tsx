import './globals.css';

export const metadata = {
  title: '居酒屋の会話GPT',
  description: '',
  images: [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/opg.png`,
      width: 1440,
      height: 940,
    },
  ],
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
