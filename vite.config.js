import { defineConfig } from 'vite';

// Pretendard 정적 글꼴 CSS에는 굵기 100~900 전부와 옛 형식(woff) 예비 파일이 적혀 있습니다.
// 사이트가 쓰는 굵기의 woff2만 남겨, 빌드 결과와 첫 화면 CSS를 가볍게 합니다.
// 같은 글자 범위의 선언을 굵기끼리 붙여 두면 긴 unicode-range가 반복돼 gzip이 훨씬 잘 압축합니다.
// (선언 순서는 글꼴 선택에 영향이 없습니다.) 굵기를 새로 쓰면 여기에 추가하세요.
const PRETENDARD_WEIGHTS = ['500', '600', '700', '800', '900'];
const pretendardTrim = {
  name: 'pretendard-trim',
  enforce: 'pre',
  transform(code, id) {
    if (!/pretendard\/dist\/web\/static\/pretendard-dynamic-subset\.css$/.test(id)) return null;
    const faces = [];
    for (const block of code.match(/@font-face\s*{[^}]*}/g) ?? []) {
      const weight = block.match(/font-weight:\s*(\d+)/)?.[1];
      if (!PRETENDARD_WEIGHTS.includes(weight)) continue;
      faces.push({
        subset: Number(block.match(/\.subset\.(\d+)\.woff2/)?.[1] ?? 0),
        weight: Number(weight),
        css: block.replace(/,\s*url\([^)]*\.woff\)\s*format\(['"]woff['"]\)/g, ''),
      });
    }
    faces.sort((a, b) => a.subset - b.subset || a.weight - b.weight);
    return { code: faces.map((face) => face.css).join('\n'), map: null };
  },
};

export default defineConfig({
  // 'https://username.github.io/Portfolio/' 와 컨테이너 루트 양쪽에서 동작
  base: './',
  plugins: [pretendardTrim],
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
