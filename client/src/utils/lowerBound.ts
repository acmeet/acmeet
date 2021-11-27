// gets the index `i` in A such that A[i] <= x < A[i+1]
export const lowerBound = <T>(
  A: T[],
  x: T,
  l = 0,
  h = A.length,
): number => {
  if (l < 0) { throw new Error('lo must be non-negative'); }

  while (l < h) {
    const m = Math.floor((l + h) / 2);
    if (x < A[m]) { h = m; }
    else { l = m + 1; }
  }

  return Math.max(0, l-1);
}