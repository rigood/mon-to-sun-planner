import styled, { css } from "styled-components";

interface IconProps {
  icon: string;
  color?: string;
  bgColor?: string;
  size?: "lg" | "sm";
  ml?: number;
  mr?: number;
  isHover?: boolean;
  alignEnd?: boolean;
  onClick?: () => void;
}

function Icon({
  icon,
  color,
  bgColor,
  size,
  ml,
  mr,
  isHover,
  alignEnd,
  onClick,
}: IconProps) {
  return (
    <Wrapper
      color={color}
      bgColor={bgColor}
      size={size}
      ml={ml}
      mr={mr}
      isHover={isHover}
      alignEnd={alignEnd}
      onClick={onClick}
    >
      <i className={icon}></i>
    </Wrapper>
  );
}

export default Icon;

const Wrapper = styled.div<{
  color?: string;
  bgColor?: string;
  size?: string;
  ml?: number;
  mr?: number;
  isHover?: boolean;
  alignEnd?: boolean;
}>`
  width: 36px;
  height: 36px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  i {
    font-size: 2.4rem;
    transition: all 0.2s ease;
  }

  ${(props) =>
    props.color &&
    css`
      color: ${props.color};
    `}

  ${(props) =>
    props.bgColor &&
    css`
      background-color: ${props.bgColor};
    `}

    ${(props) =>
    props.size === "lg" &&
    css`
      width: 48px;
      height: 48px;
      i {
        font-size: 3.6rem;
      }
    `}

    ${(props) =>
    props.isHover &&
    css`
      &:hover {
        color: ${(props) => props.theme.themeColor};
      }
    `}

    ${(props) =>
    props.alignEnd &&
    css`
      align-items: end !important;
    `}
`;
