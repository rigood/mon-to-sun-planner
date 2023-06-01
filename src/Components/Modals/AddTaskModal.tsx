import { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useSetRecoilState } from "recoil";
import { tasksState } from "../../store/tasksState";
import { datesState } from "../../store/datesState";

export interface IAddTaskModal {
  date: string;
  day: string;
  closeModal: () => void;
}

function AddTaskModal({ date: initialDate, day, closeModal }: IAddTaskModal) {
  const [date, setDate] = useState(initialDate);
  const [content, setContent] = useState("");

  const setTasks = useSetRecoilState(tasksState);
  const setDates = useSetRecoilState(datesState);

  const addTask = () => {
    if (content === "") {
      alert("내용을 입력해주세요");
    } else {
      const newTaskId = String(Date.now());

      const newTask = {
        id: newTaskId,
        isDone: false,
        content,
      };

      setTasks((allTasks) => {
        return {
          ...allTasks,
          [newTaskId]: newTask,
        };
      });

      setDates((allDates) => {
        let currentDate = allDates[date];
        if (!currentDate) {
          currentDate = {
            id: date,
            taskIds: [],
          };
        }

        const taskIds = [...currentDate.taskIds];
        taskIds.push(newTaskId);

        return {
          ...allDates,
          [date]: {
            ...currentDate,
            taskIds,
          },
        };
      });
    }

    closeModal();
  };

  return (
    <Wrapper>
      <Header>
        <Title>Task 추가</Title>
      </Header>
      <Calendar>
        {date} {day}
      </Calendar>
      <Content
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></Content>
      <Buttons>
        <>
          <Cancel type="cancel" onClick={closeModal}>
            취소
          </Cancel>
          <Complete type="complete" onClick={addTask}>
            완료
          </Complete>
        </>
      </Buttons>
    </Wrapper>
  );
}

export default AddTaskModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 5%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7.5px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const Calendar = styled.div`
  margin-bottom: 15px;
  input {
    width: 150px;
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
    padding: 5px;
  }
`;

const Content = styled.textarea`
  flex-grow: 1;
  margin-bottom: 20px;
  font-family: inherit;
  font-size: inherit;
  padding: 10px;
  border: none;
  outline: none;
  resize: none;
  word-break: break-all;
  word-wrap: break-word;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
`;

const Cancel = styled(Button)``;
const Complete = styled(Button)``;
