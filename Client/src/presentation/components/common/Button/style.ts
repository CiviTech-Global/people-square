import styled from "styled-components";

interface StyledButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const getPadding = (size?: string) => {
  switch (size) {
    case "sm":
      return "var(--spacing-sm) var(--spacing-md)";
    case "lg":
      return "var(--spacing-md) var(--spacing-xl)";
    case "md":
    default:
      return "var(--spacing-md) var(--spacing-lg)";
  }
};

const getFontSize = (size?: string) => {
  switch (size) {
    case "sm":
      return "0.875rem";
    case "lg":
      return "1.125rem";
    case "md":
    default:
      return "0.95rem";
  }
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  padding: ${(props) => getPadding(props.size)};
  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  font-size: ${(props) => getFontSize(props.size)};
  font-weight: 600;
  font-family: var(--font-body);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  outline: none;
  position: relative;
  overflow: hidden;

  ${(props) => {
    switch (props.variant) {
      case "secondary":
        return `
          background: var(--color-white);
          color: var(--color-dark);
          border: 1px solid var(--color-gray-light);

          &:hover:not(:disabled) {
            background: var(--color-gray-light);
            border-color: var(--color-gray);
            transform: translateY(-1px);
            box-shadow: var(--shadow-sm);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case "outline":
        return `
          background: var(--color-white);
          color: var(--color-dark);
          border: 1px solid var(--color-gray-light);

          &:hover:not(:disabled) {
            background: var(--color-gray-light);
            border-color: var(--color-gray);
            transform: translateY(-1px);
            box-shadow: var(--shadow-sm);
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
      case "primary":
      default:
        return `
          background: var(--color-dark);
          color: var(--color-white);
          border: 2px solid var(--color-dark);

          &::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.15);
            transform: translate(-50%, -50%);
            transition: width 0.4s, height 0.4s;
          }

          &:hover:not(:disabled) {
            background: var(--color-darker);
            border-color: var(--color-darker);
            transform: translateY(-1px);
            box-shadow: var(--shadow-lg);

            &::before {
              width: 300px;
              height: 300px;
            }
          }

          &:active:not(:disabled) {
            transform: translateY(0);
          }
        `;
    }
  }}

  &:disabled {
    background: var(--color-gray-light);
    border-color: var(--color-gray-light);
    color: var(--color-gray);
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    outline: 2px solid var(--color-blue);
    outline-offset: 2px;
  }

  > * {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 480px) {
    padding: ${(props) => {
      const padding = getPadding(props.size);
      return padding
        .replace(/var\(--spacing-xl\)/g, "var(--spacing-lg)")
        .replace(/var\(--spacing-lg\)/g, "var(--spacing-md)");
    }};
  }
`;

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Spinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
