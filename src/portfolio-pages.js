export const pdfUrl = '/assets/portfolio.pdf';

// These numbers are the physical PDF pages, not the labels inside the slides.
export const chapters = [
  { id: 'intro', title: '표지와 목차', pages: [1, 2] },
  { id: 'about', title: 'About Me', pages: [3] },
  { id: 'process', title: 'Tech Stack & Process', pages: [4, 5] },
  { id: 'cinema', title: 'Cinema Talk', pages: [6, 7, 8, 9, 10, 11, 12, 13] },
  { id: 'crew', title: 'MyCrewSoft', pages: [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26] },
  { id: 'closing', title: 'Closing', pages: [27] },
];

export const pageTitles = {
  1: '표지',
  2: '목차',
  3: '개발자로서의 강점',
  4: '기술 스택 한눈에 보기',
  5: '분석부터 운영까지, 직접 수행했습니다',
  6: 'Cinema Talk (영화 커뮤니티)',
  7: '시스템 아키텍처',
  8: 'ERD & DB 설계',
  9: 'URL 명세 & 화면설계서',
  10: '핵심 기능 상세',
  11: '코드 하이라이트 · FrontController.java',
  12: '화면 ↔ 코드 매핑',
  13: '기능 시나리오',
  14: 'MyCrewSoft (그룹웨어)',
  15: '시스템 아키텍처',
  16: 'ERD & DB 설계',
  17: '유스케이스 & 시퀀스 다이어그램',
  18: 'API 명세 & 화면설계서',
  19: '핵심 기능 상세',
  20: 'AI 회의록 자동화 파이프라인',
  21: '코드 하이라이트 · StompChannelInterceptor.java',
  22: '코드 하이라이트 · MessengerEventListener.java',
  23: '화면 ↔ 코드 매핑',
  24: '기능 시나리오',
  25: '트러블슈팅 · CASE 01',
  26: '트러블슈팅 · CASE 02',
  27: '마무리',
};

export const pageAttachments = {
  8: [['ERD 원본', 'cinema-erd.png']],
  9: [
    ['화면설계서 1', 'cinema-wireframe-1.png'], ['화면설계서 2', 'cinema-wireframe-2.png'],
    ['화면설계서 3', 'cinema-wireframe-3.png'], ['화면설계서 4', 'cinema-wireframe-4.png'],
  ],
  16: [['ERD 원본', 'crew-erd.png']],
  17: [['유스케이스 원본', 'crew-use-case.png'], ['시퀀스 원본', 'crew-sequence.png']],
  18: [
    ['화면설계서 1', 'crew-wireframe-1.png'], ['화면설계서 2', 'crew-wireframe-2.png'],
    ['화면설계서 3', 'crew-wireframe-3.png'], ['화면설계서 4', 'crew-wireframe-4.png'],
  ],
};

export function sheetUrl(page) {
  return `/assets/portfolio-pages/page-${String(page).padStart(2, '0')}.webp`;
}
