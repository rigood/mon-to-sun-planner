import styled from "styled-components";

interface IButtonProps {
  children: string;
  type: string;
}

function Button({ children, type }: IButtonProps) {
  return <Wrapper type={type}>{children}</Wrapper>;
}

export default Button;

const Wrapper = styled.div<{ type: string }>`
  text-align: center;
  min-width: 100px;
  padding: 6px 10px;
  background-color: ${(props) => {
    switch (props.type) {
      case "cancel":
        return "gray";
      case "complete":
        return "deeppink";
    }
  }};
  color: white;
  cursor: pointer;
`;
