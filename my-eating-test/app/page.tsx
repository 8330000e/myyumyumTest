// app/page.tsx 예시
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>식습관 테스트</h1>
      {/* 이 버튼을 누르면 /test 폴더의 page.tsx가 실행됩니다 */}
      <Link href="/test">
        <button className="bg-emerald-500 ...">테스트 시작하기</button>
      </Link>
    </main>
  );
}