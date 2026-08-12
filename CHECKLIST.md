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
  한 번에 처리).
  - 테마: 순백/블랙 대신 두 앱 실제 배경색(웜 파치먼트, Wordflow `globals.css`에서 정확한 hex 확인)에
    맞춘 웜톤 베이스로 전환. `/sprout`, `/wordflow` 페이지엔 각 앱 실제 브랜드 컬러(Sprout 세이지그린,
    Wordflow 클레이/골드)로 아이콘 뱃지 + 차별점 박스 틴트.
  - 헤더 네비에 "About" 추가, 홈페이지에 "About SL Studio" 섹션 신설.
  - Contact를 mailto 팝업에서 **실제 폼**으로 전환. Vercel 마켓플레이스로 Resend 설치
    (`vercel integration discover --category messaging` 결과 Resend가 유일한 옵션), `sl-studio.dev`
    도메인은 이전 Sprout 작업에서 이미 verified 상태였음. 이 프로젝트 전용 Sending-access API 키를
    새로 발급해서 `RESEND_API_KEY`로 Vercel env(production/preview/development)에 추가, 클립보드로만
    옮기고 화면에는 노출 안 함. `/api/contact` 라우트 + 허니팟 필드 있는 폼 컴포넌트 작성, "Response
    within 48 hours." 문구 포함. 로컬 + 프로덕션 둘 다 실제 제출 테스트해서 Gmail 도착 및 Reply-To가
    방문자 이메일로 정확히 잡히는 것까지 확인함.
  - 각 앱 페이지에 이름 바로 아래 "누구나 한눈에 알아볼 명확한 캐치라인" 추가(Sprout: "Record your
    baby's every milestone, memory, and moment.", Wordflow: "Read the Bible in a few minutes a day.").
    "이미 이런 앱 많은데 왜?"에 직접 답하는 "Why not just use another [카테고리] app?" 섹션 신설.
  - 진행 중 이슈: 세션 중간에 macOS가 `~/Desktop` 폴더 접근 권한을 갑자기 회수해서 파일 읽기/쓰기가
    전부 막힌 적 있음(Downloads 폴더 때와 비슷한 macOS 프라이버시 보호). 사용자가 시스템 설정에서
    권한 재확인 후 복구됨. 앞으로 비슷한 "Operation not permitted" 에러 뜨면 이 문제일 가능성 높음.
- [x] **카피에서 em dash 전부 제거.** "AI가 쓴 것 같다"는 피드백으로 사이트 전체 문구(및 코드 주석)에서
  em dash(—)를 마침표/콜론/문장 재구성으로 교체. 동시에 About 문단과 히어로 서브헤드가 "Sprout and
  Wordflow are the first two entries"처럼 현재 앱 이름/개수를 하드코딩하고 있던 것도 발견해서 제너럴한
  문구로 변경(앱 추가될 때마다 손으로 고칠 필요 없게). 앞으로 이 레포뿐 아니라 전반적으로 em dash
  안 쓰기로 하고 메모리에도 남겨둠.
- [x] **테마 한 단계 더 밝게 (총 두 번).** 배경 `#faf3e6` → `#fdf8ef` → `#fffdf8`로 점점 화이트에 가깝게,
  카드는 순백(`#ffffff`)으로 바꿔서 배경과 대비되게, 보더 톤도 같이 밝힘.
- [x] **Contact에 직접 이메일 안내 추가, 메타에 iOS/Android 표기, Wordflow 콘텐츠 비공개 처리**
  (2026-08-07, 이후 문구 두 차례 더 다듬음).
  - Contact 폼 아래에 이메일 직접 연락 문구 추가. 처음엔 "Prefer email? ..."로 했다가 "이건 너무
    영업용 말투"라는 피드백으로 "If you'd rather email us directly, reach out at ..."로 재수정.
  - 앱스토어/플레이스토어로만 팔 예정(광고 정책 문제)이라는 본인 확인에 따라 메타 라인에서 "web"을
    아예 빼고 "iOS & Android"만 남김(처음엔 "web, iOS & Android"로 했다가 수정).
  - Wordflow는 아직 라이선스 승인 대기 중이라 퍼블릭에 마케팅 콘텐츠 보여주고 싶지 않다는 요청으로
    `AppEntry`에 `comingSoon` 플래그 추가. 홈 카드/상세 페이지 둘 다 캐치라인, 설명, 차별점 섹션,
    상태 체크리스트를 안 보여줌. 상세 페이지 문구도 처음엔 "We're finishing up the approval
    process..."로 했다가 "승인중이네 뭐네 하지 말고 그냥 곧 온다는 느낌만"이라는 피드백으로 단순히
    "Coming soon!" 한 줄로 축소. 메타 태그(og description)도 실제 설명 안 새게 처리 확인함. 실제
    콘텐츠는 `src/lib/apps.ts`와 `src/app/wordflow/page.tsx`에 그대로 남아있고 렌더링만 조건부로
    건너뜀. 나중에 승인 나면 `comingSoon: false`로 한 줄만 바꾸면 전체 페이지 바로 복원됨.

- [x] **파비콘/브랜드 마크 + OG 이미지/소셜 메타태그** (2026-08-08) — create-next-app 기본 파비콘을
  Next.js 코드 생성 아이콘(`app/icon.tsx`, `app/apple-icon.tsx`)의 "SL" 모노그램으로 교체(니어블랙
  배경 `#3a2e26` + 웜 배경색 `#fffdf8` 글자, 32x32/180x180). 기존 `favicon.ico`는 삭제(코드 생성
  아이콘이 대체). 링크 공유 시 미리보기용 OG/트위터 이미지(`app/opengraph-image.tsx`,
  `app/twitter-image.tsx`, 1200x630, "SL Studio" 워드마크 + 태그라인)도 `next/og`의
  `ImageResponse`로 생성해서 추가, 두 라우트가 같은 디자인을 `src/lib/social-image.tsx`에서
  공유. 루트 레이아웃 메타데이터에 `metadataBase`(`https://sl-studio.dev`), `openGraph`,
  `twitter` 필드 추가. 부수적으로 타이틀 템플릿(`%s · SL Studio`)도 추가해서 Sprout/Wordflow
  페이지의 타이틀이 중복 접미사(`· SL Studio · SL Studio`)로 안 붙게 정리. `next build` +
  로컬 서버에서 `/icon`, `/apple-icon`, `/opengraph-image` 실제 렌더링 결과 스크린샷으로 확인,
  홈페이지 `<head>` 메타태그 출력도 확인 완료.

## 남은 것

- [ ] **모바일 반응형 다듬기 (진행 중)** — 터치 타겟 크기(Contact/CTA 링크에 탭 여백 추가),
  좁은 화면에서 배지 줄바꿈 안전장치, 섹션 여백 축소는 코드 레벨로 반영해서 배포함. 다만 브라우저
  자동화 툴이 실제 좁은 뷰포트를 강제하지 못해서(창 크기 조절이 안 먹힘) 실기기 스크린샷으로는 확인
  못 함. 본인이 실제 폰으로 `sl-studio.dev` 열어보고 어색한 부분 알려주면 마무리.
- [ ] **iOS/Android 다운로드 링크 (작업 진행 중)** — 두 앱 다 네이티브 빌드 작업 중이라고 확인함(메타
  라인엔 이미 반영). 실제 앱스토어/플레이스토어 URL이 생기면 빌드 로그 카드에 배지/링크 추가.
- [ ] **Wordflow 서브도메인** — `wordflow.sl-studio.dev` 같은 서브도메인을 Wordflow **자체** Vercel
  프로젝트(`sl-studio/wordflow`) 설정에서 추가해야 함. 이 레포 작업 아님, wordflow 레포에서 진행.
- [ ] **www 서브도메인 처리** — `www.sl-studio.dev` 리다이렉트 여부 결정 안 됨 (현재 apex만 연결됨).
- [ ] **세 번째 앱 추가** — 새 앱이 나오면 `src/lib/apps.ts`에 항목 추가 + `src/app/<slug>/page.tsx`
  전용 페이지 생성. 정직한 상태 표시, 실제 있는 것만(데모/스크린샷/기능/CTA) 넣기.

## 완료됨 (계속)

- [x] **Sprout 데모를 GIF에서 실제 홍보 영상(mp4)로 교체** (2026-08-12) — 사용자가 레포 루트에
  `sprout-demo-cut.mp4`(세로 840x1446, 33초, 온보딩부터 Journal/Feed/Milestones/Settings까지
  훑고 캡션 박힌 완성 프로모 영상)를 직접 넣어둠. `public/demos/sprout-demo.mp4`로 옮기고 기존
  `sprout-demo.gif` 삭제. `src/lib/apps.ts`의 `demo` 타입에 `type: "image" | "video"` 추가,
  Sprout 항목을 새 영상으로 교체(alt 텍스트도 실제 영상 내용에 맞게 갱신). 홈페이지/`/sprout`
  페이지에서 GIF `<img>`를 직접 렌더링하던 중복 코드를 `src/components/demo-media.tsx`
  (`DemoMedia`, type에 따라 `<video>`/`<img>` 분기)로 통합. 세로 영상이라 기존 `max-w-4xl`
  풀와이드 컨테이너 대신 세로 비율일 때만 좁은 컨테이너(`max-w-[320px] sm:max-w-[360px]`)로
  분기하도록 두 페이지 다 수정.
  - **버그 발견 및 수정**: 실제 브라우저에서 영상이 아예 재생되지 않는 문제 발견. 원인은 mp4의
    `moov` 박스(메타데이터)가 파일 맨 앞이 아니라 맨 끝에 있는("faststart" 아닌) 상태였음:
    이러면 브라우저가 전체 파일을 다 받아야 재생 가능한 메타데이터를 얻을 수 있어서 특히
    Safari/iOS에서 재생이 아예 안 되거나 크게 지연됨. `ffmpeg -c copy -movflags +faststart`로
    무손실 리먹싱(재인코딩 없음, 디코딩된 프레임 데이터 md5 대조로 동일함 확인)해서 moov를
    파일 앞으로 이동시켜 해결. Range 요청(206 Partial Content) 정상 동작도 curl로 확인.
  - **확인 관련 제약**: 이 세션에서 쓰는 Chrome 자동화 툴 자체가 영상 재생을 지원하지 않는
    것으로 보임(우리 파일뿐 아니라 MDN의 공개 테스트 mp4도 로딩 스피너에서 멈춤). 그래서
    faststart 수정 후에도 자동화 브라우저로 실제 재생 성공 여부는 육안 확인 못 함(레이아웃/
    컨테이너 크기는 스크린샷으로 확인). `next build` 통과, curl로 Range 요청/컨텐츠 타입 정상
    확인. 본인이 실제 브라우저로 `sl-studio.dev` 홈/Sprout 페이지 열어서 영상이 잘 뜨고
    자동재생/루프 되는지 최종 확인 필요.
  - **영상 내용 관련 참고**: 영상 마지막 8초 가량(설정 화면)에 "Signed in as
    slstudio8495@gmail.com"과 계정 삭제(Danger zone) 섹션이 그대로 노출됨. 데모 계정이라
    실제 가족 데이터는 아니지만, 본인 확인 결과 "그냥 이대로 임베드"하기로 결정함(트림 안 함).
- [x] **홈페이지에서 Sprout 데모 영상 섹션 제거** (2026-08-12) — 홈페이지는 앱 전체를 소개하는
  자리인데 특정 앱(Sprout) 영상이 히어로 바로 아래 크게 자리 잡는 게 구조적으로 안 맞는다는
  피드백. `src/app/page.tsx`에서 featured demo 섹션 통째로 삭제, 히어로 다음 바로 Build log
  그리드(두 앱 동등하게)로 이어지게 정리. 데모 영상은 `/sprout` 상세 페이지에만 남음.
- [x] **Sprout 페이지에 "Before Sprout" 비교 섹션 추가 + 데모 영상 업데이트** (2026-08-12) —
  사용자가 레포 루트에 손으로 직접 앨범 만들던 시절(사진 자르기, 인쇄, 손글씨, 무거운 책 한 권)을
  보여주는 폴라로이드 스타일 일러스트 4장(`before-01~04.png`, 세로 840x1446, 하단에 큰 여백)과
  갱신된 데모 영상(`sprout-demo-cut.mp4`, 이 일러스트 인트로 + 반려동물 피드 항목 추가된 버전,
  35.7초)을 넣어둠. 컨셉: "손으로 직접 앨범 만들던 걸 이제 앱 하나로." Python/PIL로 각 이미지의
  실제 콘텐츠 영역(사진+캡션)만 자동 감지해서 크롭(840x815, 정사각형에 가까운 비율) 후 JPEG로
  변환(투명 채널 없음 확인, PNG 대비 용량 큰 폭 절감)해서 `public/sprout/before-0X.jpg`로 저장.
  `src/lib/apps.ts`에 `BeforeAfter` 타입(`label`, `images[]`, `punchline`) 추가하고 Sprout
  항목에 데이터 채움. `/sprout` 페이지의 differentiation 박스와 데모 영상 사이에 새 섹션 삽입:
  라벨 "Before Sprout" + 4컬럼(모바일 2컬럼) 그리드 + "Now it's just... here." 펀치라인으로
  바로 아래 영상 섹션과 자연스럽게 이어지게 구성. 정적 이미지라 `next/image` 사용(이 레포에서
  처음 사용, 기존 데모는 GIF/영상이라 next/image 못 씀). 새 데모 영상도 이전과 동일하게
  `ffmpeg -movflags +faststart`로 무손실 리먹싱해서 교체. 원본 PNG/mp4는 레포 루트에서 정리함.
  `next build` 통과, 자동화 브라우저 스크린샷 확대(zoom)로 이미지 4장 다 정상 렌더링 확인
  (풀사이즈 스크린샷에서는 흐릿하게 보였지만 확대해보니 정상 렌더링, 스크린샷 압축 문제였음).
- [x] **Sprout 마케팅 카피 재작성: "카메라롤 vs 평생 보관 아카이브" 훅으로 전환** (2026-08-12) —
  본인이 짚어준 실제 포인트: 나중에 애기한테 "너 이때 이랬어" 하려면 지금은 장롱 속 앨범을 꺼내야
  하고, 폰으로 다 찍었어도 10년 넘게 찍으면 몇만 장이 돼서 정작 그 순간 무슨 생각을 했는지는
  카메라롤에 안 남는다는 것. Sprout는 전부가 아니라 기억하고 싶은 순간만 날짜 + 그때 생각/코멘트를
  붙여서 평생 보관하고, 나중에 아이에게 선물처럼 넘겨주는 앱이라는 게 진짜 훅. `src/lib/apps.ts`의
  Sprout `tagline`("The moments worth keeping, not another camera roll."), `catchline`("Save
  the moments you'll want to hand back to them, someday."), `meta`("Lifelong memory journal"로
  변경), `description`, `different`(제목을 "Why not just keep the photos on your phone?"로
  교체, 카메라롤 몇만 장 문제 + "A camera roll can hold the photo. It can't hold the memory."
  훅 문구) 전부 재작성. 기존에 있던 "다른 베이비저널 앱과 비교"(다국어/음성메모/양쪽 부모) 차별점은
  삭제 안 하고 `features` 그리드에 그대로 남겨둠, 리드 메시지만 카메라롤/평생보관 훅으로 교체.
  홈페이지 카드(`tagline` 재사용)와 `/sprout` 페이지 둘 다 로컬 스크린샷으로 확인, `next build`
  통과. 다음 작업: Sprout 페이지에 "How to use the app" 섹션 추가 예정.
