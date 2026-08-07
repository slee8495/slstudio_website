# SL Studio 웹사이트 체크리스트

완료되는 대로 `[ ]`를 `[x]`로 바꿔서 체크. 하나씩 순서대로 처리.

## 완료됨

- [x] **도메인 구매 + 연결** — `sl-studio.dev` 구매 완료 (Vercel registrar, $13/yr 갱신), Vercel 팀 `sl-studio` 아래
  등록. `slstudio-website` 프로젝트에 연결되어 `https://sl-studio.dev`로 실제 서비스 중.
- [x] **홈페이지 v1** — Next.js 16 + Tailwind v4. "빌드 로그" 컨셉 (그리드 노트 배경 + 앱별 번호가 매겨진
  로그 엔트리 + 실제 상태를 보여주는 스탬프 배지). Sprout(실제 링크, PRE-LAUNCH), Wordflow(링크 없음,
  AWAITING LICENSE) 소개. GitHub(`slee8495/slstudio_website`) 연결되어 main 브랜치 푸시 시 자동 배포.
- [x] **지원 이메일 (`support@sl-studio.dev`)** — ImprovMX(무료 이메일 포워딩)로 `slstudio8495@gmail.com`
  계정 만들고 `sl-studio.dev` 도메인 등록, `support@` alias + 캐치올(`*@`) 둘 다 Gmail로 포워딩되게 설정.
  MX(`mx1`/`mx2.improvmx.com`, 우선순위 10/20) + SPF TXT 레코드를 `vercel dns add`로 추가, ImprovMX에서
  "Active"로 확인 완료. 다음 단계: Wordflow `/privacy`, `/terms`에 박힌 `slstudio8495@gmail.com`을
  `support@sl-studio.dev`로 교체 (wordflow 레포 작업). **참고**: 답장은 여전히 `slstudio8495@gmail.com`
  발신으로 나감 — Gmail의 "Send mail as"가 SMTP 릴레이 인증정보를 요구하는데 이건 ImprovMX 유료
  플랜($9/mo)에서만 제공돼서, 일단 비용 안 쓰고 이대로 두기로 결정함. 나중에 필요해지면 업그레이드 고려.
- [x] **프로페셔널 테마로 전환** — Linear/Raycast(다크)와 Attio/Cursor(라이트) 벤치마킹 후 처음엔 라이트로
  갔다가, 실제로 보고 나서 **블랙 테마**로 최종 확정(2026-08-06). 웜페이퍼/그리드노트/회전 스탬프 배지를
  걷어내고 니어블랙 배경 + 화이트 잉크 + 그레이 톤으로 전환, 카드는 페이지보다 살짝 밝은 surface 톤으로
  구분(Linear 스타일). 상태 표시는 회전 배지 대신 작은 점(dot) + 라벨. 헤더/푸터 연락처도
  `support@sl-studio.dev`로 갱신.
- [x] **"Try Sprout" 링크 제거 + 실제 데모 GIF로 교체** — 원래 CTA가 실제 가족 Sprout 앱으로 연결돼서
  프라이버시 문제로 링크 제거(배포됨). 대신 `slstudio8495@gmail.com`으로 로그인해 완전히 분리된 테스트
  계정("The Demo Family" / 아이 "Ted")을 만들고, 저널 작성 → 마일스톤 태그 → Feed/Milestones 탭 확인까지
  실제 조작을 13프레임 GIF로 녹화(`public/demos/sprout-demo.gif`)해서 정적 스크린샷 대신 삽입. 실제
  가족(Roun) 데이터는 전혀 건드리지 않음. 테스트 계정은 재녹화 대비해서 삭제 안 하고 남겨둠(원하면
  Sprout 설정 > Danger zone에서 본인이 직접 삭제 가능).
- [x] **1페이지 → 멀티페이지 구조로 확장** — Resend의 네비 메가메뉴 + 기능별 전용 페이지 패턴을
  벤치마킹해서 적용(앱이 2개뿐이라 드롭다운 대신 플랫 네비 링크: Sprout / Wordflow / Contact).
  홈은 압축된 인덱스(아이콘 + 상태 + 한줄 태그라인 + "View X →")로 가볍게 유지하고, `/sprout`,
  `/wordflow` 전용 페이지를 새로 만들어서 큰 히어로(아이콘+상태+제목) + 콘텐츠를 옮김. Sprout
  페이지엔 데모 GIF + 실제 앱 기능 카드 4개(사진/음성메모, 마일스톤, 프라이버시, 다국어) 그대로 재사용.
  Wordflow는 보여줄 게 없어서 대신 "Where it stands" 상태 체크리스트(빌드 완료 vs 라이선스 대기)로
  정직하게 채움. `SiteHeader`/`SiteFooter`/`src/lib/apps.ts`로 공통 데이터·컴포넌트 분리.
- [x] **카피 재작성 (마케팅 훅) + 이름 삭제** — 푸터의 "Sangho Lee" 삭제. Sprout 태그라인을 "A private,
  lifelong journal for our son"(설명형) → "The bilingual baby journal built to actually stick"
  (차별점 강조형)으로, Wordflow도 "Bible reading that survives past January"로 변경 — 둘 다 "이런 종류
  앱은 보통 왜 금방 버려지는가" 문제 제기 후 우리 앱이 그걸 어떻게 해결하는지로 훅을 잡음. Sprout
  설명에서 실제로 구현 안 된 챗봇 Q&A 언급도 제거함(README에 "brainstormed"로만 있던 기능, 실제 배포
  안 됨 확인 — 안 만든 기능은 마케팅에도 안 씀).
