import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test, vi } from 'vitest';

import { LanguageProvider } from '../context/LanguageContext';
import { Dashboard } from './Dashboard';

vi.mock('../api', () => ({ fetchModels: vi.fn().mockResolvedValue([]), fetchProviders: vi.fn().mockResolvedValue([]) }));

beforeEach(() => localStorage.clear());

test('persists the selected catalog density', async () => {
  render(<LanguageProvider><Dashboard /></LanguageProvider>);
  await waitFor(() => expect(screen.getByRole('button', { name: '컴팩트 밀도' })).toBeInTheDocument());
  await userEvent.click(screen.getByRole('button', { name: '컴팩트 밀도' }));
  expect(localStorage.getItem('catalog-density')).toBe('compact');
});
