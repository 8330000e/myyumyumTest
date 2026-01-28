import "./globals.css"; // 이 줄이 Tailwind를 불러오는 핵심입니다!

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}