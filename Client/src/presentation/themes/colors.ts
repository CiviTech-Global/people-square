// People Square - Ocean Blue Design System
// 55% White | 25% Ocean Blue | 15% Sky Blue | 5% Mint Accent

export const palette = {
  // 55% - White family
  white: "#FFFFFF",
  offWhite: "#F7F9FC",
  lightGray: "#EEF2F7",

  // 25% - Ocean Blue family
  oceanBlue: "#0A5EB0",
  oceanBlueDark: "#084A8C",
  oceanBlueLight: "#1A6FBF",
  oceanBluePale: "#E8F0FA",

  // 15% - Sky Blue family
  skyBlue: "#5BB5F0",
  skyBlueLight: "#87CEEB",
  skyBluePale: "#D4EDFB",

  // 5% - Mint accent
  mint: "#2DD4A0",
  mintDark: "#22B88A",
  mintLight: "#7EECD2",
  mintPale: "#E0FBF2",

  // Gray scale
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray200: "#E5E7EB",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray700: "#374151",
  gray800: "#1F2937",
  gray900: "#111827",

  // Semantic
  error: "#E63946",
  errorLight: "#FEE2E2",
  warning: "#F59E0B",
  warningLight: "#FEF3C7",
  success: "#2DD4A0",
  successLight: "#E0FBF2",
  info: "#5BB5F0",
  infoLight: "#D4EDFB",
} as const;

export const colors = {
  primary: {
    main: palette.oceanBlue,
    light: palette.oceanBlueLight,
    dark: palette.oceanBlueDark,
    lighter: palette.oceanBluePale,
  },
  secondary: {
    main: palette.skyBlue,
    light: palette.skyBlueLight,
    pale: palette.skyBluePale,
  },
  accent: {
    main: palette.mint,
    dark: palette.mintDark,
    light: palette.mintLight,
    pale: palette.mintPale,
  },
  text: {
    primary: palette.gray900,
    secondary: palette.gray500,
    light: "#ffffff",
    muted: palette.gray400,
  },
  background: {
    white: palette.white,
    offWhite: palette.offWhite,
    light: palette.lightGray,
    card: palette.white,
  },
} as const;

export const glassColors = {
  cardBackground: "rgba(255, 255, 255, 0.85)",
  cardBorder: "rgba(10, 94, 176, 0.12)",
  sidebarBackground: "rgba(255, 255, 255, 0.92)",
  modalBackground: "rgba(255, 255, 255, 0.95)",
  inputBackground: "rgba(255, 255, 255, 0.8)",
  buttonBackground: "linear-gradient(135deg, #0A5EB0 0%, #5BB5F0 100%)",
  buttonBackgroundHover: "linear-gradient(135deg, #084A8C 0%, #4AA4E0 100%)",
  buttonBorder: "rgba(10, 94, 176, 0.15)",
  textPrimary: palette.gray900,
  textSecondary: palette.gray500,
  textButton: "#ffffff",
} as const;

export const shadows = {
  card: "0 10px 40px rgba(10, 94, 176, 0.08)",
  cardHover: "0 16px 48px rgba(10, 94, 176, 0.14)",
  button: "0 4px 15px rgba(10, 94, 176, 0.2)",
  buttonHover: "0 6px 20px rgba(10, 94, 176, 0.3)",
  text: "none",
  input: "0 2px 8px rgba(10, 94, 176, 0.06)",
  inputFocus: "0 4px 12px rgba(10, 94, 176, 0.12)",
  sidebar: "4px 0 24px rgba(10, 94, 176, 0.06)",
  modal: "0 24px 64px rgba(10, 94, 176, 0.15)",
  dropdown: "0 8px 32px rgba(10, 94, 176, 0.12)",
} as const;

export const gradients = {
  primary: "linear-gradient(135deg, #0A5EB0 0%, #5BB5F0 100%)",
  secondary: "linear-gradient(135deg, #5BB5F0 0%, #87CEEB 100%)",
  accent: "linear-gradient(135deg, #2DD4A0 0%, #5BB5F0 100%)",
  hero: "linear-gradient(135deg, #0A5EB0 0%, #5BB5F0 50%, #87CEEB 100%)",
  background: "linear-gradient(180deg, #F7F9FC 0%, #EEF2F7 100%)",
  sidebar: "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(247,249,252,0.95) 100%)",
  dark: "linear-gradient(135deg, #084A8C 0%, #0A5EB0 100%)",
} as const;
