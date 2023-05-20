import styled from "styled-components";

interface IDayProps {
  date: string;
}

function Day({ date }: IDayProps) {
  return <Wrapper>{date}</Wrapper>;
}

export default Day;

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.themeColor};
  color: white;

  font-size: 1.6rem;

  &:not(:last-child) {
    margin-right: 10px;
  }
`;
