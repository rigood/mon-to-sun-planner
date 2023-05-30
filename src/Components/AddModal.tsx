import { useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";

function AddModal() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Wrapper>
      <Header>
        <Title>Task 추가</Title>
        <Delete title="Task 삭제">
          <i className="fa fa-trash"></i>
        </Delete>
      </Header>
      <Date>
        <input type="date"></input>
      </Date>
      <Content autoFocus></Content>
      <Buttons>
        <>
          <Cancel type="cancel">취소</Cancel>
          <Complete type="complete">완료</Complete>
        </>
      </Buttons>
    </Wrapper>
  );
}

export default AddModal;

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

const Delete = styled.div`
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

const Date = styled.div`
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
