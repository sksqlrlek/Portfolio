// 가운뎃점(·)에서 줄이 바뀌면 '·CSRF까지 검사'처럼 점으로 시작하는 줄이 생깁니다.
// 화면에 넘기기 전에 문구를 정리해, 점이 앞뒤 단어와 함께 움직이게 합니다.
//  - '트랜잭션·CSRF'처럼 붙은 점: 앞뒤에 보이지 않는 단어 결합 문자(U+2060)를 넣어 한 단어로 묶음
//  - '분석 · 설계'처럼 띄운 점: 점 앞 공백을 줄바꿈 없는 공백으로 바꿔 점이 앞 단어에 붙어 있게 함
// 주소·파일 경로·코드처럼 글자 그대로 써야 하는 값은 건드리지 않습니다.
const WORD_JOINER = '⁠';
const LITERAL_KEYS = new Set(['href', 'src', 'url', 'live', 'photo', 'email', 'github', 'id', 'code', 'file', 'logo']);

function glueDots(text) {
  return text
    .replace(/(\S)·(?=\S)/g, `$1${WORD_JOINER}·${WORD_JOINER}`)
    .replace(/ · /g, ' · ');
}

export function keepDots(value, key = '') {
  if (typeof value === 'string') return LITERAL_KEYS.has(key) ? value : glueDots(value);
  if (Array.isArray(value)) return value.map((item) => keepDots(item, key));
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, keepDots(v, k)]));
  }
  return value;
}
