

export const removePropFromObj = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: { [key: string]: any },
  prop: string
) => {
    obj[prop] ? delete obj[prop]:null;
  return obj;
};