- [x] **테마 재검토 → 순백 + 노션 스타일 와이드 레이아웃 확정** (2026-08-06, 같은 날 두 번째 전환) — 블랙이
  "너무 어둡다"는 피드백으로 다시 벤치마킹(Notion=순백, GitHub=인디고틴트 소프트다크). 실제 사이트에
  세 가지 팔레트(니어블랙/인디고다크/순백)를 코드로 직접 적용해서 스크린샷 비교한 후 순백으로 최종
  확정. 동시에 "화면 양옆이 텅 비어서 폰 화면 같다"는 피드백으로 전체 컨테이너를 `max-w-3xl` →
  `max-w-6xl`로 확장. 스톡사진 대신 실제 Sprout 데모 GIF를 홈 히어로 바로 아래 큰 비주얼로 배치(노션의
  히어로 이미지 자리), 빌드 로그 인덱스는 2컬럼 그리드로, Sprout 기능 카드는 4컬럼, Wordflow 상태
  체크리스트는 3컬럼으로 펼쳐서 넓어진 폭을 실제 콘텐츠로 채움. Sprout 언어 카피도 "영어/한국어"에서
  실제 지원하는 5개 언어(영어/한국어/일본어/중국어/스페인어)로 정정.
- [x] **웜페이퍼 테마 + 앱별 브랜드 컬러, About/Contact 섹션, 실전 연락 폼, 카피 명확화** (2026-08-07,
  한 번에 처리) —
  - 테마: 순백/블랙 대신 두 앱 실제 배경색(웜 파치먼트, Wordflow `globals.css`에서 정확한 hex 확인)에
    맞춘 웜톤 베이스로 전환. `/sprout`, `/wordflow` 페이지엔 각 앱 실제 브랜드 컬러(Sprout 세이지그린,
    Wordflow 클레이/골드)로 아이콘 뱃지 + 차별점 박스 틴트.
  - 헤더 네비에 "About" 추가, 홈페이지에 "About SL Studio" 섹션 신설.
  - Contact를 mailto 팝업에서 **실제 폼**으로 전환 — Vercel 마켓플레이스로 Resend 설치
    (`vercel integration discover --category messaging` → Resend가 유일한 결과), `sl-studio.dev`
    도메인은 이전 Sprout 작업에서 이미 verified 상태였음. 이 프로젝트 전용 Sending-access API 키를
    새로 발급해서 `RESEND_API_KEY`로 Vercel env(production/preview/development)에 추가, 클립보드로만
    옮기고 화면에는 노출 안 함. `/api/contact` 라우트 + 허니팟 필드 있는 폼 컴포넌트 작성, "Response
    within 48 hours." 문구 포함. 로컬 + 프로덕션 둘 다 실제 제출 테스트해서 Gmail 도착 및 Reply-To가
    방문자 이메일로 정확히 잡히는 것까지 확인함.
  - 각 앱 페이지에 이름 바로 아래 "누구나 한눈에 알아볼 명확한 캐치라인" 추가(Sprout: "Record your
    baby's every milestone, memory, and moment.", Wordflow: "Read the Bible in a few minutes a day.").
    "이미 이런 앱 많은데 왜?"에 직접 답하는 "Why not just use another [카테고리] app?" 섹션 신설.
  - 진행 중 이슈: 세션 중간에 macOS가 `~/Desktop` 폴더 접근 권한을 갑자기 회수해서 파일 읽기/쓰기가
    전부 막힌 적 있음(Downloads 폴더 때와 비슷한 macOS 프라이버시 보호) — 사용자가 시스템 설정에서
    권한 재확인 후 복구됨. 앞으로 비슷한 "Operation not permitted" 에러 뜨면 이 문제일 가능성 높음.

## 남은 것

- [ ] **모바일 반응형 다듬기 (진행 중)** — 터치 타겟 크기(Contact/CTA/Say hello 링크에 탭 여백 추가),
  좁은 화면에서 배지 줄바꿈 안전장치, 섹션 여백 축소는 코드 레벨로 반영해서 배포함. 다만 브라우저
  자동화 툴이 실제 좁은 뷰포트를 강제하지 못해서(창 크기 조절이 안 먹힘) 실기기 스크린샷으로는 확인
  못 함 — 본인이 실제 폰으로 `sl-studio.dev` 열어보고 어색한 부분 알려주면 마무리.
- [ ] **iOS/Android 다운로드 링크** — 아직 두 앱 다 네이티브 빌드/스토어 등록이 없음. 실제 앱스토어/
  플레이스토어 URL이 생기면 빌드 로그 카드에 배지/링크 추가.
- [ ] **Wordflow 서브도메인** — `wordflow.sl-studio.dev` 같은 서브도메인을 Wordflow **자체** Vercel
  프로젝트(`sl-studio/wordflow`) 설정에서 추가해야 함. 이 레포 작업 아님, wordflow 레포에서 진행.
- [ ] **파비콘/브랜드 마크** — 지금은 create-next-app 기본 파비콘 그대로. "SL" 모노그램 심볼로 교체.
- [ ] **OG 이미지 / 소셜 메타태그** — 카카오톡, 슬랙, 트위터 등에 링크 공유할 때 보이는 미리보기 이미지/
  설명 없음. 추가 필요.
- [ ] **www 서브도메인 처리** — `www.sl-studio.dev` 리다이렉트 여부 결정 안 됨 (현재 apex만 연결됨).
- [ ] **세 번째 앱 추가** — 새 앱이 나오면 `src/lib/apps.ts`에 항목 추가 + `src/app/<slug>/page.tsx`
  전용 페이지 생성. 정직한 상태 표시, 실제 있는 것만(데모/스크린샷/기능/CTA) 넣기.
