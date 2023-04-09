import './globals.css';

export const metadata = {
  title: '居酒屋の会話GPT',
  description: '',
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
