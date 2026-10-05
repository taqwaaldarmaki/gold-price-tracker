export interface Point {
  x: number;
  y: number;
}

const round = (value: number) => Math.round(value * 100) / 100;

/**
 * Builds a smooth SVG path (monotone cubic interpolation) through the points.
 * The curve never overshoots the data, so highs and lows stay where they are.
 */
export function smoothPath(points: readonly Point[]): string {
  const count = points.length;
  if (count === 0) return '';
  if (count === 1) return `M ${round(points[0].x)} ${round(points[0].y)}`;

  const widths: number[] = [];
  const slopes: number[] = [];
  for (let i = 0; i < count - 1; i++) {
    widths[i] = points[i + 1].x - points[i].x;
    slopes[i] = (points[i + 1].y - points[i].y) / widths[i];
  }

  const tangents: number[] = new Array(count);
  for (let i = 1; i < count - 1; i++) {
    const weighted = (slopes[i - 1] * widths[i] + slopes[i] * widths[i - 1]) / (widths[i - 1] + widths[i]);
    tangents[i] =
      (Math.sign(slopes[i - 1]) + Math.sign(slopes[i])) *
        Math.min(Math.abs(slopes[i - 1]), Math.abs(slopes[i]), 0.5 * Math.abs(weighted)) || 0;
  }

  if (count === 2) {
    tangents[0] = tangents[1] = slopes[0];
  } else {
    tangents[0] = (3 * slopes[0] - tangents[1]) / 2;
    tangents[count - 1] = (3 * slopes[count - 2] - tangents[count - 2]) / 2;
  }

  let path = `M ${round(points[0].x)} ${round(points[0].y)}`;
  for (let i = 0; i < count - 1; i++) {
    const third = widths[i] / 3;
    const from = points[i];
    const to = points[i + 1];
    path +=
      ` C ${round(from.x + third)} ${round(from.y + third * tangents[i])},` +
      ` ${round(to.x - third)} ${round(to.y - third * tangents[i + 1])},` +
      ` ${round(to.x)} ${round(to.y)}`;
  }
  return path;
}
