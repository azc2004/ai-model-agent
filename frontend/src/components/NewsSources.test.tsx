import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';

import { NewsSources } from './NewsSources';

test('collapses multiple sources under a labelled disclosure', async () => {
  render(<NewsSources sources={[{ name: 'OpenAI', url: 'https://openai.com/a' }, { name: 'Anthropic', url: 'https://anthropic.com/b' }]} />);
  const trigger = screen.getByRole('button', { name: '원문 출처 2개 보기' });
  expect(screen.queryByRole('link', { name: /OpenAI/ })).not.toBeInTheDocument();
  await userEvent.click(trigger);
  expect(screen.getByRole('link', { name: /OpenAI/ })).toHaveAttribute('href', 'https://openai.com/a');
});
