import { useState } from "react";
import styled from "styled-components";
import useTask from "../../hooks/useTask";
import Button from "../common/Button/Button";
import ModalHeader from "./ModalHeader";

export interface IAddTaskModal {
  date: string;
  day: string;
  color: string;
  closeModal: () => void;
}

function AddTaskModal({ date, day, color, closeModal }: IAddTaskModal) {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  const { addTask } = useTask();

  const handleAddTask = () => {
    addTask(date, title, memo);
    closeModal();
  };

  return (
    <Wrapper>
      <ModalHeader title="Task 추가" closeModal={closeModal} />
      <Calendar>
        {date} ({day})
      </Calendar>
      <Title
        placeholder="+ Add new task"
        color={color}
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Memo
        placeholder="memo"
        color={color}
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <Buttons>
        <>
          <Complete onClick={handleAddTask} color={color}>
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

const Calendar = styled.div`
  margin-bottom: 15px;
`;

const Title = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  background-color: ${(props) => props.color + "10"};
  border: none;
  outline: none;
  font-family: inherit;
  font-size: inherit;

  &::placeholder {
    color: ${(props) => props.theme.subTextColor};
  }
`;

const Memo = styled.textarea`
  flex-grow: 1;
  margin-bottom: 20px;
  font-family: inherit;
  font-size: inherit;
  height: 120px;
  padding: 10px;
  background-color: ${(props) => props.color + "10"};
  border: none;
  outline: none;
  resize: none;
  word-break: break-all;

  &::placeholder {
    color: ${(props) => props.theme.subTextColor};
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  column-gap: 20px;
`;

const Complete = styled(Button)``;
