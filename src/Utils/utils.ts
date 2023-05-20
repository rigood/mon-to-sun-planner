export function getMonday(date: Date) {
  const dayNumber = date.getDay();
  const day = date.getDate();

  switch (dayNumber) {
    case 0: // 일요일
      return new Date(date.setDate(day - 6));
    case 1: // 월요일
      return date;
    case 2: // 화요일
      return new Date(date.setDate(day - 1));
    case 3: // 수요일
      return new Date(date.setDate(day - 2));
    case 4: // 목요일
      return new Date(date.setDate(day - 3));
    case 5: // 금요일
      return new Date(date.setDate(day - 4));
    case 6: // 토요일
      return new Date(date.setDate(day - 5));
  }
}

export function getDatesOfWeek(date: Date) {
  let result = [];
  let currentDate = getMonday(date)!;

  for (let i = 0; i < 7; i++) {
    result.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  currentDate.setDate(currentDate.getDate() - 7);

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
