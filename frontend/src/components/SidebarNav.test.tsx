import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { expect, test, vi } from 'vitest';

import { LanguageProvider } from '../context/LanguageContext';
import { SidebarNav } from './SidebarNav';

const Harness = () => {
  const [open, setOpen] = useState(false);
  return <LanguageProvider>
    <button onClick={() => setOpen(true)}>메뉴 열기</button>
    <SidebarNav activeTab="dashboard" setActiveTab={vi.fn()} compareCount={0} isCollapsed={false} setIsCollapsed={vi.fn()} mobileOpen={open} setMobileOpen={setOpen} />
  </LanguageProvider>;
};

test('escape closes drawer and returns focus to menu button', async () => {
  render(<Harness />);
  const trigger = screen.getByRole('button', { name: '메뉴 열기' });

  await userEvent.click(trigger);
  expect(screen.getByRole('dialog', { name: '전체 메뉴' })).toBeInTheDocument();
  await userEvent.keyboard('{Escape}');

  expect(screen.queryByRole('dialog', { name: '전체 메뉴' })).not.toBeInTheDocument();
  expect(trigger).toHaveFocus();
});
