export const normalizeDate = (value: unknown) => {
  const numValue = Number(value);

  return !isNaN(numValue) && numValue > 0 ? numValue : value;
};

const formater = new Intl.DateTimeFormat('en-US', {
  weekday: 'short',
  month: 'short',
  day: '2-digit',
  year: 'numeric',
  timeZone: 'UTC',
});

export const formatDate = (value: unknown) => {
  if (!value) return '';

  return formater.format(new Date(Number(value)));
};
