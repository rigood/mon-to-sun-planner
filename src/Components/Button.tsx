import styled from "styled-components";

interface IButtonProps {
  children: string;
  color?: string;
  onClick: () => void;
}

function Button({ children, color, onClick }: IButtonProps) {
  return (
    <Wrapper color={color} onClick={onClick}>
      {children}
    </Wrapper>
  );
}

export default Button;

const Wrapper = styled.div`
  text-align: center;
  min-width: 100px;
  padding: 6px 10px;
  background-color: ${(props) => props.color || props.theme.buttonBgColor};
  color: white;
  cursor: pointer;
`;
