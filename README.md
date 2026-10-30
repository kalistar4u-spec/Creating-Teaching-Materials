# Habit Quest

초등 6학년 영어 **생활 습관과 빈도 표현**을 배우는 4차시 웹 활동지입니다.
기초·기본·도전, 총 12개 학습 조합과 다운로드용 PDF 16종을 제공합니다.

배포 주소: https://kalistar4u-spec.github.io/Creating-Teaching-Materials/

## 수업 사용

1. 난이도를 선택하고 차시 카드를 엽니다.
2. 표현 익히기 → 문장 미션 → 말하고 쓰기를 진행합니다.
3. 문장 미션 6문항에 도전하고 정답 확인을 누릅니다.
4. 표현 활동 작성과 자기 점검을 마치면 완료 배지를 받습니다.
5. 다운로드 메뉴에서 학생용 차시별 2쪽, 수준별 묶음 8쪽, 교사용 8쪽 PDF를 받습니다.

완료 배지는 참여 기록입니다. 말하기·자유 글쓰기는 자동 채점하지 않으며, 교사용 기준으로 관찰합니다.
답과 진행은 현재 브라우저에만 저장됩니다. 공용 기기에서는 수업 후 기록을 초기화하세요.
읽어주기는 기기의 영어 음성이 필요합니다. 녹음·음성 인식·학생 계정·서버 수집은 없습니다.

## 로컬 실행

Node.js 22 이상.

```sh
npm ci
npx playwright install chromium
npm run dev
```

터미널에 표시되는 주소에서 /Creating-Teaching-Materials/ 경로를 엽니다.
Windows에서는 설치된 Chrome 또는 Edge를 테스트와 PDF 생성에 사용합니다.

```sh
npm run pdf
npm run check:pdf
npm test
npm run build
npm run preview
```

PDF 생성은 로컬 Chromium 인쇄 엔진을 사용합니다. 한글 폰트를 포함하며 외부 변환 서버에 보내지 않습니다.
PDF 검사는 16개 파일의 쪽수와 한글 텍스트를 확인하고 32개 고유 페이지를 PNG로 렌더링합니다.
중간 산출물은 git에서 제외된 tmp/ 폴더에 저장됩니다.

## 내용 수정

- src/content.mjs: 어휘, 차시, 난이도별 문항, 정답, 문장 예시, 성취기준.
- src/App.tsx: 웹 학습 화면과 브라우저 저장.
- scripts/generate-pdfs.mjs: 동일 학습 데이터로 학생용·교사용 PDF 생성.

내용 수정 뒤 PDF를 재생성하고 웹 및 PDF 검사를 실행하세요.
public/pdf/에는 배포용으로 직접 만든 PDF만 들어갑니다.

## GitHub Pages 배포

Settings → Pages → Source를 **GitHub Actions**로 선택합니다.
main 브랜치에 업로드하면 pages.yml이 PDF 생성·검사·브라우저 테스트·빌드를 통과한 뒤 배포합니다.
프로젝트 이름을 변경할 경우 vite.config.ts의 base와 테스트 경로도 변경해야 합니다.
페이지 이동은 해시를 사용하여 Pages에서 새로고침할 때 404를 방지합니다.

## 교육과정과 출처

중심 성취기준: 2022 개정 영어 5~6학년군 [6영02-07], [6영02-08].
보조 기준: [6영02-01], [6영02-03], [6영02-09], [6영02-10].
성취기준은 NCIC 교육과정 원문을 수록한
[korean-elementary-learning-map-mcp 0.5.2](https://github.com/taehyeonglim/korean-elementary-learning-map-mcp)로 확인했습니다.

천재교과서(함순애) 6학년 10단원의 의사소통 주제를 참고한 독립 제작 자료입니다.
출판사 공식 자료가 아니며, 교과서 PDF·삽화·본문 지문·문항은 포함하지 않습니다.
배포된 문항·예시 상황·캐릭터·활동은 별도로 제작했습니다.
단어·어구는 이 수업을 위한 선정 목록으로, 국가 교육과정의 필수 어휘 전체 목록이 아닙니다.
생활 습관의 횟수는 영어 연습 예시이며 건강 권고치가 아닙니다.

글꼴 Noto Sans KR(OFL 1.1), 아이콘 Lucide(ISC)의 라이선스는 public/licenses/에서 확인할 수 있습니다.

## 검증 범위

기능 검증은 자동 테스트와 화면·PDF 검토를 병행합니다. 운영체제별 영어 음성 제공 여부와
학생의 실제 말하기 성취는 자동 테스트가 판정하지 않습니다.
