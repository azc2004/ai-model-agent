import { render, screen } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';

import { App, matchesCatalog } from './App';


beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(() => new Promise(() => undefined)));
});

test('renders the application shell while data loads', () => {
  render(<App />);

  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByRole('navigation', { name: /^주요 메뉴$/i })).toBeInTheDocument();
});

// 검색어 원문이 서버로 새는 걸 막는 게이트 — 자유 입력이라 PII 가 섞일 수 있다.
const MODELS = [{ name: 'Claude Opus 4.5', provider_name: 'Anthropic' }] as never;
const PROVIDERS = [{ name: 'OpenAI' }] as never;

test('카탈로그에 걸리는 검색어만 라벨로 내보낸다', () => {
  expect(matchesCatalog('claude', MODELS, PROVIDERS)).toBe(true);
  expect(matchesCatalog('anthropic', MODELS, PROVIDERS)).toBe(true);
  expect(matchesCatalog('openai', MODELS, PROVIDERS)).toBe(true);
});

test('카탈로그에 없는 자유 입력은 내보내지 않는다', () => {
  expect(matchesCatalog('azc2004@gmail.com', MODELS, PROVIDERS)).toBe(false);
  expect(matchesCatalog('010-1234-5678', MODELS, PROVIDERS)).toBe(false);
  expect(matchesCatalog('c', MODELS, PROVIDERS)).toBe(false); // 1글자는 아무거나 걸린다
});
