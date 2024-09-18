import moment from 'moment';

export const getDate = () => {
  let date = moment().tz('America/El_Salvador');
  date.format('YYYY-MM-DD');
  return {
    date
  };
};

export const getTime = () => {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}:${seconds}`;
  return {
    currentTime
  };
};
