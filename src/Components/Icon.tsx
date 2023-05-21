import styled, { css } from "styled-components";

interface IconProps {
  icon: string;
  color?: string;
  bgColor?: string;
  size?: "lg" | "sm";
  mr?: string;
  isHover?: boolean;
  alignEnd?: boolean;
  onClick?: () => void;
}

function Icon({
  icon,
  color,
  bgColor,
  size,
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
  mr?: string;
  isHover?: boolean;
  alignEnd?: boolean;
}>`
  width: 24px;
  height: 24px;
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  i {
    font-size: 16px;
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
        font-size: 36px;
      }
    `}

    ${(props) =>
    props.isHover &&
    css`
      &:hover {
        color: ${(props) => props.theme.hoverColor};
      }
    `}

    ${(props) =>
    props.alignEnd &&
    css`
      align-items: end !important;
    `}

    ${(props) =>
    props.mr &&
    css`
      margin-right: ${props.mr};
    `}
`;
