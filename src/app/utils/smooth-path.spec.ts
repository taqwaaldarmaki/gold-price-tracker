import { smoothPath } from './smooth-path';

describe('smoothPath', () => {
  it('returns an empty path for no points', () => {
    expect(smoothPath([])).toBe('');
  });

  it('starts at the first point and ends at the last point', () => {
    const path = smoothPath([
      { x: 0, y: 10 },
      { x: 10, y: 20 },
      { x: 20, y: 5 },
    ]);
    expect(path.startsWith('M 0 10')).toBe(true);
    expect(path.endsWith('20 5')).toBe(true);
    expect(path.match(/C/g)?.length).toBe(2);
  });
});
