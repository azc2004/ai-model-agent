# PC·모바일 반응형 UI/UX 개선 구현 계획

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 전문가용 정보 밀도를 유지하면서 PC·태블릿·모바일의 내비게이션, 콘텐츠 계층, 접근성, 성능을 일관된 반응형 체계로 개선합니다.

**Architecture:** 단일 메뉴 설정과 반응형 AppShell을 먼저 구축한 뒤 화면별 패턴을 점진적으로 적용합니다. Vitest·Testing Library로 컴포넌트를, Playwright·axe로 핵심 흐름과 접근성을 검증하며 화면 단위 지연 로딩으로 초기 번들을 줄입니다.

**Tech Stack:** React 19, TypeScript 6, Vite 8, Tailwind CSS 4, Vitest, Testing Library, Playwright, axe-core

**Spec:** `docs/superpowers/specs/2026-08-25-responsive-ui-ux-improvement-design.md`

## Global Constraints

- 전문가용 데이터와 기능을 삭제하지 않습니다.
- 모바일 360~767px, 태블릿 768~1279px, PC 1280px 이상을 기준으로 합니다.
- 최소 터치 영역은 44×44px, 모바일 본문은 14px 이상, 보조 정보는 12px 이상입니다.
- 한국어와 영어, 라이트와 다크 테마를 지원합니다.
- 현재 미커밋된 `NewsDetailView.tsx` 변경을 보존하고 충돌 시 중단해 비교합니다.
- 새 동작은 실패 테스트를 먼저 작성합니다.
- 뉴스 파이프라인 단일화 계획 완료 후 실행합니다.

---

### Task 1: 프론트엔드 테스트 기반 구축

**Files:**
- Modify: `frontend/package.json`
- Modify: `frontend/vite.config.ts`
- Create: `frontend/src/test/setup.ts`
- Create: `frontend/src/App.test.tsx`
- Create: `frontend/playwright.config.ts`
- Create: `frontend/e2e/smoke.spec.ts`

**Interfaces:**
- Produces: `npm test`, `npm run test:e2e`, jsdom 테스트 환경

- [ ] **Step 1: 테스트 스크립트와 최소 App 렌더 테스트 선언**

`package.json`에 다음 스크립트와 devDependency를 추가합니다.

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  },
  "devDependencies": {
    "@axe-core/playwright": "^4.10.2",
    "@playwright/test": "^1.55.0",
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^14.6.1",
    "jsdom": "^26.1.0",
    "vitest": "^3.2.4"
  }
}
```

```tsx
import { render, screen } from '@testing-library/react';
import { App } from './App';

