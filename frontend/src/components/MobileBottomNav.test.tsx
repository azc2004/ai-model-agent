import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import { LanguageProvider } from '../context/LanguageContext';
import { MobileBottomNav } from './MobileBottomNav';

test('marks the active destination and navigates', async () => {
  const onNavigate = vi.fn();
  render(<LanguageProvider><MobileBottomNav activeTab="dashboard" onNavigate={onNavigate} compareCount={2} /></LanguageProvider>);

  expect(screen.getByRole('link', { name: /Model Catalog|카탈로그/ })).toHaveAttribute('aria-current', 'page');
  await userEvent.click(screen.getByRole('link', { name: /News|뉴스/ }));
  expect(onNavigate).toHaveBeenCalledWith('news');
});
