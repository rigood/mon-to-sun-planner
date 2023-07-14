import styled from "styled-components";
import useTask from "../../hooks/useTask";
import { useState } from "react";

interface TaskCreatorProps {
  date: string;
  color: string;
}

function TaskCreator({ date, color }: TaskCreatorProps) {
  const [input, setInput] = useState("");

  const { addTask } = useTask();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addTask(date, input);
    setInput("");
  };

  return (
    <Form color={color} onSubmit={handleSubmit} onBlur={handleSubmit}>
      <Input
        placeholder="+ Add new task"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></Input>
    </Form>
  );
}

export default TaskCreator;

const Form = styled.form<{ color: string }>`
  position: relative;
  border-bottom: 1px solid ${(props) => props.theme.lineColor};

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-bottom: 1px solid ${(props) => props.color};
    }
  }

  &:focus-within {
    border-bottom: 1px solid transparent;
  }

  &:focus-within::before {
    content: "";
    position: absolute;
    top: -1px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    box-shadow: 0 1px 4px 1px rgba(0, 0, 0, 0.1);
    cursor: text;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 10px;
  border: none;
  outline: none;
  font-size: 14px;
  background: transparent;
  word-break: break-all;
  white-space: break-spaces;

  &::placeholder {
    color: ${(props) => props.theme.subTextColor};
  }

  &:focus::placeholder {
    color: transparent;
  }
`;
