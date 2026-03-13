"use client";

import { useState, useEffect, Activity } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // useSearchParams 추가
import { supabase } from "@/lib/supabaseClient";
import { RESULTS } from "@/data/results";

export default function FeedbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 동물 이름과 유형을 가져옵니다.
  const psychologyType = searchParams.get("psy") || "알 수 없음";
  const behaviorPattern = searchParams.get("beh") || "알 수 없음";
  const resultType = searchParams.get("animal") || "알 수 없음";

  const [step, setStep] = useState(1); // 이제 step 1은 기본 정보부터 시작
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step < 2) {
      document.title = `식습관 설문조사 - step ${step}`;
    } else if (step > 1 && step < 3) {
      document.title = `식습관 설문조사 - step 2`;
    } else if (step > 3 && step < 6) {
      document.title = `식습관 설문조사 - step 3`;
    } else if (step > 6 && step < 13) {
      document.title = `식습관 설문조사 - step 4`;
    } else if (step > 13) {
      document.title = `식습관 설문조사 - step 5`;
    }
  }, [step]);

  const [formData, setFormData] = useState({
    animal_result: `${resultType}`, // 자동으로 미리 입력됨!
    psychologyType: `${psychologyType}`,
    behaviorPattern: `${behaviorPattern}`,
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
    weekly_diet: {
      mon: { morning: "", lunch: "", dinner: "", late_night: "", snack: "" },
      tue: { morning: "", lunch: "", dinner: "", late_night: "", snack: "" },
      wed: { morning: "", lunch: "", dinner: "", late_night: "", snack: "" },
      thu: { morning: "", lunch: "", dinner: "", late_night: "", snack: "" },
      fri: { morning: "", lunch: "", dinner: "", late_night: "", snack: "" },
      sat: { morning: "", lunch: "", dinner: "", late_night: "", snack: "" },
      sun: { morning: "", lunch: "", dinner: "", late_night: "", snack: "" },
    } as Record<string, Record<string, string>>,
  });

  const isFormInvalid = !formData.gender || !formData.age || !formData.activity;

  const [errorField, setErrorField] = useState<string | null>(null); // 에러 상태 추가

  const handleNextStep = () => {
    // 1단계: 성별 체크
    if (step === 1) {
      if (!formData.gender) {
        setErrorField("성별");
        alert("성별을 선택해주세요!");
        return; // ⭐️ 중요: 여기서 함수를 종료시켜야 setStep까지 안 내려감
      }
      if (!formData.age || Number(formData.age) <= 0) {
        setErrorField("나이");
        alert("나이를 입력해주세요!");
        return;
      }
    }

    // 2단계: 활동량
    if (step === 2) {
      if (!formData.activity) {
        setErrorField("활동량");
        alert("해당하는 항목을 선택해주세요!");
        return;
      }
    }

    // 2-2: 하루 평균 섭취량에 대한 자가평가
    if (step === 3) {
      if (!formData.intake_level) {
        setErrorField("하루 평균 섭취량에 대한 자가평가");
        alert("해당하는 항목을 선택해주세요!");
        return;
      }
    }

    // 3-1: 가장 자주 거르는끼니
    if (step === 4) {
      if (!formData.meal_regularity) {
        setErrorField("가장 자주 거르는끼니");
        alert("해당하는 항목을 선택해주세요!");
        return;
      }
    }

    // 3-2: 주로 선호하는 음식 종류
    if (step === 5) {
      if (
        !formData.taste_sensitivity ||
        formData.taste_sensitivity.length === 0
      ) {
        setErrorField("선호하는 음식");
        alert("최소 하나 이상의 항목을 선택해주세요!");
        return; // 다음으로 안 넘어가게 차단
      }
    }

    // 3-3: 메뉴 결정 시 가장 큰 영향을 주는 요인
    if (step === 6) {
      if (!formData.main_focus || formData.main_focus.length === 0) {
        setErrorField("메뉴 결정 요인");
        alert("최소 하나 이상의 항목을 선택해주세요!");
        return;
      }
    }

    // 4

    //5: 좋아하는 음식 리스트
    if (step === 13) {
      if (!formData.favorite_foods) {
        setErrorField("하루 평균 섭취량에 대한 자가평가");
        alert("해당하는 항목을 선택해주세요!");
        return;
      }
    }

    // 모든 검증을 통과했을 때만 다음 스텝으로!
    setErrorField(null);
    setStep((prev) => prev + 1);
  };

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

  const handleDietChange = (day: string, meal: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      weekly_diet: {
        ...prev.weekly_diet,
        [day]: {
          ...prev.weekly_diet[day],
          [meal]: value,
        },
      },
    }));
  };

  // 즐겨 먹는 음식 입력 칸을 추가하는 함수
  const addFoodField = () => {
    setFormData((prev) => ({
      ...prev,
      favorite_foods: [...prev.favorite_foods, ""], // 빈 입력칸 하나 추가
    }));
  };

  // 즐겨 먹는 음식 값을 변경하는 함수 (혹시 이것도 없다면 추가하세요)
  const handleFoodChange = (index: number, value: string) => {
    const newFoods = [...formData.favorite_foods];
    newFoods[index] = value;
    setFormData((prev) => ({
      ...prev,
      favorite_foods: newFoods,
    }));
  };

  // 특정 인덱스의 음식 입력 칸을 삭제하는 함수
  const removeFoodField = (index: number) => {
    // 입력 칸이 하나만 남았을 때는 삭제하지 않도록 방어 로직 추가
    if (formData.favorite_foods.length <= 1) return;

    setFormData((prev) => ({
      ...prev,
      favorite_foods: prev.favorite_foods.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    // 3. 식단도 최소 월요일은 썼는지 체크하고 싶다면?
    if (!formData.weekly_diet.mon.morning && !formData.weekly_diet.mon.lunch) {
      alert("최소한 월요일 식단은 입력해주세요!");
      return;
    }
    setLoading(true);

    const submitData = {
      // 1. 사용자용 명칭 (예: "바른생활 판다")
      animal_result: resultType,

      // 2. 내부 분석용 영문 코드 (예: "INTUITIVE")
      // URL 파라미터나 상태값으로 들고 있는 영문 변수명을 그대로 할당하세요.
      psychology_type: psychologyType, // 예: 'INTUITIVE'

      // 3. 내부 분석용 영문 코드 (예: "CLOCK")
      behavior_pattern: behaviorPattern, // 예: 'CLOCK'

      gender: formData.gender,
      age: formData.age,
      activity: formData.activity,
      intake_level: formData.intake_level,
      meal_regularity: formData.meal_regularity,
      taste_sensitivity: formData.taste_sensitivity,
      taste_sensitivity_other: formData.taste_sensitivity_other,
      main_focus: formData.main_focus,
      main_focus_other: formData.main_focus_other,
      favorite_foods: formData.favorite_foods.filter((f) => f.trim() !== ""),
      menu_choice_factor: formData.menu_choice_factor,

      // 주간 식단 객체 (mon, tue... 구조)
      weekly_diet: formData.weekly_diet,
    };

    const { error } = await supabase.from("feedback").insert([submitData]);

    if (error) {
      console.error("저장 실패:", error.message);
      alert("저장 실패. 다시 시도해주세요!");
    } else {
      alert("데이터가 안전하게 저장되었습니다!");
      router.push("/complete");
    }
    setLoading(false);
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
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* 타이틀 섹션 */}
              <div className="space-y-2">
                <h2 className="text-xl font-black text-slate-900">
                  1. 당신에 대해 알려주세요 👤
                </h2>
                <p className="text-slate-500 font-medium text-sm">
                  기본 정보를 입력해 주세요.
                </p>
              </div>

              {/* --- 1. 성별 섹션 --- */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label
                    className={`text-base font-bold ml-1 transition-colors ${
                      errorField === "성별" ? "text-red-500" : "text-slate-800"
                    }`}
                  >
                    성별 <span className="text-red-500">*</span>
                  </label>
                  {errorField === "성별" && (
                    <span className="text-xs text-red-500 font-bold animate-bounce">
                      필수 선택!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2 ">
                  {[
                    { label: "생물학적\n남성", value: "생물학적 남성" },
                    { label: "생물학적\n여성", value: "생물학적 여성" },
                    {
                      label: "응답하고\n싶지 않음",
                      value: "응답하고 싶지 않음",
                    },
                  ].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, gender: item.value });
                        setErrorField(null); // 선택 시 에러 해제
                      }}
                      className={`p-3 py-5 rounded-[1.5rem] font-bold text-base whitespace-pre-line leading-tight border-2 transition-all ${
                        formData.gender === item.value
                          ? "border-none bg-emerald-400 text-white shadow-sm scale-[1.02]"
                          : errorField === "성별"
                            ? "border-none bg-red-50 text-red-300 animate-pulse"
                            : "border-none bg-slate-50 text-slate-400 hover:bg-slate-100"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* --- 2. 나이 섹션 --- */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label
                    className={`text-base font-bold ml-1 transition-colors ${
                      errorField === "연령대"
                        ? "text-red-500"
                        : "text-slate-800"
                    }`}
                  >
                    만 나이 <span className="text-red-500">*</span>
                  </label>
                  {errorField === "연령대" && (
                    <span className="text-xs text-red-500 font-bold animate-bounce">
                      나이를 입력해 주세요!
                    </span>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="number"
                    placeholder="숫자만 입력 (예: 28)"
                    value={formData.age || ""}
                    onChange={(e) => {
                      setFormData({ ...formData, age: e.target.value });
                      if (e.target.value) setErrorField(null);
                    }}
                    className={`w-full p-5 rounded-[2rem] font-bold text-lg outline-none border-2 transition-all ${
                      errorField === "연령대" && !formData.age
                        ? "border-red-300 bg-red-50 animate-pulse"
                        : "border-transparent bg-slate-50 focus:border-emerald-500 focus:bg-white text-slate-900 shadow-inner"
                    }`}
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                    세
                  </span>
                </div>
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
                  평소 활동량 <span className="text-red-500">*</span>
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
                      className={`flex-1 text-left py-4 px-4 rounded-full font-bold transition-all ${formData.activity === a ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}
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
                  하루 평균 섭취량에 대한 자가평가{" "}
                  <span className="text-red-500">*</span>
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
                      className={`flex-1 text-left py-4 px-4 rounded-full font-bold transition-all ${formData.intake_level === i ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}
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
                  가장 자주 거르는 끼니 <span className="text-red-500">*</span>
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
                        className={`flex-1 text-left py-4 px-4 rounded-full font-bold transition-all ${formData.meal_regularity === m ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}
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
                  주로 선호하는 음식 종류{" "}
                  <span className="text-red-500">*</span>
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
                        className={`w-full text-left py-4 px-4 rounded-full font-bold transition-all ${
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
                    className="w-full p-4 bg-slate-50 rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
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
                  식사메뉴 결정 시 가장 큰 영향을 주는 요인{" "}
                  <span className="text-red-500">*</span>
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
                        className={`w-full text-left py-4 px-4 rounded-full font-bold transition-all ${
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
                    className="w-full p-4 bg-slate-50 rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
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
                <label className="block -mt-[10px] text-base font-black text-slate-900 ml-1">
                  월요일
                </label>
                <label className="block -mt-[10px] text-xs font-bold text-slate-500 ml-1 ">
                  ❔ 오늘이 수요일 저녁일 경우 이틀 전 (월요일) 식사 메뉴를
                  적어주세요!
                  <br />
                  ⭕ 먹은게 없는 경우 공백
                  <br />✔ 메뉴가 2가지 이상인 경우 쉼표(,)로 메뉴 구분
                </label>
                {[
                  { id: "morning", label: "아침" },
                  { id: "lunch", label: "점심" },
                  { id: "dinner", label: "저녁" },
                  { id: "late_night", label: "야식" },
                  { id: "snack", label: "간식" },
                ].map((meal) => (
                  <div key={meal.id}>
                    <label className="block text-sm font-bold text-slate-500 ml-1 mb-1">
                      {meal.label}
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-slate-50 rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
                      value={formData.weekly_diet.mon[meal.id]}
                      onChange={(e) =>
                        handleDietChange("mon", meal.id, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-2. 일주일 동안 먹은 음식들 🍔
              </h2>

              <div className="space-y-4">
                <label className="block -mt-[10px] text-base font-black text-slate-900 ml-1">
                  화요일
                </label>
                <label className="block -mt-[10px] text-xs font-bold text-slate-500 ml-1 ">
                  ❔ 오늘이 수요일 저녁일 경우 어제(화요일) 식사 메뉴를
                  적어주세요!
                  <br />
                  ⭕ 먹은게 없는 경우 공백
                  <br />✔ 메뉴가 2가지 이상인 경우 쉼표(,)로 메뉴 구분
                </label>
                {[
                  { id: "morning", label: "아침" },
                  { id: "lunch", label: "점심" },
                  { id: "dinner", label: "저녁" },
                  { id: "late_night", label: "야식" },
                  { id: "snack", label: "간식" },
                ].map((meal) => (
                  <div key={meal.id}>
                    <label className="block text-sm font-bold text-slate-500 ml-1 mb-1">
                      {meal.label}
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-slate-50 rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
                      value={formData.weekly_diet.tue[meal.id]}
                      onChange={(e) =>
                        handleDietChange("tue", meal.id, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 9 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-3. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block -mt-[10px] text-base font-black text-slate-900 ml-1">
                  수요일
                </label>
                <label className="block -mt-[10px] text-xs font-bold text-slate-500 ml-1 ">
                  ❔ 오늘이 월요일 저녁일 경우 저번주 수요일 식사 메뉴를
                  적어주세요!
                  <br />
                  ⭕ 먹은게 없는 경우 공백
                  <br />✔ 메뉴가 2가지 이상인 경우 쉼표(,)로 메뉴 구분
                </label>
                {[
                  { id: "morning", label: "아침" },
                  { id: "lunch", label: "점심" },
                  { id: "dinner", label: "저녁" },
                  { id: "late_night", label: "야식" },
                  { id: "snack", label: "간식" },
                ].map((meal) => (
                  <div key={meal.id}>
                    <label className="block text-sm font-bold text-slate-500 ml-1 mb-1">
                      {meal.label}
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-slate-50 rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
                      value={formData.weekly_diet.wed[meal.id]}
                      onChange={(e) =>
                        handleDietChange("wed", meal.id, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 10 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-4. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block -mt-[10px] text-base font-black text-slate-900 ml-1">
                  목요일
                </label>
                <label className="block -mt-[10px] text-xs font-bold text-slate-500 ml-1 ">
                  ❔ 오늘이 월요일 저녁일 경우 저번주 목요일 식사 메뉴를
                  적어주세요!
                  <br />
                  ⭕ 먹은게 없는 경우 공백
                  <br />✔ 메뉴가 2가지 이상인 경우 쉼표(,)로 메뉴 구분
                </label>
                {[
                  { id: "morning", label: "아침" },
                  { id: "lunch", label: "점심" },
                  { id: "dinner", label: "저녁" },
                  { id: "late_night", label: "야식" },
                  { id: "snack", label: "간식" },
                ].map((meal) => (
                  <div key={meal.id}>
                    <label className="block text-sm font-bold text-slate-500 ml-1 mb-1">
                      {meal.label}
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-slate-50 rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
                      value={formData.weekly_diet.thu[meal.id]}
                      onChange={(e) =>
                        handleDietChange("thu", meal.id, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 11 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-5. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block -mt-[10px] text-base font-black text-slate-900 ml-1">
                  금요일
                </label>
                <label className="block -mt-[10px] text-xs font-bold text-slate-500 ml-1 ">
                  ❔ 오늘이 월요일 저녁일 경우 저번주 금요일 식사 메뉴를
                  적어주세요!
                  <br />
                  ⭕ 먹은게 없는 경우 공백
                  <br />✔ 메뉴가 2가지 이상인 경우 쉼표(,)로 메뉴 구분
                </label>
                {[
                  { id: "morning", label: "아침" },
                  { id: "lunch", label: "점심" },
                  { id: "dinner", label: "저녁" },
                  { id: "late_night", label: "야식" },
                  { id: "snack", label: "간식" },
                ].map((meal) => (
                  <div key={meal.id}>
                    <label className="block text-sm font-bold text-slate-500 ml-1 mb-1">
                      {meal.label}
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-slate-50 rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
                      value={formData.weekly_diet.fri[meal.id]}
                      onChange={(e) =>
                        handleDietChange("fri", meal.id, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 12 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-6. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block -mt-[10px] text-base font-black text-slate-900 ml-1">
                  토요일
                </label>
                <label className="block -mt-[10px] text-xs font-bold text-slate-500 ml-1 ">
                  ❔ 오늘이 월요일 저녁일 경우 저번주 토요일 식사 메뉴를
                  적어주세요!
                  <br />
                  ⭕ 먹은게 없는 경우 공백
                  <br />✔ 메뉴가 2가지 이상인 경우 쉼표(,)로 메뉴 구분
                </label>
                {[
                  { id: "morning", label: "아침" },
                  { id: "lunch", label: "점심" },
                  { id: "dinner", label: "저녁" },
                  { id: "late_night", label: "야식" },
                  { id: "snack", label: "간식" },
                ].map((meal) => (
                  <div key={meal.id}>
                    <label className="block text-sm font-bold text-slate-500 ml-1 mb-1">
                      {meal.label}
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-slate-50 rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
                      value={formData.weekly_diet.sat[meal.id]}
                      onChange={(e) =>
                        handleDietChange("sat", meal.id, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 13 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-xl font-black text-slate-900">
                4-7. 일주일 동안 먹은 음식들 🍔
              </h2>
              <div className="space-y-4">
                <label className="block -mt-[10px] text-base font-black text-slate-900 ml-1">
                  일요일
                </label>
                <label className="block -mt-[10px] text-xs font-bold text-slate-500 ml-1 ">
                  ❔ 오늘이 월요일 저녁일 경우 저번주 일요일 식사 메뉴를
                  적어주세요!
                  <br />
                  ⭕ 먹은게 없는 경우 공백
                  <br />✔ 메뉴가 2가지 이상인 경우 쉼표(,)로 메뉴 구분
                </label>
                {[
                  { id: "morning", label: "아침" },
                  { id: "lunch", label: "점심" },
                  { id: "dinner", label: "저녁" },
                  { id: "late_night", label: "야식" },
                  { id: "snack", label: "간식" },
                ].map((meal) => (
                  <div key={meal.id}>
                    <label className="block text-sm font-bold text-slate-500 ml-1 mb-1">
                      {meal.label}
                    </label>
                    <input
                      type="text"
                      className="w-full p-4 bg-slate-50 rounded-full outline-none focus:ring-2 focus:ring-emerald-500"
                      value={formData.weekly_diet.sun[meal.id]}
                      onChange={(e) =>
                        handleDietChange("sun", meal.id, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 14 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <label className="block font-bold text-slate-700 mb-2">
                <h2 className="text-xl font-black text-slate-900">
                  5. 좋아하는 음식 리스트 🍔
                </h2>
                <label className="block py-2 mb-5 text-xs font-bold text-slate-500 ml-1 ">
                  좋아하는 음식들을 추가해주세요!{" "}
                  <span className="text-red-500">*</span>
                </label>
              </label>

              {formData.favorite_foods.map((food, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={food}
                    onChange={(e) => handleFoodChange(index, e.target.value)}
                    placeholder={`음식 입력 (${index + 1})`}
                    className="flex-1 py-4 px-4 bg-slate-50 rounded-full border-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
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
                className="w-full py-4 border-2 border-dashed border-slate-200 rounded-full text-slate-400 font-bold hover:bg-slate-50 hover:border-slate-300 transition-all mt-2"
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
                className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-full font-black"
              >
                이전
              </button>
            )}

            {step < 14 ? (
              <button
                // ❌ 기존: onClick={() => setStep(step + 1)}
                // ✅ 수정: 검증 로직이 있는 함수 호출
                onClick={handleNextStep}
                className="flex-[2] py-5 bg-slate-900 text-white rounded-full font-black shadow-xl active:scale-95 transition-all"
              >
                다음 단계로
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-[2] py-5 bg-emerald-500 text-white rounded-full font-black shadow-xl"
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
