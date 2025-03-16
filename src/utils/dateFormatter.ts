export const getStringedDate = (targetDate: Date) => {
  let year: string | number = targetDate.getFullYear();
  let month: string | number = targetDate.getMonth() + 1;
  let date: string | number = targetDate.getDate();

  if (month < 10) {
    month = `0${month}`;
  }

  if (date < 10) {
    date = `0${date}`;
  }

  return `${year}-${month}-${date}`;
};