test('renders the application shell while data loads', () => {
  render(<App />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
});
```

- [ ] **Step 2: 의존성 설치 후 현재 App 구조 때문에 실패 확인**

Run: `cd frontend && npm install && npm test -- src/App.test.tsx`

Expected: 현재 전체 화면 로딩 분기에는 `banner`가 없어 FAIL.

- [ ] **Step 3: Vitest와 Playwright 최소 설정 추가**

```ts
// src/test/setup.ts
import '@testing-library/jest-dom/vitest';
```

```ts
// vite.config.ts 내부
test: {
  environment: 'jsdom',
  setupFiles: './src/test/setup.ts',
  css: true,
},
```

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  webServer: { command: 'npm run dev -- --host 127.0.0.1', url: 'http://127.0.0.1:5173', reuseExistingServer: true },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['iPhone 13'] } },
  ],
});
```

```ts
// e2e/smoke.spec.ts
import { expect, test } from '@playwright/test';

test('opens the catalog', async ({ page }) => {
  await page.goto('/?tab=dashboard');
  await expect(page).toHaveTitle(/LLM COMPASS/i);
  await expect(page.getByRole('main')).toBeVisible();
});
```

초기 App 테스트는 Task 3의 스켈레톤 AppShell 구현 전까지 RED 상태로 유지합니다. 테스트 설정 자체는 빈 산술 sanity test로 검증합니다.

- [ ] **Step 4: 테스트 러너와 빌드 확인**

Run: `cd frontend && npm test -- --passWithNoTests && npm run build`

Expected: 테스트 러너 exit 0, build exit 0.

- [ ] **Step 5: 커밋**

```bash
git add frontend/package.json frontend/package-lock.json frontend/vite.config.ts frontend/src/test/setup.ts frontend/src/App.test.tsx frontend/playwright.config.ts frontend/e2e/smoke.spec.ts
git commit -m "test: add frontend component and e2e harness"
```

### Task 2: 디자인 토큰과 접근성 기본 규칙

**Files:**
- Modify: `frontend/src/index.css`
- Create: `frontend/src/styles/tokens.test.ts`

**Interfaces:**
- Produces: 의미 기반 CSS 변수와 `.touch-target`, `.numeric`, `.focus-ring`, `.mobile-safe-bottom`

- [ ] **Step 1: 필수 토큰 계약 테스트 작성**

```ts
import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';

test('defines responsive accessibility tokens', () => {
  const css = fs.readFileSync(path.resolve('src/index.css'), 'utf8');
  expect(css).toContain('--surface-1:');
  expect(css).toContain('min-height: 44px');
  expect(css).toContain('env(safe-area-inset-bottom)');
  expect(css).toContain('@media (prefers-reduced-motion: reduce)');
});
```

- [ ] **Step 2: 실패 확인**

Run: `cd frontend && npm test -- src/styles/tokens.test.ts`

Expected: 새 토큰이 없어 FAIL.

- [ ] **Step 3: 최소 토큰과 유틸리티 구현**

```css
:root {
  --surface-1: #f8fafc;
  --surface-2: #ffffff;
  --border-default: #e2e8f0;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --accent: #4f46e5;
  --content-max: 90rem;
}
.touch-target { min-width: 44px; min-height: 44px; }
.numeric { font-variant-numeric: tabular-nums; }
.mobile-safe-bottom { padding-bottom: calc(5rem + env(safe-area-inset-bottom)); }
.focus-ring:focus-visible { outline: 3px solid var(--accent); outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: 0.01ms !important; }
}
```

- [ ] **Step 4: 테스트와 린트 실행**

Run: `cd frontend && npm test -- src/styles/tokens.test.ts && npm run lint`

Expected: test PASS, lint 오류 0개.

- [ ] **Step 5: 커밋**

```bash
git add frontend/src/index.css frontend/src/styles/tokens.test.ts
git commit -m "style: define responsive dashboard tokens"
```

### Task 3: 단일 메뉴 설정과 반응형 AppShell

**Files:**
- Create: `frontend/src/navigation/navigationConfig.tsx`
- Create: `frontend/src/navigation/navigationConfig.test.tsx`
- Create: `frontend/src/components/AppShell.tsx`
- Modify: `frontend/src/App.tsx:1-224`
- Modify: `frontend/src/components/SidebarNav.tsx`
- Modify: `frontend/src/components/HeaderTopBar.tsx`
- Delete: `frontend/src/components/Navbar.tsx`

**Interfaces:**
- Produces: `AppTab` union
- Produces: `NAV_GROUPS: NavGroup[]`
- Produces: `MOBILE_PRIMARY_TABS: AppTab[]`
- Produces: `AppShellProps { activeTab, onNavigate, compareCount, children }`

- [ ] **Step 1: 단일 메뉴와 로딩 셸 실패 테스트 작성**

```tsx
test('each navigation id is unique and mobile primary tabs exist once', () => {
  const ids = NAV_GROUPS.flatMap(group => group.items.map(item => item.id));
  expect(new Set(ids).size).toBe(ids.length);
  expect(MOBILE_PRIMARY_TABS).toEqual(['dashboard', 'compare', 'news', 'tco']);
});

test('renders shell during initial loading', () => {
  render(<App />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /주요 메뉴/i })).toBeInTheDocument();
});
```

- [ ] **Step 2: 실패 확인**

Run: `cd frontend && npm test -- src/navigation/navigationConfig.test.tsx src/App.test.tsx`

Expected: config/AppShell이 없어 FAIL.

- [ ] **Step 3: 메뉴 타입과 AppShell 최소 구현**

```tsx
export type AppTab = 'dashboard' | 'compare' | 'tco' | 'advisor' | 'tutorial' | 'leaderboard' | 'gpus' | 'news' | 'sandbox' | 'speed';
export const MOBILE_PRIMARY_TABS: AppTab[] = ['dashboard', 'compare', 'news', 'tco'];
export const NAV_GROUPS = [
  { id: 'catalog', label: '메인 카탈로그', items: [
    { id: 'dashboard', labelKey: 'catalog', icon: LayoutGrid },
    { id: 'compare', labelKey: 'compare', icon: ArrowLeftRight },
    { id: 'leaderboard', labelKey: 'leaderboard', icon: Trophy },
  ] },
  { id: 'tools', label: '샌드박스 & 시뮬레이터', items: [
    { id: 'sandbox', labelKey: 'sandbox', icon: Braces },
    { id: 'tco', labelKey: 'tco', icon: Calculator },
    { id: 'speed', labelKey: 'speed', icon: Gauge },
    { id: 'gpus', labelKey: 'gpus', icon: Cpu },
  ] },
  { id: 'insights', label: 'AI 솔루션 & 리포트', items: [
    { id: 'advisor', labelKey: 'advisor', icon: Sparkles },
    { id: 'news', labelKey: 'news', icon: Newspaper },
    { id: 'tutorial', labelKey: 'tutorial', icon: BookOpen },
  ] },
] satisfies NavGroup[];
```

App의 전체 화면 loading/error 조기 반환을 제거하고 `AppShell` 내부에 스켈레톤 또는 오류 패널을 렌더링합니다. 콘텐츠 래퍼는 PC 일반 화면 1440px, 데이터 화면 전체 폭을 선택합니다. `Navbar.tsx`는 `rg "Navbar" frontend/src`로 미사용을 확인한 후 삭제합니다.

- [ ] **Step 4: 테스트·빌드 확인**

Run: `cd frontend && npm test -- src/navigation/navigationConfig.test.tsx src/App.test.tsx && npm run build`

Expected: tests PASS, build exit 0.

- [ ] **Step 5: 커밋**

```bash
git add frontend/src/navigation frontend/src/components/AppShell.tsx frontend/src/App.tsx frontend/src/components/SidebarNav.tsx frontend/src/components/HeaderTopBar.tsx
git add -u frontend/src/components/Navbar.tsx
git commit -m "refactor: unify responsive application navigation"
```

### Task 4: 접근 가능한 모바일 드로어와 하단 내비게이션

**Files:**
- Create: `frontend/src/components/MobileBottomNav.tsx`
- Create: `frontend/src/components/MobileBottomNav.test.tsx`
- Modify: `frontend/src/components/SidebarNav.tsx`
- Create: `frontend/src/components/SidebarNav.test.tsx`
- Modify: `frontend/src/components/AppShell.tsx`

**Interfaces:**
- Produces: `MobileBottomNav({ activeTab, onNavigate, compareCount })`
- Produces: 드로어 focus trap, ESC close, focus return, body scroll lock

- [ ] **Step 1: 모바일 동작 실패 테스트 작성**

```tsx
test('marks active mobile destination and navigates', async () => {
  const user = userEvent.setup();
  const onNavigate = vi.fn();
  render(<MobileBottomNav activeTab="dashboard" onNavigate={onNavigate} compareCount={2} />);
  expect(screen.getByRole('link', { name: /카탈로그/ })).toHaveAttribute('aria-current', 'page');
  await user.click(screen.getByRole('link', { name: /뉴스/ }));
  expect(onNavigate).toHaveBeenCalledWith('news');
});

test('escape closes drawer and returns focus to menu button', async () => {
  render(<AppShellTestHarness />);
  await userEvent.click(screen.getByRole('button', { name: '메뉴 열기' }));
  await userEvent.keyboard('{Escape}');
  expect(screen.queryByRole('dialog', { name: '전체 메뉴' })).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: '메뉴 열기' })).toHaveFocus();
});
```

- [ ] **Step 2: 실패 확인**

Run: `cd frontend && npm test -- src/components/MobileBottomNav.test.tsx src/components/SidebarNav.test.tsx`

Expected: 새 컴포넌트와 접근성 동작이 없어 FAIL.

- [ ] **Step 3: 모바일 내비게이션 최소 구현**

`MobileBottomNav`는 `MOBILE_PRIMARY_TABS`만 렌더링하고 `aria-current`, 44px 터치 영역, safe-area 패딩을 적용합니다. 드로어는 `role="dialog"`, `aria-modal="true"`, `aria-label="전체 메뉴"`를 사용합니다. 열릴 때 첫 메뉴로 초점을 이동하고 Tab 순환, ESC 닫기, 닫힌 후 트리거 초점 복귀, body overflow 복원을 구현합니다.

- [ ] **Step 4: 테스트·빌드 확인**

Run: `cd frontend && npm test -- src/components/MobileBottomNav.test.tsx src/components/SidebarNav.test.tsx && npm run build`

Expected: tests PASS, build exit 0.

- [ ] **Step 5: 커밋**

```bash
git add frontend/src/components/MobileBottomNav.tsx frontend/src/components/MobileBottomNav.test.tsx frontend/src/components/SidebarNav.tsx frontend/src/components/SidebarNav.test.tsx frontend/src/components/AppShell.tsx
git commit -m "feat: add accessible mobile dashboard navigation"
```

### Task 5: 모델 카탈로그 밀도와 모바일 필터

**Files:**
- Modify: `frontend/src/components/Dashboard.tsx`
- Create: `frontend/src/components/Dashboard.test.tsx`
- Create: `frontend/src/components/FilterSheet.tsx`
- Create: `frontend/src/components/FilterSheet.test.tsx`

**Interfaces:**
- Produces: `Density = 'compact' | 'comfortable'`
- Produces: `FilterSheet({ open, filters, onApply, onClear, onClose })`

- [ ] **Step 1: 밀도·필터·비교 CTA 실패 테스트 작성**

```tsx
test('mobile filters stay unapplied until apply is pressed', async () => {
  const onApply = vi.fn();
  render(<FilterSheet open filters={emptyFilters} onApply={onApply} onClear={vi.fn()} onClose={vi.fn()} />);
  await userEvent.selectOptions(screen.getByLabelText('프로바이더'), 'openai');
  expect(onApply).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole('button', { name: '필터 적용' }));
  expect(onApply).toHaveBeenCalledWith(expect.objectContaining({ provider: 'openai' }));
});
```

- [ ] **Step 2: 실패 확인**

Run: `cd frontend && npm test -- src/components/FilterSheet.test.tsx src/components/Dashboard.test.tsx`

Expected: FilterSheet과 density 상태가 없어 FAIL.

- [ ] **Step 3: 최소 반응형 카탈로그 구현**

PC 도구 모음에 밀도 전환을 추가하고 선택을 localStorage에 보존합니다. 모바일에서는 필터 버튼과 적용 필터 칩을 표시하며 필터는 하단 시트에서 임시 상태로 편집합니다. 모델 카드 기본 영역은 모델명·제공자·가격·컨텍스트·대표 점수·비교 선택으로 제한하고 상세 정보는 `<details>`로 제공합니다. 선택 모델이 있으면 모바일 하단 메뉴 위에 비교 CTA를 표시합니다.

- [ ] **Step 4: 테스트·빌드 확인**

Run: `cd frontend && npm test -- src/components/FilterSheet.test.tsx src/components/Dashboard.test.tsx && npm run build`

Expected: tests PASS, build exit 0.

- [ ] **Step 5: 커밋**

```bash
git add frontend/src/components/Dashboard.tsx frontend/src/components/Dashboard.test.tsx frontend/src/components/FilterSheet.tsx frontend/src/components/FilterSheet.test.tsx
git commit -m "feat: improve responsive model catalog controls"
```

### Task 6: 데이터 표의 PC 고정 열과 모바일 상세 펼침

**Files:**
- Create: `frontend/src/components/ResponsiveDataTable.tsx`
- Create: `frontend/src/components/ResponsiveDataTable.test.tsx`
- Modify: `frontend/src/components/CompareView.tsx`
- Modify: `frontend/src/components/LeaderboardView.tsx`
- Modify: `frontend/src/components/GPUListView.tsx`

**Interfaces:**
- Produces: generic `ResponsiveDataTable<T>` with columns `{ key, header, render, numeric, priority }`
- Produces: sticky header/identity column, scroll hint, expandable mobile row

- [ ] **Step 1: 의미 있는 표와 모바일 상세 테스트 작성**

```tsx
test('renders semantic headers and expandable secondary fields', async () => {
  render(<ResponsiveDataTable rows={rows} columns={columns} getRowId={row => row.id} />);
  expect(screen.getByRole('columnheader', { name: '모델' })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /상세 지표 보기/ }));
  expect(screen.getByText('SWE-bench')).toBeVisible();
});
```

- [ ] **Step 2: 실패 확인**

Run: `cd frontend && npm test -- src/components/ResponsiveDataTable.test.tsx`

Expected: 컴포넌트가 없어 FAIL.

- [ ] **Step 3: 공통 표와 세 화면 어댑터 구현**

우선순위 `primary` 열은 항상 표에 표시하고 `secondary` 열은 모바일 행 상세에도 반복합니다. 첫 열과 헤더에 sticky 스타일, 숫자 열에 `.numeric`과 우측 정렬, 스크롤 컨테이너에 접근 가능한 안내를 적용합니다. Compare·Leaderboard·GPU 화면은 데이터 변환만 담당하고 공통 표를 사용합니다.

- [ ] **Step 4: 테스트·빌드 확인**

Run: `cd frontend && npm test -- src/components/ResponsiveDataTable.test.tsx && npm run build`

Expected: PASS, build exit 0.

- [ ] **Step 5: 커밋**

```bash
git add frontend/src/components/ResponsiveDataTable.tsx frontend/src/components/ResponsiveDataTable.test.tsx frontend/src/components/CompareView.tsx frontend/src/components/LeaderboardView.tsx frontend/src/components/GPUListView.tsx
git commit -m "feat: add responsive analytical data tables"
```

### Task 7: 뉴스 목록·상세 읽기 경험

**Files:**
- Modify: `frontend/src/components/NewsPulseView.tsx`
- Modify: `frontend/src/components/NewsDetailView.tsx`
- Create: `frontend/src/components/NewsSources.tsx`
- Create: `frontend/src/components/NewsSources.test.tsx`

**Interfaces:**
- Produces: `NewsSources({ sources, fallbackUrl })`
- Produces: PC 720~800px reading column and mobile collapsible sources

- [ ] **Step 1: 다중 출처 접근성 테스트 작성**

```tsx
test('collapses multiple sources under a labelled disclosure', async () => {
  render(<NewsSources sources={[{ name: 'OpenAI', url: 'https://openai.com/a' }, { name: 'Anthropic', url: 'https://anthropic.com/b' }]} />);
  const trigger = screen.getByRole('button', { name: '원문 출처 2개 보기' });
  expect(screen.queryByRole('link', { name: /OpenAI/ })).not.toBeVisible();
  await userEvent.click(trigger);
  expect(screen.getByRole('link', { name: /OpenAI/ })).toHaveAttribute('href', 'https://openai.com/a');
});
```

- [ ] **Step 2: 실패 확인**

Run: `cd frontend && npm test -- src/components/NewsSources.test.tsx`

Expected: NewsSources가 없어 FAIL.

- [ ] **Step 3: 목록 계층과 상세 출처 구현**

목록은 대표 리포트와 최신 그리드를 분리하고 카드 기본 정보는 제목·TL;DR·출처 수·시각·주제로 정리합니다. 모바일은 한 열과 낮은 이미지 비율을 사용합니다. 상세 본문은 `max-w-[800px]` 읽기 열을 사용하고 승인 전 존재하던 사용자의 다중 원문 변경을 `git diff`로 확인해 `NewsSources`에 보존·통합합니다.

- [ ] **Step 4: 테스트·빌드 확인**

Run: `cd frontend && npm test -- src/components/NewsSources.test.tsx && npm run build`

Expected: PASS, build exit 0.

- [ ] **Step 5: 커밋**

```bash
git add frontend/src/components/NewsPulseView.tsx frontend/src/components/NewsDetailView.tsx frontend/src/components/NewsSources.tsx frontend/src/components/NewsSources.test.tsx
git commit -m "feat: improve responsive trend report reading"
```

### Task 8: 분석 폼의 입력·결과 반응형 패턴

**Files:**
- Create: `frontend/src/components/AnalysisWorkspace.tsx`
- Create: `frontend/src/components/AnalysisWorkspace.test.tsx`
- Modify: `frontend/src/components/TCOSimulatorView.tsx`
- Modify: `frontend/src/components/ArchitectureAdvisor.tsx`
- Modify: `frontend/src/components/TokenizerSandboxView.tsx`

**Interfaces:**
- Produces: `AnalysisWorkspace({ input, summary, details, action, busy })`
- Produces: PC two-column/sticky summary, mobile sections/sticky action

- [ ] **Step 1: 상태 유지와 중복 실행 방지 테스트 작성**

```tsx
test('keeps entered values when result details toggle and disables busy action', async () => {
  render(<AnalysisWorkspaceHarness busy />);
  const input = screen.getByLabelText('월간 입력 토큰');
  await userEvent.clear(input);
  await userEvent.type(input, '500');
  await userEvent.click(screen.getByRole('button', { name: '계산 근거 펼치기' }));
  expect(input).toHaveValue(500);
  expect(screen.getByRole('button', { name: '계산 중' })).toBeDisabled();
});
```

- [ ] **Step 2: 실패 확인**

Run: `cd frontend && npm test -- src/components/AnalysisWorkspace.test.tsx`

Expected: 공통 workspace가 없어 FAIL.

- [ ] **Step 3: 공통 workspace와 화면별 적용**

PC는 `lg:grid-cols-2` 입력·결과 구조와 sticky 요약을 사용합니다. 모바일은 입력 섹션을 `<fieldset>` 또는 `<details>`로 나누고 실행 버튼을 하단 내비게이션 위에 고정합니다. 결과는 결론·비용 차이를 먼저 표시하며 계산 근거와 차트는 펼침 영역으로 이동합니다. 각 화면의 기존 상태는 부모 화면에 유지합니다.

- [ ] **Step 4: 테스트·빌드 확인**

Run: `cd frontend && npm test -- src/components/AnalysisWorkspace.test.tsx && npm run build`

Expected: PASS, build exit 0.

- [ ] **Step 5: 커밋**

```bash
git add frontend/src/components/AnalysisWorkspace.tsx frontend/src/components/AnalysisWorkspace.test.tsx frontend/src/components/TCOSimulatorView.tsx frontend/src/components/ArchitectureAdvisor.tsx frontend/src/components/TokenizerSandboxView.tsx
git commit -m "feat: unify responsive analysis workspaces"
```

### Task 9: 화면 지연 로딩과 Mermaid 번들 분리

**Files:**
- Modify: `frontend/src/App.tsx`
- Modify: `frontend/src/components/MermaidRenderer.tsx`
- Modify: `frontend/vite.config.ts`
- Create: `frontend/src/lazy-loading.test.tsx`

**Interfaces:**
- Produces: `React.lazy` route-view imports
- Produces: Mermaid dynamic import only while renderer is mounted

- [ ] **Step 1: 정적 Mermaid import 방지 테스트 작성**

```ts
test('does not statically import mermaid in the renderer', () => {
  const source = fs.readFileSync(path.resolve('src/components/MermaidRenderer.tsx'), 'utf8');
  expect(source).not.toMatch(/^import mermaid/m);
  expect(source).toContain("import('mermaid')");
});
```

- [ ] **Step 2: 실패 확인**

Run: `cd frontend && npm test -- src/lazy-loading.test.tsx`

Expected: 현재 정적 import 때문에 FAIL.

- [ ] **Step 3: 화면과 Mermaid 지연 로딩 구현**

App의 각 화면 import를 다음 형식으로 교체하고 콘텐츠 영역에 구조형 Suspense fallback을 둡니다.

```tsx
const Dashboard = lazy(() => import('./components/Dashboard').then(module => ({ default: module.Dashboard })));
const CompareView = lazy(() => import('./components/CompareView').then(module => ({ default: module.CompareView })));
const TCOSimulatorView = lazy(() => import('./components/TCOSimulatorView').then(module => ({ default: module.TCOSimulatorView })));
const ArchitectureAdvisor = lazy(() => import('./components/ArchitectureAdvisor').then(module => ({ default: module.ArchitectureAdvisor })));
const TutorialView = lazy(() => import('./components/TutorialView').then(module => ({ default: module.TutorialView })));
const LeaderboardView = lazy(() => import('./components/LeaderboardView').then(module => ({ default: module.LeaderboardView })));
const GPUListView = lazy(() => import('./components/GPUListView').then(module => ({ default: module.GPUListView })));
const NewsPulseView = lazy(() => import('./components/NewsPulseView'));
const TokenizerSandboxView = lazy(() => import('./components/TokenizerSandboxView').then(module => ({ default: module.TokenizerSandboxView })));
const SpeedMonitorView = lazy(() => import('./components/SpeedMonitorView').then(module => ({ default: module.SpeedMonitorView })));
```

MermaidRenderer는 effect 안에서 `const { default: mermaid } = await import('mermaid')`를 사용하며 unmount 후 DOM 갱신을 방지합니다.

- [ ] **Step 4: 테스트와 번들 확인**

Run: `cd frontend && npm test -- src/lazy-loading.test.tsx && npm run build`

Expected: PASS. 빌드 결과에 화면별 chunk와 별도 Mermaid chunk가 존재하고 main index JS가 기존 약 939KB보다 작음.

- [ ] **Step 5: 커밋**

```bash
git add frontend/src/App.tsx frontend/src/components/MermaidRenderer.tsx frontend/vite.config.ts frontend/src/lazy-loading.test.tsx
git commit -m "perf: lazy load dashboard views and Mermaid"
```

### Task 10: E2E·접근성·반응형 회귀 게이트

**Files:**
- Modify: `frontend/e2e/smoke.spec.ts`
- Create: `frontend/e2e/accessibility.spec.ts`
- Create: `frontend/e2e/responsive.spec.ts`
- Modify: `.github/workflows/cloudflare-pages.yml`

**Interfaces:**
- Consumes: 안정된 AppShell, 주요 화면, Playwright projects
- Produces: 배포 전 build/lint/unit/E2E/axe 품질 게이트

- [ ] **Step 1: 핵심 흐름과 접근성 E2E 작성**

```ts
test('model search to comparison works', async ({ page }) => {
  await page.goto('/?tab=dashboard');
  await page.getByRole('searchbox').fill('GPT');
  await page.getByRole('button', { name: /비교에 추가/ }).first().click();
  await page.getByRole('link', { name: /비교/ }).click();
  await expect(page).toHaveURL(/tab=compare/);
});

test('dashboard has no serious accessibility violations', async ({ page }) => {
  await page.goto('/?tab=dashboard');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter(v => ['serious', 'critical'].includes(v.impact ?? ''))).toEqual([]);
});
```

반응형 테스트는 360×800, 390×844, 430×932, 768×1024, 1024×768, 1280×800, 1440×900, 1920×1080에서 `document.documentElement.scrollWidth <= clientWidth`와 하단 메뉴가 마지막 콘텐츠를 가리지 않는지 검증합니다.

- [ ] **Step 2: 현재 회귀 항목에서 실패 확인**

Run: `cd frontend && npm run test:e2e`

Expected: 접근성 또는 새 role/흐름 요구사항 중 하나 이상이 FAIL.

- [ ] **Step 3: 발견된 위반을 가장 가까운 컴포넌트에서 수정하고 CI 게이트 추가**

Workflow 빌드 앞에 다음 단계를 둡니다.

```yaml
- name: 🧪 Unit and component tests
  run: cd frontend && npm test
- name: 🔍 Lint
  run: cd frontend && npm run lint
- name: 🎭 Install Playwright Chromium
  run: cd frontend && npx playwright install --with-deps chromium
- name: 🧭 Responsive and accessibility E2E
  run: cd frontend && npm run test:e2e
```

- [ ] **Step 4: 전체 최종 검증**

Run: `cd frontend && npm test && npm run lint && npm run build && npm run test:e2e`

Expected: 모든 명령 exit 0, serious/critical axe 위반 0개, 대상 viewport의 페이지 전체 가로 오버플로 0개.

Run: `git diff --check`

Expected: 출력 없음.

- [ ] **Step 5: 커밋**

```bash
git add frontend/e2e .github/workflows/cloudflare-pages.yml
git commit -m "ci: verify responsive dashboard UX"
```
