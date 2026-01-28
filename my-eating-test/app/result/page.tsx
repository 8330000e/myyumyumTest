"use client";
import { useSearchParams } from 'next/navigation';
import KakaoShare from '@/components/KakaoShare';
import { EatingType, ResultData } from '@/types';

const RESULTS: Record<EatingType, ResultData> = {
  fuel: { title: "에너지 뿜뿜 꿀벌", emoji: "🐝", animal: "꿀벌", color: "bg-yellow-400", desc: "먹는 건 오직 전진을 위한 동력! 효율 끝판왕이시군요." },
  intuitive: { title: "평화로운 먹보 판다", emoji: "🐼", animal: "판다", color: "bg-emerald-400", desc: "내 몸의 소리를 들을 줄 아는 진정한 식사의 고수입니다." },
  emotional: { title: "볼 빵빵 햄스터", emoji: "🐹", animal: "햄스터", color: "bg-pink-400", desc: "마음이 헛헛할 땐 입안 가득 행복을 채우는 타입이에요." },
  fog: { title: "무념무상 나무늘보", emoji: "🦥", animal: "나무늘보", color: "bg-purple-400", desc: "내가 뭘 먹었는지 모를 정도로 무의식에 맡긴 식사를 즐기시네요." },
};

export default function ResultPage() {
  const searchParams = useSearchParams();
  const type = (searchParams.get('type') as EatingType) || 'intuitive';
  const data = RESULTS[type];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
        <div className={`${data.color} py-12 text-center text-7xl`}>
          {data.emoji}
        </div>
        <div className="p-8 text-center">
          <h2 className="text-gray-500 font-bold uppercase tracking-widest">당신의 식습관 동물은?</h2>
          <h1 className="mt-2 text-4xl font-black text-gray-900">{data.title}</h1>
          
          <div className="my-8 rounded-2xl bg-gray-50 p-6 text-gray-600 leading-relaxed italic">
            "{data.desc}"
          </div>

          <KakaoShare title={data.title} description={data.desc} />
          
          {/* 설문조사 유도 섹션 */}
          <div className="mt-8 rounded-2xl border-2 border-dashed border-emerald-200 p-5 bg-emerald-50/30">
            <p className="text-sm font-semibold text-emerald-800 mb-3">더 정확한 테스트를 위해 30초만 투자해주세요! 🙏</p>
            <a href="설문링크" className="inline-block text-sm font-bold text-white bg-emerald-500 px-6 py-2 rounded-full">설문 참여하기</a>
          </div>
        </div>
      </div>
    </main>
  );
}