import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test, vi } from 'vitest';

import { LanguageProvider } from '../context/LanguageContext';
import { Dashboard } from './Dashboard';

vi.mock('../api', () => ({ fetchModels: vi.fn().mockResolvedValue([]), fetchProviders: vi.fn().mockResolvedValue([]) }));

beforeEach(() => {
  localStorage.clear();
  // 라벨이 언어에 따라 달라진다. jsdom 의 navigator.language 에 기대면 en 으로 떨어지므로
  // 검사할 언어를 명시한다.
  localStorage.setItem('llm_compass_lang', 'ko');
});

test('persists the selected catalog density', async () => {
  render(<LanguageProvider><Dashboard /></LanguageProvider>);
  await waitFor(() => expect(screen.getByRole('button', { name: '컴팩트 밀도' })).toBeInTheDocument());
  await userEvent.click(screen.getByRole('button', { name: '컴팩트 밀도' }));
  expect(localStorage.getItem('catalog-density')).toBe('compact');
});
