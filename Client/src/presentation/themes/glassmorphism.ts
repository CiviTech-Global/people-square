import { glassColors, shadows } from "./colors";

export const glassmorphismStyles = {
  card: {
    background: glassColors.cardBackground,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: `1px solid ${glassColors.cardBorder}`,
    boxShadow: shadows.card,
  },
  cardHover: {
    boxShadow: shadows.cardHover,
    border: `1px solid rgba(10, 94, 176, 0.2)`,
  },
  button: {
    background: glassColors.buttonBackground,
    border: "none",
    boxShadow: shadows.button,
  },
  buttonHover: {
    background: glassColors.buttonBackgroundHover,
    boxShadow: shadows.buttonHover,
  },
  input: {
    background: glassColors.inputBackground,
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    border: "1px solid rgba(10, 94, 176, 0.12)",
    boxShadow: shadows.input,
  },
  inputFocused: {
    border: "1px solid rgba(10, 94, 176, 0.35)",
    boxShadow: shadows.inputFocus,
  },
  sidebar: {
    background: glassColors.sidebarBackground,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderRight: "1px solid rgba(10, 94, 176, 0.08)",
    boxShadow: shadows.sidebar,
  },
  modal: {
    background: glassColors.modalBackground,
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(10, 94, 176, 0.1)",
    boxShadow: shadows.modal,
  },
  appBar: {
    background: "rgba(255, 255, 255, 0.88)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(10, 94, 176, 0.08)",
  },
} as const;

export const borderRadius = {
  small: "8px",
  medium: "12px",
  large: "16px",
  xlarge: "24px",
  button: "50px",
} as const;

export const transitions = {
  default: "all 0.3s ease",
  fast: "all 0.2s ease",
  slow: "all 0.4s ease",
} as const;
