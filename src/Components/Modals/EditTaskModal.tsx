import { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import { useSetRecoilState } from "recoil";
import { tasksState } from "../../store/tasksState";
import { datesState } from "../../store/datesState";

export interface IEditTaskModal {
  id: string;
  date: string;
  index: number;
  content: string;
  closeModal: () => void;
}

function EditTaskModal({
  id,
  date,
  index,
  content: initialContent,
  closeModal,
}: IEditTaskModal) {
  const [content, setContent] = useState(initialContent);

  const setTasks = useSetRecoilState(tasksState);
  const setDates = useSetRecoilState(datesState);

  const editTask = () => {
    if (content === "") {
      alert("내용을 입력해주세요");
    } else {
      setTasks((allTasks) => {
        const currentTask = allTasks[id];

        return {
          ...allTasks,
          [id]: {
            ...currentTask,
            content,
          },
        };
      });

      closeModal();
    }
  };

  const deleteTask = () => {
    const ok = window.confirm("정말 삭제하시겠습니까?");

    if (ok) {
      setTasks((allTasks) => {
        const allTasksArray = Object.entries(allTasks);
        const newTasksArray = allTasksArray.filter((task) => task[0] !== id);
        const newTasks = Object.fromEntries(newTasksArray);

        return newTasks;
      });

      setDates((allDates) => {
        const currentDate = allDates[date];
        const taskIds = [...currentDate.taskIds];
        taskIds.splice(index, 1);

        return {
          ...allDates,
          [date]: {
            ...currentDate,
            taskIds,
          },
        };
      });
    } else {
      return;
    }

    closeModal();
  };

  const moveCaretAtEnd = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const tempValue = e.target.value;
    e.target.value = "";
    e.target.value = tempValue;
  };

  return (
    <Wrapper>
      <Header>
        <Title>Task 편집</Title>
        <DeleteBtn title="Task 삭제" onClick={deleteTask}>
          <i className="fa fa-trash"></i>
        </DeleteBtn>
      </Header>
      <Calendar>
        <input type="date" value={date} readOnly></input>
      </Calendar>
      <Content
        autoFocus
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onFocus={moveCaretAtEnd}
      ></Content>
      <Buttons>
        <>
          <Cancel type="cancel" onClick={closeModal}>
            취소
          </Cancel>
          <Complete type="complete" onClick={editTask}>
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

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 7.5px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const DeleteBtn = styled.div`
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  i {
    font-size: 18px;
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: deeppink;
    }
  }
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
