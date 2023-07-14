export function getMondayObj(inputDate: Date) {
  const dateObj = new Date(inputDate);
  const currentDate = dateObj.getDate();
  const currentDay = dateObj.getDay();

  switch (currentDay) {
    case 0: // 일요일
      dateObj.setDate(currentDate - 6);
      break;
    case 1: // 월요일
      break;
    case 2: // 화요일
      dateObj.setDate(currentDate - 1);
      break;
    case 3: // 수요일
      dateObj.setDate(currentDate - 2);
      break;
    case 4: // 목요일
      dateObj.setDate(currentDate - 3);
      break;
    case 5: // 금요일
      dateObj.setDate(currentDate - 4);
      break;
    case 6: // 토요일
      dateObj.setDate(currentDate - 5);
      break;
  }

  return dateObj;
}

// ['2023-05-29', ..., '2023-06-04']
export function getDatesFormatOfWeek(inputDate: Date) {
  const dateObj = getMondayObj(inputDate);

  let datesFormatOfWeek = [];

  for (let i = 0; i < 7; i++) {
    datesFormatOfWeek.push(getDateFormat(dateObj));
    dateObj.setDate(dateObj.getDate() + 1);
  }

  return datesFormatOfWeek;
}

// 2023-05-31
export function getDateFormat(inputDate: Date) {
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth() + 1;
  const date = inputDate.getDate();

  return (
    year +
    "-" +
    (month < 10 ? "0" + month : month) +
    "-" +
    (date < 10 ? "0" + date : date)
  );
}

// ex) 5.29 ~ 6.4
export function getPeriodString(datesFormatOfWeek: string[]) {
  const startDate = datesFormatOfWeek[0];
  const endDate = datesFormatOfWeek[6];

  const startMonth = startDate.split("-")[1].replace(/(^0+)/, "");
  const startDay = startDate.split("-")[2].replace(/(^0+)/, "");

  const endMonth = endDate.split("-")[1].replace(/(^0+)/, "");
  const endDay = endDate.split("-")[2].replace(/(^0+)/, "");

  return startMonth + "." + startDay + " ~ " + endMonth + "." + endDay;
}

// ex) 5/31
export function getDateString(inputDate: string) {
  const month = inputDate.split("-")[1].replace(/(^0+)/, "");
  const day = inputDate.split("-")[2].replace(/(^0+)/, "");

  return month + "/" + day;
}

export interface I_DAY_COLORS {
  [key: string]: string;
}

// 요일별 색상
export const DAY_COLORS: I_DAY_COLORS = {
  0: "#E61A73",
  1: "#EDAE13",
  2: "#0BBAB3",
  3: "#0764A1",
  4: "#25A2DA",
  5: "#8146C4",
  6: "#E97EC2",
};

// 요일 텍스트 및 색상
export function getDayInfo(index: number) {
  switch (index) {
    case 0:
      return { day: "월요일", color: DAY_COLORS[0] };
    case 1:
      return { day: "화요일", color: DAY_COLORS[1] };
    case 2:
      return { day: "수요일", color: DAY_COLORS[2] };
    case 3:
      return { day: "목요일", color: DAY_COLORS[3] };
    case 4:
      return { day: "금요일", color: DAY_COLORS[4] };
    case 5:
      return { day: "토요일", color: DAY_COLORS[5] };
    case 6:
      return { day: "일요일", color: DAY_COLORS[6] };
    default:
      return { day: "언젠가", color: "#000000" };
  }
}
