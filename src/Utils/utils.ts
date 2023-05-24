export function getMonday(inputDate: Date) {
  const dateCopy = new Date(inputDate);
  const date = dateCopy.getDate();
  const day = dateCopy.getDay();

  switch (day) {
    case 0: // 일요일
      dateCopy.setDate(date - 6);
      break;
    case 1: // 월요일
      break;
    case 2: // 화요일
      dateCopy.setDate(date - 1);
      break;
    case 3: // 수요일
      dateCopy.setDate(date - 2);
      break;
    case 4: // 목요일
      dateCopy.setDate(date - 3);
      break;
    case 5: // 금요일
      dateCopy.setDate(date - 4);
      break;
    case 6: // 토요일
      dateCopy.setDate(date - 5);
      break;
  }

  return dateCopy;
}

export function getDatesOfWeek(inputMonday: Date) {
  const dateCopy = new Date(inputMonday);
  console.log("inputMonday", dateCopy);

  let result = [];

  for (let i = 0; i < 7; i++) {
    result.push(getLocalTimeString(dateCopy));
    dateCopy.setDate(dateCopy.getDate() + 1);
  }

  return result;
}

export function getPeriodString(datesOfWeek: string[]) {
  const startDate = datesOfWeek[0];
  const endDate = datesOfWeek[6];

  const startMonth = startDate.split("-")[1].replace(/(^0+)/, "");
  const startDay = startDate.split("-")[2].replace(/(^0+)/, "");

  const endMonth = endDate.split("-")[1].replace(/(^0+)/, "");
  const endDay = endDate.split("-")[2].replace(/(^0+)/, "");

  return startMonth + "." + startDay + " ~ " + endMonth + "." + endDay;
}

export function getDateString(date: string) {
  const month = date.split("-")[1].replace(/(^0+)/, "");
  const day = date.split("-")[2].replace(/(^0+)/, "");

  return month + "." + day;
}

export function getLocalTimeString(inputDate: Date) {
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const date = inputDate.getDate();

  return (
    year +
    "-" +
    (month < 9 ? "0" + month : month) +
    "-" +
    (date < 9 ? "0" + date : date)
  );
}
