export const arrayShallowEquals = <T>(a: T[] | undefined, b: T[] | undefined) => {
  if (a === b) { return true; }
  if (a === undefined || b === undefined) { return false; }
  if (a.length !== b.length) { return false; }
  for (let i=0; i < a.length; ++i) {
    if (a[i] !== b[i]) { return false; }
  }
  return true;
}