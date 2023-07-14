import { useRef } from "react";
import styled from "styled-components";
import { getPeriodString, I_DAY_COLORS, DAY_COLORS } from "../../utils/utils";
import Icon from "../common/Icon/Icon";

interface HeaderProps {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  datesFormatOfWeek: string[];
}

function Header({ setCurrentDate, datesFormatOfWeek }: HeaderProps) {
  const periodString = getPeriodString(datesFormatOfWeek);

  const resetDate = () => {
    setCurrentDate(new Date());
  };

  const onPrevWeekClick = () => {
    setCurrentDate((currentDate) => {
      const dateObj = new Date(currentDate);
      dateObj.setDate(dateObj.getDate() - 7);
      return dateObj;
    });
  };

  const onNextWeekClick = () => {
    setCurrentDate((currentDate) => {
      const dateObj = new Date(currentDate);
      dateObj.setDate(dateObj.getDate() + 7);
      return dateObj;
    });
  };

  const calendarRef = useRef<HTMLInputElement>(null);

  const onCalendarClick = () => {
    calendarRef?.current?.showPicker();
  };

  const onCalendarDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setCurrentDate(new Date(e.target.value));
    } else {
      setCurrentDate(new Date());
    }
  };

  return (
    <Wrapper>
      <Title
        onClick={resetDate}
        title="현재 날짜로 이동합니다."
        colors={DAY_COLORS}
      >
        {"MON TO SUN ".split("").map((char, index) => (
          <span key={index}>{char}</span>
        ))}
        <span>planner</span>
      </Title>
      <Row>
        <Period>{periodString}</Period>
        <Controls>
          <Icons>
            <Icon
              icon="fa fa-chevron-left"
              size="lg"
              isHover
              onClick={onPrevWeekClick}
            />
            <Icon
              icon="fa fa-calendar-check"
              size="lg"
              isHover
              onClick={onCalendarClick}
            />
            <Icon
              icon="fa fa-chevron-right"
              size="lg"
              isHover
              onClick={onNextWeekClick}
            />
          </Icons>
          <Calendar>
            <input
              type="date"
              id="calendar"
              ref={calendarRef}
              onChange={onCalendarDateChange}
            />
          </Calendar>
        </Controls>
      </Row>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  background-color: ${(props) => props.theme.bgColor};

  @media (max-width: 640px) {
    position: sticky;
    top: 0;
    z-index: 999;
    margin-bottom: 30px;
    padding: 15px 15px 15px 20px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  @media (max-width: 320px) {
    padding: 15px 5px 15px 15px;
  }
`;

const Title = styled.h1<{ colors: I_DAY_COLORS }>`
  width: fit-content;
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 18px;
  font-style: italic;
  font-weight: bold;
  margin-bottom: 5px;
  user-select: none;
  cursor: pointer;

  @media (max-width: 640px) {
    font-size: 12px;
  }

  span:nth-child(1) {
    color: ${(props) => props.colors[0]};
  }

  span:nth-child(2) {
    color: ${(props) => props.colors[1]};
  }

  span:nth-child(3) {
    color: ${(props) => props.colors[2]};
  }

  span:nth-child(5) {
    color: ${(props) => props.colors[3]};
  }

  span:nth-child(6) {
    color: ${(props) => props.colors[4]};
  }

  span:nth-child(8) {
    color: ${(props) => props.colors[5]};
  }

  span:nth-child(9) {
    color: ${(props) => props.colors[6]};
  }

  span:last-child {
    font-weight: normal;
    color: ${(props) => props.theme.iconHoverColor};
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Period = styled.h2`
  font-family: "Montserrat Alternates", sans-serif;
  font-size: 48px;
  font-weight: 800;
  line-height: 48px;

  &::selection {
    background-color: ${(props) => props.theme.textColor};
    color: white;
  }

  @media (max-width: 640px) {
    font-size: 24px;
    line-height: 24px;
  }

  @media (max-width: 320px) {
    font-size: 20px;
    line-height: 20px;
  }
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  column-gap: 40px;

  @media (max-width: 640px) {
    column-gap: 20px;
  }
`;

const Calendar = styled.div`
  visibility: hidden;
  height: 0;
  input {
    width: 100%;
    height: 0;
    border: 0;
    padding: 0;
  }
`;
