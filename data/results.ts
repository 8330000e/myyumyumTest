"use client";

export type AnimalResult = {
    name: string;
    description: string;
    advice: string;
    prescription: string;
};

export const RESULTS: Record<string, Record<string, AnimalResult>> = {
    PANDA: {
        CLOCK: {
            name: "웰빙 기린",
            description: "건강과 미식의 균형을 완벽하게 맞춘 식사계의 정석!",
            advice: "지금의 리듬이 완벽해요. 너무 강박을 갖지 않아도 괜찮아요.",
            prescription: "주 1회 치팅 프라이데이 - 하루쯤은 계획 없는 식사를 즐겨보세요."
        },
        ROLLER: {
            name: "사냥 성공한 사자",
            description: "평소엔 여유롭지만, 꽂히는 맛집에선 고삐 풀린 듯 즐기는 타입!",
            advice: "즐겁게 먹는 건 좋지만, 급하게 먹으면 소화기관이 놀랄 수 있어요.",
            prescription: "식후 15분 산책권 - 가벼운 산책으로 에너지를 발산하세요."
        },
        NIGHT: {
            name: "미식가 부엉이",
            description: "모두가 잠든 밤, 오롯이 맛에 집중하며 하루를 보상받는 타입!",
            advice: "밤에 먹는 즐거움은 크지만, 위장은 쉴 시간이 필요해요.",
            prescription: "취침 3시간 전 공복 - 위장에게도 퇴근 시간을 선물하세요."
        },
        SMALL: {
            name: "깐깐한 고양이",
            description: "맛없으면 안 먹어! 소량이라도 최상의 맛을 추구하는 타입!",
            advice: "입맛이 까다로워 영양이 불균형해질 수 있으니 주의하세요.",
            prescription: "신선한 채소 샐러드 - 하루 한 번, 제철 채소를 꼭 곁들여보세요."
        },
        CONSTANT: {
            name: "오물오물 다람쥐",
            description: "맛있는 걸 발견하면 하루 종일 조금씩 행복하게 즐기는 타입!",
            advice: "야금야금 먹다 보면 내가 얼마나 먹었는지 잊기 쉬워요.",
            prescription: "작은 접시 덜어먹기 - 간식도 접시에 담아 양을 확인하며 드세요."
        }
    },
    HAMSTER: {
        CLOCK: {
            name: "평온한 코끼리",
            description: "흔들리는 마음을 규칙적인 식사로 꽉 붙잡고 있는 노력파!",
            advice: "가끔은 규칙을 깨도 괜찮아요. 스스로에게 조금 더 너그러워지세요.",
            prescription: "따뜻한 차 한 잔 - 식사 전 차를 마시며 마음을 먼저 데워주세요."
        },
        ROLLER: {
            name: "폭주하는 멧돼지",
            description: "스트레스 받으면 앞뒤 안 가리고 폭풍 흡입으로 푸는 타입!",
            advice: "감정을 음식으로 덮으려 하면 나중에 후회만 남을 수 있어요.",
            prescription: "매운맛 대신 소리 지르기 - 스트레스 해소를 위한 다른 취미를 찾아보세요."
        },
        NIGHT: {
            name: "위로가 필요한 늑대",
            description: "외로운 밤, 야식으로 마음의 빈자리를 채우는 타입!",
            advice: "밤의 배고픔은 사실 '외로움'일지도 몰라요.",
            prescription: "지인에게 안부 전화 - 야식 배달 앱 대신 친구에게 연락해 보세요."
        },
        SMALL: {
            name: "상처받은 사슴",
            description: "마음이 울적하면 입맛이 싹 사라져 기운을 잃어버리는 타입!",
            advice: "기운이 없으면 마음도 더 약해져요. 한 숟가락이라도 꼭 챙기세요.",
            prescription: "부드러운 스프 한 그릇 - 목 넘김이 편한 음식으로 기력을 보충하세요."
        },
        CONSTANT: {
            name: "간식 저장고 햄스터",
            description: "불안하거나 심심할 때마다 주전부리를 찾아 헤매는 타입!",
            advice: "무언가 씹는 행위가 긴장을 풀어주지만, 턱 관절이 고생할 수 있어요.",
            prescription: "껌이나 견과류 - 칼로리가 낮거나 오래 씹을 수 있는 걸 고르세요."
        }
    },
    BEE: {
        CLOCK: {
            name: "일중독 일개미",
            description: "완벽한 영양 설계를 시간 맞춰 주입하는 효율 끝판왕!",
            advice: "식사는 업무가 아니에요! 가끔은 맛의 즐거움도 느껴보세요.",
            prescription: "노트북 덮고 식사하기 - 밥 먹을 때만큼은 일 생각을 멈추세요."
        },
        ROLLER: {
            name: "몰아 먹는 낙타",
            description: "바쁠 땐 굶으며 버티다 쉴 때 한꺼번에 에너지를 비축함!",
            advice: "불규칙한 에너지 유입은 몸을 쉽게 피로하게 만들어요.",
            prescription: "휴대용 에너지바 - 공복이 너무 길어지지 않게 중간중간 채우세요."
        },
        NIGHT: {
            name: "밤샘 작업 박쥐",
            description: "밤샘 효율을 위해 야식을 연료처럼 쏟아붓는 프로 일꾼!",
            advice: "밤에 쓴 에너지는 낮에 잠으로 보충되지 않아요. 건강이 우선!",
            prescription: "블루베리나 견과류 - 뇌 회전을 돕는 가벼운 간식을 선택하세요."
        },
        SMALL: {
            name: "이슬 먹는 나비",
            description: "최소한의 연료로 화려하게 활동하는 극강의 가성비 타입!",
            advice: "가성비가 좋아도 기본 영양소는 채워야 날개가 꺾이지 않아요.",
            prescription: "고단백 단백질 쉐이크 - 부족한 근력을 위해 단백질을 보충하세요."
        },
        CONSTANT: {
            name: "바쁜 꿀벌",
            description: "지치지 않기 위해 수시로 당분을 보충하며 일하는 타입!",
            advice: "잦은 당분 섭취는 혈당 롤러코스터를 유발할 수 있어요.",
            prescription: "설탕 대신 다크 초콜릿 - 당 충전도 조금 더 건강한 방식으로!"
        }
    },
    SLOTH: {
        CLOCK: {
            name: "멍 때리는 소",
            description: "아무 생각 없이 늘 먹던 대로, 시간에 맞춰 되새김질하듯 먹음!",
            advice: "내가 지금 무엇을 먹고 있는지 한 번만 들여다봐 주세요.",
            prescription: "새로운 메뉴 도전 - 늘 가던 식당 말고 새로운 맛을 찾아보세요."
        },
        ROLLER: {
            name: "배부른 구렁이",
            description: "넋 놓고 먹다 보니 어느새 배가 빵빵해져 움직이지 못함!",
            advice: "포만감 신호는 20분 뒤에 도착한다는 걸 잊지 마세요.",
            prescription: "20분 타이머 식사 - 천천히 씹으며 뇌가 배부름을 알게 하세요."
        },
        NIGHT: {
            name: "야행성 너구리",
            description: "밤마다 영상 보며 나도 모르게 야식 봉지를 뒤적거리는 타입!",
            advice: "영상의 자극이 식욕을 더 부추기고 있어요.",
            prescription: "스마트폰 멀리 두기 - 밥상에서는 오직 밥과 나만 마주하세요."
        },
        SMALL: {
            name: "나무 위에 나무늘보",
            description: "먹는 것도 귀찮아.. 배고픈 줄도 모르고 축 늘어져 있는 타입!",
            advice: "귀찮음 때문에 몸의 엔진이 꺼져가고 있어요. 활력이 필요해요!",
            prescription: "상큼한 과일 주스 - 비타민으로 몸의 스위치를 켜보세요."
        },
        CONSTANT: {
            name: "입이 바쁜 원숭이",
            description: "손에 잡히는 대로 계속 입으로 가져가야 직성이 풀리는 타입!",
            advice: "입이 심심한 건지, 손이 심심한 건지 구분이 필요해요.",
            prescription: "무설탕 캔디나 껌 - 칼로리 없는 것으로 입을 달래보세요."
        }
    }
};