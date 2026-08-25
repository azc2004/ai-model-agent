import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from 'vitest';

test('does not statically import Mermaid in the renderer', () => {
  const source = fs.readFileSync(path.resolve('src/components/MermaidRenderer.tsx'), 'utf8');
  expect(source).not.toMatch(/^import mermaid/m);
  expect(source).toContain("import('mermaid')");
});
