"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { RESULTS } from "@/data/results";
import { QUESTIONS } from "@/data/questions";
import { calculateResult } from "@/utils/calculate";

export default function TestPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [currentSelection, setCurrentSelection] = useState<number | null>(null); // 현재 단계의 선택 저장
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    document.title = "테스트 진행 중... | 식습관 동물 테스트";
  }, []);

  // 이전 버튼: 이전 답변을 answers에서 빼고 상태 복구
  const handlePrev = () => {
    if (step > 0) {
      const prevAnswers = [...answers];
      const lastSelection = prevAnswers.pop(); // 마지막 답변 제거
      setAnswers(prevAnswers);
      setCurrentSelection(lastSelection !== undefined ? lastSelection : null); // 이전 선택값 복원
      setStep(step - 1);
    }
  };

  // 다음 버튼 (최종 제출 포함)
  const handleNext = async () => {
    if (currentSelection === null) return;

    const newAnswers = [...answers, currentSelection];
    
    if (step < QUESTIONS.length - 1) {
      // 다음 질문으로 이동
      setAnswers(newAnswers);
      setStep(step + 1);
      setCurrentSelection(null); // 선택 초기화
    } else {
      // 마지막 질문 제출
      if (loading) return;
      setLoading(true);

      const { psy, beh } = calculateResult(newAnswers);
      const animalTitle = RESULTS[psy][beh].name;

      const { error } = await supabase.from("test_results").insert([
        {
          created_at: new Date(),
          result: animalTitle,
          psy_type: psy,
          beh_type: beh,
          answers: newAnswers,
        },
      ]);

      if (!error) {
        router.push(`/result?psy=${psy}&beh=${beh}`);
      } else {
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
      <div className="max-w-md mx-auto w-full">
        <div className="flex justify-between items-end mb-3 font-black">
          <span className="text-emerald-600 text-2xl">
            {step + 1} <span className="text-slate-200 text-lg">/ {QUESTIONS.length}</span>
          </span>
          <span className="text-slate-400 text-[13px] font-bold mb-[-5px]">
            {loading ? "결과 분석 중..." : "식습관 분석 중... 🥗"}
          </span>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 질문 카드 */}
      <div className="max-w-md mx-auto w-full mt-10 flex flex-col justify-center">
        <p className="text-emerald-500 font-black text-sm mb-2 ml-1">
          {currentQuestion.sub}
        </p>
        <h2 className="text-[28px] font-black text-slate-900 mb-10 leading-tight break-keep">
          {currentQuestion.question}
        </h2>

        {/* 체크리스트 스타일 선택지 */}
{/* 선택지: 박스 없이 버튼 전체의 상태 변화로만 표시 */}
<div className="space-y-3">
  {currentQuestion.answers.map((answerText, idx) => {
    const isSelected = currentSelection === idx;
    return (
      <button
        key={idx}
        onClick={() => setCurrentSelection(idx)}
        className={`w-full p-6 pl-8 text-left rounded-[2rem] transition-all border-2 ${
          isSelected
            ? "border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-100"
            : "border-slate-100 bg-white text-slate-700 hover:border-emerald-200"
        }`}
      >
        <span className="font-bold text-xl leading-snug break-all">
          {answerText}
        </span>
      </button>
    );
  })}
</div>
      </div>

      {/* 하단 내비게이션 버튼 */}
      <div className="max-w-md mx-auto w-full mt-auto pt-10 flex gap-3">
        <button
          onClick={handlePrev}
          disabled={step === 0 || loading}
          className={`flex-1 py-5 rounded-3xl font-black text-lg transition-all ${
            step === 0 ? "opacity-0 pointer-events-none" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
          }`}
        >
          이전
        </button>
        <button
          onClick={handleNext}
          disabled={currentSelection === null || loading}
          className={`flex-[2] py-5 rounded-3xl font-black text-lg transition-all ${
            currentSelection === null || loading
              ? "bg-slate-100 text-slate-300 cursor-not-allowed"
              : "bg-emerald-500 text-white shadow-lg shadow-emerald-100 hover:bg-emerald-600 active:scale-95"
          }`}
        >
          {loading ? "처리 중..." : step === QUESTIONS.length - 1 ? "결과 보기 ✨" : "다음"}
        </button>
      </div>
    </div>
  );
}