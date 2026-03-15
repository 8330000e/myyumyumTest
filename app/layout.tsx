import "./globals.css"; // 이 줄이 Tailwind를 불러오는 핵심입니다!
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "입맛저격! 뭐먹지?",
  description: "나의 식습관 동물 유형 테스트",
  openGraph: {
    title: "입맛저격! 뭐먹지?",
    description: "내 식습관은 어떤 동물 유형일까? 지금 테스트해보세요!",
    url: "https://your-project.vercel.app", // 실제 배포 주소
    siteName: "입맛저격",
    images: [
      {
        url: "/images/share-image.png", // public/images/main-thumbnail.jpg 경로에 이미지가 있어야 함
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        {children}
        {/* 카카오 SDK 로드 */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.0/kakao.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
