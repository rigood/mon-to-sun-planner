import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { datesState } from "../store/datesState";
import { getDatesFormatOfWeek, getDateFormat } from "../utils/utils";
import Header from "../components/Header/Header";
import Day from "../components/Day/Day";

function Main() {
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const datesFormatOfWeek = getDatesFormatOfWeek(currentDate);

  const setDates = useSetRecoilState(datesState);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    // 같은 날짜 내에서 드래그앤드롭
    if (source.droppableId === destination.droppableId) {
      setDates((allDates) => {
        const currentDate = allDates[source.droppableId];
        const taskIds = [...currentDate.taskIds];
        const currentTask = taskIds[source.index];

        taskIds.splice(source.index, 1);
        taskIds.splice(destination?.index, 0, currentTask);

        return {
          ...allDates,
          [source.droppableId]: {
            ...currentDate,
            taskIds,
          },
        };
      });
    }

    // 다른 날짜 간 드래그앤드롭
    if (source.droppableId !== destination.droppableId) {
      setDates((allDates) => {
        const currentDate = allDates[source.droppableId];

        let destinationDate = allDates[destination.droppableId];
        if (!destinationDate) {
          destinationDate = {
            id: destination.droppableId,
            taskIds: [],
          };
        }

        const currentTaskIds = [...currentDate.taskIds];
        const currentTask = currentTaskIds[source.index];
        currentTaskIds.splice(source.index, 1);

        const destinationTaskIds = [...destinationDate.taskIds];
        destinationTaskIds.splice(destination?.index, 0, currentTask);

        return {
          ...allDates,
          [source.droppableId]: {
            ...currentDate,
            taskIds: currentTaskIds,
          },
          [destination.droppableId]: {
            ...destinationDate,
            taskIds: destinationTaskIds,
          },
        };
      });
    }
  };

  return (
    <Wrapper>
      <Header
        setCurrentDate={setCurrentDate}
        datesFormatOfWeek={datesFormatOfWeek}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <DayGrid>
          {datesFormatOfWeek.map((date, index) => (
            <Day
              key={date}
              date={date}
              index={index}
              isToday={getDateFormat(new Date()) === date}
            />
          ))}
          <Day date="9999-99-99" index={7} />
        </DayGrid>
      </DragDropContext>
    </Wrapper>
  );
}

export default Main;

const Wrapper = styled.div`
  padding: 40px 30px;

  @media (max-width: 640px) {
    padding: 0;
  }
`;

const DayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  grid-auto-rows: minmax(300px, auto);

  @media (max-width: 1280px) {
    grid-template-columns: repeat(3, 33.3%);
    grid-auto-rows: minmax(250px, auto);
  }

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 50%);
    grid-auto-rows: minmax(200px, auto);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: minmax(0, auto);
    gap: 30px;
    padding: 0 10px;
  }
`;
