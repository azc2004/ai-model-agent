import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';

import { LanguageProvider } from '../context/LanguageContext';
import { ResponsiveDataTable } from './ResponsiveDataTable';

test('renders semantic headers and expandable secondary fields', async () => {
  const rows = [{ id: 'gpt', model: 'GPT', score: 72 }];
  const columns = [
    { key: 'model', header: '모델', render: (row: typeof rows[number]) => row.model, priority: 'primary' as const },
    { key: 'score', header: 'SWE-bench', render: (row: typeof rows[number]) => row.score, numeric: true, priority: 'secondary' as const },
  ];
  render(
    <LanguageProvider>
      <ResponsiveDataTable rows={rows} columns={columns} getRowId={(row) => row.id} />
    </LanguageProvider>
  );

  expect(screen.getByRole('columnheader', { name: '모델' })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /상세 지표 보기/ }));
  expect(screen.getAllByText('SWE-bench').at(-1)).toBeVisible();
});
