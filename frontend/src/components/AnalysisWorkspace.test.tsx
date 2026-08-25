import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { expect, test } from 'vitest';

import { AnalysisWorkspace } from './AnalysisWorkspace';

const Harness = ({ busy }: { busy: boolean }) => {
  const [value, setValue] = useState(100);
  return <AnalysisWorkspace
    input={<label>월간 입력 토큰<input type="number" value={value} onChange={(event) => setValue(Number(event.target.value))} /></label>}
    summary={<strong>월 예상 비용</strong>}
    details={<p>계산 공식</p>}
    action={{ label: '계산', busyLabel: '계산 중', onClick: () => undefined }}
    busy={busy}
  />;
};

test('keeps entered values when details toggle and disables busy action', async () => {
  render(<Harness busy />);
  const input = screen.getByLabelText('월간 입력 토큰');
  await userEvent.clear(input); await userEvent.type(input, '500');
  await userEvent.click(screen.getByRole('button', { name: '계산 근거 펼치기' }));
  expect(input).toHaveValue(500);
  expect(screen.getByRole('button', { name: '계산 중' })).toBeDisabled();
});
