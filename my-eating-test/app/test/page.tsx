"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Question, EatingType } from '@/types';

const QUESTIONS: Question[] = [
    { id: 1, type: "fuel", text: "나는 배가 고프다는 신호가 올 때만 식사를 시작한다." },
    { id: 2, type: "emotional", text: "기분이 우울하거나 스트레스를 받으면 특정 음식이 강렬하게 당긴다." },
    { id: 3, type: "fog", text: "TV나 스마트폰을 보면서 먹다 보면 내가 얼마나 먹었는지 기억나지 않는다." },
    { id: 4, type: "intuitive", text: "나는 내 몸이 지금 어떤 영양소를 원하는지(예: 단백질, 신선한 야채 등) 잘 느낀다." },
    { id: 5, type: "fog", text: "배가 이미 부른데도 음식이 앞에 있으면 무의식적으로 손이 간다." },
    { id: 6, type: "fuel", text: "음식은 즐거움보다는 내 몸을 움직이게 하는 에너지원이라고 생각한다." },
    { id: 7, type: "emotional", text: "기쁜 일이 생기면 맛있는 음식을 먹으며 보상받고 싶은 마음이 크다." },
    { id: 8, type: "intuitive", text: "칼로리 숫자에 집착하기보다 먹고 나서 내 몸이 편안한 음식을 선택한다." },
    { id: 9, type: "fuel", text: "바쁠 때는 식사를 단순히 해결해야 할 '숙제'처럼 처리한다." },
    { id: 10, type: "fog", text: "입이 심심해서 과자나 간식을 먹기 시작하면 어느새 한 봉지를 다 비운다." },
    { id: 11, type: "emotional", text: "불안하거나 화가 날 때 먹는 행위가 나를 진정시켜준다고 느낀다." },
    { id: 12, type: "intuitive", text: "특정 음식을 '나쁜 음식'으로 규정하지 않고 적당히 즐겁게 먹는다." }
];

export default function TestPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [scores, setScores] = useState<Record<EatingType, number>>({
    fuel: 0, intuitive: 0, emotional: 0, fog: 0
  });

  const handleAnswer = (points: number) => {
    const currentType = QUESTIONS[step].type;
    const nextScores = { ...scores, [currentType]: scores[currentType] + points };

    if (step < QUESTIONS.length - 1) {
      setScores(nextScores);
      setStep(step + 1);
    } else {
      const winner = Object.keys(nextScores).reduce((a, b) => 
        nextScores[a as EatingType] > nextScores[b as EatingType] ? a : b
      ) as EatingType;
      router.push(`/result?type=${winner}`);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-emerald-50/50">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-xl">
        {/* Progress Bar */}
        <div className="mb-8 h-2 w-full rounded-full bg-gray-100">
          <div 
            className="h-2 rounded-full bg-emerald-500 transition-all duration-300" 
            style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>

        <h2 className="mb-10 text-center text-2xl font-bold text-gray-800 leading-tight">
          {QUESTIONS[step].text}
        </h2>

        <div className="flex flex-col gap-3">
          {[
            { label: "매우 그렇다", pts: 5 },
            { label: "그렇다", pts: 4 },
            { label: "보통이다", pts: 3 },
            { label: "아니다", pts: 2 },
            { label: "전혀 아니다", pts: 1 },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleAnswer(opt.pts)}
              className="w-full rounded-2xl border-2 border-gray-50 py-4 px-6 text-left font-medium text-gray-700 transition-all hover:border-emerald-200 hover:bg-emerald-50 active:scale-95"
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}