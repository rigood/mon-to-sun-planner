import styled from "styled-components";

interface MiniButtonProps {
  icon: string;
  onClick: (e: React.MouseEvent) => void;
}

function MiniButton({ icon, onClick }: MiniButtonProps) {
  return (
    <Wrapper onClick={onClick}>
      <i className={icon} />
    </Wrapper>
  );
}

export default MiniButton;

const Wrapper = styled.button`
  margin-left: 5px;
  padding: 0 5px;
  cursor: pointer;
  background: transparent;
  border: none;
  outline: none;

  i {
    font-size: 14px;
    vertical-align: baseline;
  }
`;
