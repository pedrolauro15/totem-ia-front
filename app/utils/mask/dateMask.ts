export const dateMask = (date: string) => {
  return String(date)
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d{1,2})/, '$1/$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};
