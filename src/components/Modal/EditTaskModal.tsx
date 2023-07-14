import { useRef, useState } from "react";
import styled from "styled-components";
import useTask from "../../hooks/useTask";
import ModalHeader from "./ModalHeader";
import Button from "../common/Button/Button";

export interface IEditTaskModal {
  id: string;
  date: string;
  day: string;
  color: string;
  index: number;
  title: string;
  memo: string;
  closeModal: () => void;
}

function EditTaskModal({
  id,
  date: initialDate,
  day: initalDay,
  color,
  index,
  title: initialTitle,
  memo: initialMemo,
  closeModal,
}: IEditTaskModal) {
  const [date, setDate] = useState(initialDate);
  const [day, setDay] = useState(initalDay);

  const [title, setTitle] = useState(initialTitle);
  const [memo, setMemo] = useState(initialMemo);

  const { editTask, deleteTask } = useTask();

  const handleEditTask = () => {
    editTask(id, title, memo, initialDate, date);
    closeModal();
  };

  const handleDeleteTask = () => {
    deleteTask(date, id, index);
    closeModal();
  };

  const calendarRef = useRef<HTMLInputElement>(null);

  const onCalendarClick = () => {
    calendarRef?.current?.showPicker();
  };

  const onCalendarDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setDate(e.target.value);
      setDay(
        e.target.valueAsDate!.toLocaleDateString("ko-KR", { weekday: "long" })
      );
    }
  };

  const moveCaretAtEnd = (e: React.FocusEvent<HTMLInputElement>) => {
    const tempValue = e.target.value;
    e.target.value = "";
    e.target.value = tempValue;
  };

  return (
    <Wrapper>
      <ModalHeader title="Task 수정" closeModal={closeModal} />
      <Calendar onClick={onCalendarClick}>
        <input
          type="date"
          value={date}
          ref={calendarRef}
          onChange={onCalendarDateChange}
        />
        <span>({day})</span>
      </Calendar>
      <Title
        placeholder="+ Add new task"
        color={color}
        value={title}
        autoFocus
        onFocus={moveCaretAtEnd}
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
          <Delete onClick={handleDeleteTask}>삭제</Delete>
          <Complete color={color} onClick={handleEditTask}>
            완료
          </Complete>
        </>
      </Buttons>
    </Wrapper>
  );
}

export default EditTaskModal;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 5%;
`;

const Calendar = styled.div`
  margin-bottom: 15px;
  input {
    font-family: inherit;
    font-size: inherit;
    border: none;
    outline: none;
    padding: 5px;
    cursor: pointer;

    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
    }
  }
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
  justify-content: space-between;
  column-gap: 20px;
`;

const Delete = styled(Button)``;
const Complete = styled(Button)``;
