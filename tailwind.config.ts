import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {// 1. 애니메이션 동작(움직임) 정의
      keyframes: {
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      // 2. 사용할 클래스명 이름 정의
      animation: {
        'bounce-slow': 'bounceSlow 3s infinite',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
export default config;