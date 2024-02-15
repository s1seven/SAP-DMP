export function strToBool(val?: string | boolean): boolean {
  return val &&
    ((typeof val === 'string' && val.trim() === 'true') || val === true)
    ? true
    : false;
}
