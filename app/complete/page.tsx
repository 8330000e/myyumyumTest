"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function CompletePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* 메인 카드 */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-slate-100 min-h-[550px] flex flex-col">
          {/* 상단: 축하/감사 헤더 */}
          <div className="text-center space-y-4 mb-8">
            <div className="text-6xl mb-6 animate-bounce">🎉</div>
            <h2 className="text-4xl font-black text-slate-900 leading-tight">
              설문에 참여해주셔서
              <br />
              진심으로 감사합니다!
            </h2>
            <div className="w-12 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          {/* 중간: 안내 메시지 */}
          <div className="space-y-6 text-center">
            <p className="text-xl text-slate-600 font-medium leading-relaxed">
              작성해주신 소중한 정보는 <br />
              <span className="text-slate-900 font-bold">
                더 나은 서비스 경험
              </span>
              을 위한
              <br />
              데이터 분석 프로젝트에 안전하게 사용됩니다.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <p className="text-base text-slate-500 italic">
                "당신의 더 건강한 식습관을 응원합니다!"
              </p>
            </div>
          </div>

          {/* 하단: 버튼 섹션 (mt-auto로 바닥에 밀착) */}
          <div className="mt-auto pt-10 space-y-4">
            <Link
              href="/"
              className="text-xl flex items-center justify-center py-5 bg-slate-900 text-white rounded-[2rem] font-bold text-lg hover:bg-emerald-600 shadow-lg shadow-slate-200 transition-all active:scale-95 w-full"
            >
              처음으로 돌아가기
            </Link>
          </div>
        </div>

        {/* 푸터 보조 링크 */}
        <p className="text-center mt-8 text-[11px] text-slate-400 font-black tracking-widest uppercase">
          Developed by jeminai with ㄱㅏ
        </p>
      </div>
    </div>
  );
}
