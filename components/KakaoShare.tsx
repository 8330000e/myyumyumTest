"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    Kakao: any;
  }
}

export default function KakaoShare({ type }: { type: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;

  useEffect(() => {
    // SDK 로드 확인용 인터벌
    const checkKakao = setInterval(() => {
      if (typeof window !== "undefined" && window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
        }
        setIsLoaded(true);
        clearInterval(checkKakao);
      }
    }, 100);

    return () => clearInterval(checkKakao);
  }, []);

  const shareToKakao = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    if (!isLoaded || !window.Kakao) {
      alert("카카오 공유를 준비 중입니다. 잠시만 기다려 주세요!");
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: "나의 식습관 동물 유형 테스트",
        description: `내 식습관은 [${type}] 유형! 당신은 어떤 동물인가요?`,
        imageUrl: `${baseUrl}/share-image.png`,
        link: {
          mobileWebUrl: `${baseUrl}/share-image.png`,
          webUrl: `${baseUrl}/share-image.png`,
        },
      },
      buttons: [
        {
          title: "나도 테스트해보기", // 버튼은 시작 페이지로 유도
          link: {
            mobileWebUrl: baseUrl,
            webUrl: baseUrl,
          },
        },
        {
          title: "결과 자세히 보기", // 결과가 궁금한 사람을 위해 결과 페이지 유지
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return (
    <button
      onClick={shareToKakao}
      className={`flex items-center justify-center gap-2 py-5 rounded-[2rem] font-bold text-xl shadow-md transition-all active:scale-95 w-full ${
        isLoaded
          ? "bg-[#FEE500] text-[#3c1e1e] cursor-pointer" // ✅ 여기에 cursor-pointer 추가!
          : "bg-slate-200 text-slate-400 cursor-not-allowed" // 로딩 중엔 금지 아이콘
      }`}
    >
      <span className="text-xl">💬</span>{" "}
      {isLoaded ? "카톡 공유" : "로딩 중..."}
    </button>
  );
}
