"use client";

import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { RESULTS } from "@/data/results";
import { QUESTIONS } from "@/data/questions";
import { calculateResult } from "@/utils/calculate"; // 이전에 만든 계산 함수

export default function TestPage() {
  // 1. Hook들은 무조건 여기 최상단에 모아두어야 합니다!
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false); // 로딩 상태를 여기로 이동
  const router = useRouter();

  // 브라우저 타이틀 설정은 useEffect 안에서 하는 게 정석입니다.
  useEffect(() => {
    document.title = "테스트 진행 중... | 식습관 동물 테스트";
  }, []);

  const handleAnswer = async (answerIndex: number) => {
    // async 추가
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      if (loading) return;
      setLoading(true);

      // 1. 결과 데이터 가져오기 (psy: 심리유형, beh: 행동유형)
      const { psy, beh } = calculateResult(newAnswers);

      // 2. 동물 이름 결정하기 (예시: 'psy-beh' 조합으로 동물 이름을 찾는 로직)
      // 만약 별도의 결과 매핑 객체가 있다면 그것을 사용하세요.
      // 예: const animalName = ANIMAL_DATA[psy][beh].name;
      const animalTitle = RESULTS[psy][beh].name; // 일단 유형 코드로 저장하거나, 실제 이름을 넣으세요!

      // 3. Supabase에 저장
      const { error } = await supabase.from("test_results").insert([
        {
          created_at: new Date(),
          result: animalTitle,
          psy_type: psy,
          beh_type: beh,
          answers: newAnswers, // 👈 새로 추가한 컬럼에 데이터 넣기!
        },
      ]);

      if (!error) {
        router.push(`/result?psy=${psy}&beh=${beh}`);
      } else {
        // 에러 상세 내용을 알림창에 띄워보세요!
        alert(`저장 실패: ${error.message}`);
        setLoading(false);
      }
    }
  };

  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const currentQuestion = QUESTIONS[step];

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-12">
      {/* 상단 프로그레스 바 */}
      <div className="max-w-md mx-auto w-full mb-12">
        <div className="flex justify-between items-end mb-3 font-black">
          <span className="text-emerald-600 text-2xl">
            {step + 1} <span className="text-slate-200 text-lg">/ 12</span>
          </span>
          <span className="text-slate-400 text-xs">식습관 분석 중...</span>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 질문 카드 */}
      <div className="max-w-md mx-auto w-full flex-grow flex flex-col justify-center">
        {/* sub 텍스트 추가 */}
        <p className="text-emerald-500 font-bold text-sm mb-2">
          {currentQuestion.sub}
        </p>
        <h2 className="text-[26px] font-black text-slate-900 mb-10 leading-tight break-keep">
          {currentQuestion.question}
        </h2>

        {/* 선택지 버튼 */}
        <div className="space-y-4">
          {currentQuestion.answers.map((answerText, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)} // 몇 번째 버튼인지 idx를 넘김
              className="w-full p-5 text-left bg-white border-2 border-slate-100 rounded-2xl text-slate-700 font-bold text-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all active:scale-[0.97] shadow-sm shadow-slate-100"
            >
              {answerText}
            </button>
          ))}
        </div>
      </div>

      {/* 하단 안내 */}
      <div className="max-w-md mx-auto w-full mt-12 text-center">
        <p className="text-slate-300 text-xs font-bold tracking-widest uppercase">
          Thinking about your eating habits
        </p>
      </div>
    </div>
  );
}
