// basic classname combiner

type arg = string | Record<string, boolean> | any;

const ser = (a: arg): string => {
  let v, r = '';
  if (typeof a === 'string' || typeof a === 'number') {
    r += a;
  } else if (typeof a === 'object') {
    for (v in a) {
      if (a[v]) {
        if (r) { r = `${r} ${v}`; }
        else { r = `${r}${v}` }
      }
    }
  }
  return r;
};

export const c = (...args: arg[]): string => {
  let s, r = '';
  for (const a of args) {
    s = ser(a);
    if (!!s.length) {
      if (r) { r = `${r} ${s}`; }
      else { r = `${r}${s}` }
    }
  }
  return r;
}