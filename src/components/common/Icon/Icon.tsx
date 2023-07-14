import styled, { css } from "styled-components";

interface IconProps {
  icon: string;
  color?: string;
  bgColor?: string;
  size?: "lg" | "sm";
  mr?: string;
  isHover?: boolean;
  onClick?: (arg?: any) => void;
}

function Icon({ icon, color, bgColor, size, mr, isHover, onClick }: IconProps) {
  return (
    <Wrapper
      color={color}
      bgColor={bgColor}
      size={size}
      mr={mr}
      isHover={isHover}
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
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

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

      @media (max-width: 640px) {
        width: 20px;
        height: 20px;
        i {
          font-size: 16px;
        }
      }
    `} 

${(props) =>
    props.size === "sm" &&
    css`
      width: 24px;
      height: 24px;
      i {
        font-size: 16px;
      }
    `} 

    ${(props) =>
    props.isHover &&
    css`
      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: ${(props) => props.theme.iconHoverColor};
        }
      }
    `}

    ${(props) =>
    props.mr &&
    css`
      margin-right: ${props.mr};
    `}
`;
