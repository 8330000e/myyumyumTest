import "./globals.css"; // 이 줄이 Tailwind를 불러오는 핵심입니다!
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "내 식습관 유형은?",
  description: "나의 식습관 동물 유형 테스트",
  openGraph: {
    title: "내 식습관 유형은?",
    description: "내 식습관은 어떤 동물 유형일까? 지금 테스트해보세요!",
    url: "https://myyumyum-test.vercel.app/", // 실제 배포 주소
    siteName: "내 식습관 유형",
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
  twitter: {
    card: "summary_large_image", // 큰 이미지가 있는 카드 형태
    title: "내 식습관 유형은?",
    description: "내 식습관은 어떤 동물 유형일까? 지금 테스트해보세요!",
    images: ["/images/share-image.png"], // 트위터용 썸네일
    // creator: '@my_twitter_id', // 본인의 트위터 아이디가 있다면 추가
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
