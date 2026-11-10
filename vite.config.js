import { defineConfig } from 'vite';

export default defineConfig({
  // 'https://username.github.io/Portfolio/' 와 컨테이너 루트 양쪽에서 동작
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});
