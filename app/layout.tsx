import "./globals.css"; // 이 줄이 Tailwind를 불러오는 핵심입니다!
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "나의 식습관 동물 유형 테스트",
  description: "무의식적인 식습관 속에 숨겨진 당신의 진짜 동물을 찾아보세요.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
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