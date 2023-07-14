import styled from "styled-components";

interface ModalHeaderProps {
  title: string;
  closeModal: () => void;
}
function ModalHeader({ title, closeModal }: ModalHeaderProps) {
  return (
    <Header>
      <Title>{title}</Title>
      <CloseBtn onClick={closeModal}>
        <i className="fa fa-x" />
      </CloseBtn>
    </Header>
  );
}

export default ModalHeader;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: bold;
`;

const CloseBtn = styled.div`
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    font-size: 18px;
  }
`;
