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

// ex) ['2023-05-29', ..., '2023-06-04']
export function getDatesOfWeek(inputMonday: Date) {
  const dateCopy = new Date(inputMonday);

  let result = [];

  for (let i = 0; i < 7; i++) {
    result.push(getLocalTimeString(dateCopy));
    dateCopy.setDate(dateCopy.getDate() + 1);
  }

  return result;
}

// ex) 2023-05-31
export function getLocalTimeString(inputDate: Date) {
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
export function getPeriodString(datesOfWeek: string[]) {
  const startDate = datesOfWeek[0];
  const endDate = datesOfWeek[6];

  const startMonth = startDate.split("-")[1].replace(/(^0+)/, "");
  const startDay = startDate.split("-")[2].replace(/(^0+)/, "");

  const endMonth = endDate.split("-")[1].replace(/(^0+)/, "");
  const endDay = endDate.split("-")[2].replace(/(^0+)/, "");

  return startMonth + "." + startDay + " ~ " + endMonth + "." + endDay;
}

// ex) 5.31
export function getDateString(date: string) {
  const month = date.split("-")[1].replace(/(^0+)/, "");
  const day = date.split("-")[2].replace(/(^0+)/, "");

  return month + "." + day;
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
