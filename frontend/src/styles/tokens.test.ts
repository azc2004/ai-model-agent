import { afterEach, expect, test } from 'vitest';

import './tokens.css';

afterEach(() => {
  document.body.replaceChildren();
});

test('exposes semantic surface and accent tokens', () => {
  const rootStyle = getComputedStyle(document.documentElement);

  expect(rootStyle.getPropertyValue('--surface-1').trim()).toBe('#f8fafc');
  expect(rootStyle.getPropertyValue('--accent').trim()).toBe('#4f46e5');
});

test('touch targets have a 44 pixel minimum size', () => {
  const button = document.createElement('button');
  button.className = 'touch-target';
  document.body.append(button);

  const style = getComputedStyle(button);

  expect(style.minWidth).toBe('44px');
  expect(style.minHeight).toBe('44px');
});
