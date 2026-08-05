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
  `support@sl-studio.dev`로 교체 (wordflow 레포 작업).

## 남은 것

- [ ] **iOS/Android 다운로드 링크** — 아직 두 앱 다 네이티브 빌드/스토어 등록이 없음. 실제 앱스토어/
  플레이스토어 URL이 생기면 빌드 로그 카드에 배지/링크 추가.
- [ ] **Wordflow 서브도메인** — `wordflow.sl-studio.dev` 같은 서브도메인을 Wordflow **자체** Vercel
  프로젝트(`sl-studio/wordflow`) 설정에서 추가해야 함. 이 레포 작업 아님, wordflow 레포에서 진행.
- [ ] **모바일 반응형 다듬기** — 데스크탑은 괜찮은데 폰에서 봤을 때 UI가 더 친화적이었으면 함. 실제
  모바일 뷰포트로 점검/수정.
- [ ] **다크/블랙 프로페셔널 테마로 전환** — 지금의 웜페이퍼/필드노트북 톤 대신 좀 더 검정 기반의
  프로페셔널한 톤으로. 테마 작업 들어가기 전에 벤치마킹할 사이트부터 몇 개 찾아보기로 함.
- [ ] **파비콘/브랜드 마크** — 지금은 create-next-app 기본 파비콘 그대로. "SL" 모노그램 심볼로 교체.
- [ ] **OG 이미지 / 소셜 메타태그** — 카카오톡, 슬랙, 트위터 등에 링크 공유할 때 보이는 미리보기 이미지/
  설명 없음. 추가 필요.
- [ ] **www 서브도메인 처리** — `www.sl-studio.dev` 리다이렉트 여부 결정 안 됨 (현재 apex만 연결됨).
- [ ] **스크린샷/비주얼** — 빌드 로그 카드가 지금 텍스트만 있음. Sprout 실제 스크린샷이나 프리뷰 이미지
  추가하면 설득력 올라감.
- [ ] **세 번째 앱 추가** — 새 앱이 나오면 `src/app/page.tsx`의 `entries` 배열에 같은 패턴(번호, 정직한
  상태 스탬프, 실제 링크 있을 때만 CTA)으로 추가.
