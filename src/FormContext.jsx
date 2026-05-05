import { createContext, useContext } from 'react';
export const FormContext = createContext();
export const useForm = () => useContext(FormContext);
export function setDeep(obj, path, value) {
  const parts = path.split('.');
  let ref = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!ref[parts[i]] || typeof ref[parts[i]] !== 'object') ref[parts[i]] = {};
    ref = ref[parts[i]];
  }
  ref[parts[parts.length - 1]] = value;
}
export function getDeep(obj, path) {
  return path.split('.').reduce((a, k) => (a && a[k] !== undefined ? a[k] : undefined), obj);
}
