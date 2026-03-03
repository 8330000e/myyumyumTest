"use client";

import { useState, useEffect, Activity } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // useSearchParams 추가
import { supabase } from "@/lib/supabaseClient";

export default function FeedbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 동물 이름과 유형을 가져옵니다.
  const animalName = searchParams.get("animal") || "알 수 없음";
  const psychologyType = searchParams.get("psy") || "알 수 없음";
  const behaviorPattern = searchParams.get("beh") || "알 수 없음";

  const [step, setStep] = useState(1); // 이제 step 1은 기본 정보부터 시작
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step < 5) {
      document.title = `식습관 설문조사 - step ${step}`;
    } else if (step > 4) {
      document.title = `식습관 설문조사 - step 5`;
    } else {
      document.title = `식습관 설문조사 완료`;
    }
  }, [step]);

  const [formData, setFormData] = useState({
    animal_result: `${psychologyType} (${behaviorPattern})`, // 자동으로 미리 입력됨!
    gender: "",
    age: "",
    activity: "",
    intake_level: "",
    meal_regularity: "",
    taste_sensitivity: [] as string[],
    taste_sensitivity_other: "",
    main_focus: [] as string[],
    main_focus_other: "",
    favorite_foods: [""],
    menu_choice_factor: "",
    morning_menu1: "",
    lunch_menu1: "",
    dinner_menu1: "",
    late_night_menu1: "",
    snack_menu1: "",
    morning_menu2: "",
    lunch_menu2: "",
    dinner_menu2: "",
    late_night_menu2: "",
    snack_menu2: "",
    morning_menu3: "",
    lunch_menu3: "",
    dinner_menu3: "",
    late_night_menu3: "",
    snack_menu3: "",
    morning_menu4: "",
    lunch_menu4: "",
    dinner_menu4: "",
    late_night_menu4: "",
    snack_menu4: "",
    morning_menu5: "",
    lunch_menu5: "",
    dinner_menu5: "",
    late_night_menu5: "",
    snack_menu5: "",
    morning_menu6: "",
    lunch_menu6: "",
    dinner_menu6: "",
    late_night_menu6: "",
    snack_menu6: "",
    morning_menu7: "",
    lunch_menu7: "",
    dinner_menu7: "",
    late_night_menu7: "",
    snack_menu7: "",
  });

  const toggleFocus = (m: string) => {
    setFormData((prev) => {
      // 이미 배열에 들어있는지 확인
      const isSelected = prev.main_focus.includes(m);

      if (isSelected) {
        // 이미 있다면 제거 (해제)
        return {
          ...prev,
          main_focus: prev.main_focus.filter((item) => item !== m),
        };
      } else {
        // 없다면 추가 (최대 2개만 하고 싶다면 여기에 length 체크를 넣으세요!)
        return {
          ...prev,
          main_focus: [...prev.main_focus, m],
        };
      }
    });
  };

  const toggleTaste = (t: string) => {
    setFormData((prev) => {
      // 1. 이미 선택된 배열에 있는지 확인
      const isSelected = prev.taste_sensitivity.includes(t);

      if (isSelected) {
        // 2. 이미 있다면? 빼주기 (필터링)
        return {
          ...prev,
          taste_sensitivity: prev.taste_sensitivity.filter(
            (item) => item !== t,
          ),
        };
      } else {
        // 3. 없다면? 새로 추가하기
        return {
          ...prev,
          taste_sensitivity: [...prev.taste_sensitivity, t],
        };
      }
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const { error } = await supabase.from("feedback").insert([formData]);
    if (error) alert("저장 실패. 다시 시도해주세요!");
    else {
      alert("소중한 데이터 감사합니다!");
      router.push("/");
    }
    setLoading(false);
  };

  // 1. 음식 입력 내용 수정하기
  const handleFoodChange = (index: number, value: string) => {
    const newFoods = [...formData.favorite_foods];
    newFoods[index] = value;
    setFormData({ ...formData, favorite_foods: newFoods }); // 변수명 확인!
  };

  // 2. 입력창 하나 더 추가하기
  const addFoodField = () => {
    setFormData({
      ...formData,
      favorite_foods: [...formData.favorite_foods, ""],
    });
  };

  // 3. 특정 입력창 삭제하기
  const removeFoodField = (index: number) => {
    // 최소 하나는 남겨두고 싶다면 체크
    if (formData.favorite_foods.length <= 1) return;

    const newFoods = formData.favorite_foods.filter((_, i) => i !== index);
    setFormData({ ...formData, favorite_foods: newFoods });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center">
      <div className="max-w-md w-full space-y-6">
        {/* 상단 프로그레스 바 (단계 조정) */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${(step / 12) * 100}%` }}
          />
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 min-h-[500px] flex flex-col justify-between">
          {/* Step 1: 결과 선택은 생략하고 바로 '기본 정보'부터 시작 */}
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                1. 당신에 대해 알려주세요 👤
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1">
                  성별
                </label>
                <div className="flex gap-3 whitespace-pre-wrap">
                  {[
                    "생물학적\n남성",
                    "생물학적\n여성",
                    "응답하고\n싶지 않음",
                  ].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                <label className="block text-base font-bold text-slate-800 ml-1 mt-4">
                  만 나이
                </label>
                <input
                  type="number"
                  placeholder="예: 25"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, age: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {/* ... 이후 Step 2, 3, 4 동일하게 진행 ... */}
          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                2-1. 평소에 얼만큼 움직이시나요? 🏃‍♀️
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1">
                  평소 활동량
                </label>
                <div className="flex flex-col gap-3 whitespace-pre-wrap">
                  {[
                    "거의 움직임 없음 (사무직 등)",
                    "가벼운 활동 (주 1~2회 운동)",
                    "활발한 활동 (주 3~5회 운동)",
                    "매우 활동적 (매일 강도 높은 운동 또는 육체노동)",
                  ].map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setFormData({ ...formData, activity: a })}
                      className={`flex-1 text-left py-4 px-4 rounded-2xl font-bold transition-all ${formData.activity === a ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                2-2. 평소에 얼만큼 움직이시나요? 🏃‍♀️
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1 mt-4">
                  하루 평균 섭취량에 대한 자가평가
                </label>
                <div className="flex flex-col gap-3 whitespace-pre-wrap">
                  {[
                    "소식가 (남들보다 적게 먹는 편)",
                    "보통 (적당히 배부를 만큼)",
                    "대식가 (남들보다 많이, 배 터지게 먹는 편)",
                  ].map((i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, intake_level: i })
                      }
                      className={`flex-1 text-left py-4 px-4 rounded-2xl font-bold transition-all ${formData.intake_level === i ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                3-1. 당신과 음식의 관계 🍚
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1 mt-4">
                  가장 자주 거르는 끼니
                </label>
                <div className="flex flex-col gap-3 whitespace-pre-wrap">
                  {["아침", "점심", "저녁", "야식만 먹음", "거르지 않음"].map(
                    (m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, meal_regularity: m })
                        }
                        className={`flex-1 text-left py-4 px-4 rounded-2xl font-bold transition-all ${formData.meal_regularity === m ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}
                      >
                        {m}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                3-2. 당신과 음식의 관계 🍚
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1 mt-4">
                  주로 선호하는 음식 종류
                </label>
                <div className="block text-sm font-bold text-slate-500 ml-1 mt-4">
                  ✔ 중복 선택 가능
                </div>
                <div className="flex flex-col gap-3 whitespace-pre-wrap">
                  {[
                    "한식 (밥 중심)",
                    "양식 (밀가루/육류)",
                    "일식",
                    "중식",
                    "샐러드/건강식",
                    "간편식 (편의점/배달)",
                  ].map((t) => {
                    // 현재 요소(t)가 배열 안에 들어있는지 확인
                    const isSelected = formData.taste_sensitivity?.includes(t);

                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => toggleTaste(t)}
                        className={`w-full text-left py-4 px-4 rounded-2xl font-bold transition-all ${
                          isSelected
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-100"
                            : "bg-slate-50 text-slate-500"
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                  <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">
                    기타
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        taste_sensitivity_other: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                3-3. 당신과 음식의 관계 🍚
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1 mt-4">
                  식사메뉴 결정 시 가장 큰 영향을 주는 요인
                </label>
                <div className="block text-sm font-bold text-slate-500 ml-1 mt-4">
                  ✔ 중복 선택 가능
                </div>
                <div className="flex flex-col gap-3 whitespace-pre-wrap">
                  {[
                    "맛",
                    "건강(영양)",
                    "가격",
                    "편의점(속도)",
                    "기분(스트레스)",
                    "생리(여성의 경우)",
                    "날씨",
                    "다이어트",
                  ].map((m) => {
                    // 현재 이 버튼(m)이 배열 안에 들어있는지 체크 (이게 핵심!)
                    const isSelected = formData.main_focus?.includes(m);

                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => toggleFocus(m)} // 아까 만든 함수 실행
                        className={`w-full text-left py-4 px-4 rounded-2xl font-bold transition-all ${
                          isSelected
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-100"
                            : "bg-slate-50 text-slate-500"
                        }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                  <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">
                    기타
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        main_focus_other: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-1. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1">
                  월요일
                </label>
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  아침
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, morning_menu1: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  점심
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, lunch_menu1: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  저녁
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, dinner_menu1: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  야식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      late_night_menu1: e.target.value,
                    })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  간식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, snack_menu1: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-2. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1">
                  화요일
                </label>
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  아침
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, morning_menu2: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  점심
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, lunch_menu2: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  저녁
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, dinner_menu2: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  야식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      late_night_menu2: e.target.value,
                    })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  간식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, snack_menu2: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {step === 9 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-3. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1">
                  수요일
                </label>
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  아침
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, morning_menu3: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  점심
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, lunch_menu3: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  저녁
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, dinner_menu3: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  야식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      late_night_menu3: e.target.value,
                    })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  간식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, snack_menu3: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {step === 10 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-4. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1">
                  목요일
                </label>
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  아침
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, morning_menu4: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  점심
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, lunch_menu4: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  저녁
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, dinner_menu4: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  야식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      late_night_menu4: e.target.value,
                    })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  간식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, snack_menu4: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {step === 11 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-5. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1">
                  금요일
                </label>
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  아침
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, morning_menu5: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  점심
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, lunch_menu5: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  저녁
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, dinner_menu5: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  야식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      late_night_menu5: e.target.value,
                    })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  간식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, snack_menu5: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {step === 12 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-6. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1">
                  토요일
                </label>
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  아침
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, morning_menu6: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  점심
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, lunch_menu6: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  저녁
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, dinner_menu6: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  야식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      late_night_menu6: e.target.value,
                    })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  간식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, snack_menu6: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {step === 13 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-7. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block text-base font-bold text-slate-800 ml-1">
                  일요일
                </label>
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  아침
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, morning_menu7: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  점심
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, lunch_menu7: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  저녁
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, dinner_menu7: e.target.value })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  야식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      late_night_menu7: e.target.value,
                    })
                  }
                />
                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4 mb-1">
                  간식
                </label>
                <input
                  type="text"
                  className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                  onChange={(e) =>
                    setFormData({ ...formData, snack_menu7: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          {step === 14 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <label className="block font-bold text-slate-700 mb-2">
                <h2 className="text-xl font-black text-slate-900">
                  5. 좋아하는 음식 리스트 🍔
                </h2>
                <label className="block py-4 text-base font-semibold text-slate-500 ml-1">
                  좋아하는 음식들을 추가해주세요!
                </label>
              </label>

              {formData.favorite_foods.map((food, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={food}
                    onChange={(e) => handleFoodChange(index, e.target.value)}
                    placeholder={`음식 입력 (${index + 1})`}
                    className="flex-1 py-4 px-4 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  />

                  {/* 삭제 버튼: 항목이 2개 이상일 때만 보여주거나 항상 보여줌 */}
                  <button
                    type="button"
                    onClick={() => removeFoodField(index)}
                    className="p-3 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {/* 추가 버튼 */}
              <button
                type="button"
                onClick={addFoodField}
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all mt-2"
              >
                + 음식 추가하기
              </button>
            </div>
          )}

          {/* 하단 버튼 제어 */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black"
              >
                이전
              </button>
            )}
            {step < 14 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex-[2] py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl"
              >
                다음 단계로
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-[2] py-5 bg-emerald-500 text-white rounded-2xl font-black shadow-xl"
              >
                {loading ? "제출 중..." : "제출하고 완료하기"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
