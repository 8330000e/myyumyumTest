"use client";

import { useState, useEffect } from "react";
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
        if (step<5) {
            document.title = `식습관 설문조사 - step ${step}`;
        }else if(step>4){
            document.title = `식습관 설문조사 - step 5`;
        }else{
            document.title = `식습관 설문조사 완료`;
        }
    }, [step]);

    const [formData, setFormData] = useState({
        animal_result: `${psychologyType} (${behaviorPattern})`, // 자동으로 미리 입력됨!
        gender: "",
        age: "",
        meal_regularity: "",
        taste_sensitivity: "",
        main_focus: "",
        favorite_foods: [] as string[],
        menu_choice_factor: "",
        morning_menu: "", lunch_menu: "", dinner_menu: "", snack_menu: "", late_night_menu: ""
    });

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

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-6 flex flex-col items-center">
            <div className="max-w-md w-full space-y-6">

                {/* 상단 프로그레스 바 (단계 조정) */}
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full transition-all duration-300" style={{ width: `${(step / 12) * 100}%` }} />
                </div>

                <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 min-h-[500px] flex flex-col justify-between">

                    {/* Step 1: 결과 선택은 생략하고 바로 '기본 정보'부터 시작 */}
                    {step === 1 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">1. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적\n여성", "응답하고\n싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">만 나이</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {/* ... 이후 Step 2, 3, 4 동일하게 진행 ... */}
                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">2. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">2. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">2. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">5. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {step === 6 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">6. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {step === 7 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">7. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {step === 8 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">8. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {step === 9 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">9. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {step === 10 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">10. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {step === 11 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">11. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {step === 12 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">12. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {step === 13 && (
                        <div className="space-y-6 animate-in fade-in duration-500">
                            <h2 className="text-xl font-black text-slate-900">13. 당신에 대해 알려주세요 👤</h2>
                            <div className="space-y-4">
                                <label className="block text-sm font-bold text-slate-500 ml-1">성별</label>
                                <div className="flex gap-3 whitespace-pre-wrap">
                                    {["생물학적\n남성", "생물학적 여성", "응답하고 싶지 않음"].map(g => (
                                        <button key={g} type="button" onClick={() => setFormData({ ...formData, gender: g })}
                                            className={`flex-1 py-4 rounded-2xl font-bold transition-all ${formData.gender === g ? "bg-emerald-500 text-white shadow-md shadow-emerald-100" : "bg-slate-50 text-slate-500"}`}>{g}</button>
                                    ))}
                                </div>
                                <label className="block text-sm font-bold text-slate-500 ml-1 mt-4">나이 (숫자만)</label>
                                <input type="number" placeholder="예: 25" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                            </div>
                        </div>
                    )}

                    {/* 하단 버튼 제어 */}
                    <div className="flex gap-3 mt-8">
                        {step > 1 && (
                            <button onClick={() => setStep(step - 1)} className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black">이전</button>
                        )}
                        {step < 13 ? (
                            
                            <button onClick={() => setStep(step + 1)} className="flex-[2] py-5 bg-slate-900 text-white rounded-2xl font-black shadow-xl">다음 단계로</button>
                        ) : (
                            <button onClick={handleSubmit} disabled={loading} className="flex-[2] py-5 bg-emerald-500 text-white rounded-2xl font-black shadow-xl">
                                {loading ? "제출 중..." : "제출하고 완료하기"}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}