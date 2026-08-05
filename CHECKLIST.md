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
- [x] **프로페셔널 라이트 테마 + 실제 스크린샷** — Linear/Raycast(다크)와 Attio/Cursor(라이트) 벤치마킹한 후
  라이트 방향으로 결정. 웜페이퍼/그리드노트/회전 스탬프 배지를 걷어내고 화이트+잉크+그레이 모노크롬 톤으로
  전환, 상태 표시도 회전 배지 대신 작은 점(dot) + 라벨로 차분하게. Sprout 카드에 실제 로그인 전 마케팅
  화면 스크린샷을 박아 넣어서 텍스트로만 설명하지 않고 실제로 보여주는 방식으로 변경(Wordflow는 아직
  공개 UI가 없어서 텍스트만 유지). 헤더/푸터 연락처도 `support@sl-studio.dev`로 갱신.

## 남은 것

- [ ] **Sprout 데모 영상 (~20초)** — "Try Sprout" 링크는 실제 가족 앱으로 연결되는 문제라 제거함(배포 완료).
  대신 테스트 계정으로 앱 핵심 동작(탭 이동, 글쓰기 등)을 짧게 녹화해서 GIF/영상으로 카드에 넣기로 함.
  Google OAuth 로그인이 필요해서 본인이 직접 로그인해줘야 진행 가능 — 진행 중 일시 중단.
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
- [ ] **세 번째 앱 추가** — 새 앱이 나오면 `src/app/page.tsx`의 `entries` 배열에 같은 패턴(번호, 정직한
  상태 표시, 실제 링크/스크린샷 있을 때만 추가)으로 추가.
