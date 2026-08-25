import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test, vi } from 'vitest';

import { EMPTY_CATALOG_FILTERS, FilterSheet } from './FilterSheet';

test('mobile filters stay unapplied until apply is pressed', async () => {
  const onApply = vi.fn();
  render(<FilterSheet open filters={EMPTY_CATALOG_FILTERS} providers={[{ id: 'openai', name: 'OpenAI' }]} onApply={onApply} onClear={vi.fn()} onClose={vi.fn()} />);

  await userEvent.selectOptions(screen.getByLabelText('프로바이더'), 'openai');
  expect(onApply).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole('button', { name: '필터 적용' }));
  expect(onApply).toHaveBeenCalledWith(expect.objectContaining({ provider: 'openai' }));
});
