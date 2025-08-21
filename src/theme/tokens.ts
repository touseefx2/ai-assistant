import type { AppTheme } from "../state/themeSlice";

export interface ThemeTokens {
  background: string;
  text: string;
  subText: string;
  primary: string;
  border: string;
  borderDark: string;
  card: string;
  white: string;
  black: string;
  shadowColor: string;
}

export const THEME_TOKENS: Record<AppTheme, ThemeTokens> = {
  white: {
    background: "#FCFCFC",
    text: "#2C3E50",
    subText: "#64748B",
    primary: "#365AB8",
    border: "#EEEEEE",
    borderDark:"#323232",
    card: "#F8FAFC",
    white: "#FFFFFF",
    black: "#000000",
	shadowColor: "#000000",
  },
  black: {
    background: "#000000",
    text: "#FFFFFF",
    subText: "#94A3B8",
    primary: "#365AB8",
    border: "#27272A",
    borderDark:"#323232",
    card: "#18181B",
    white: "#FFFFFF",
    black: "#000000",
	shadowColor: "#FFFFFF",
  },
  blue: {
    background: "#EFF6FF",
    text: "#2C3E50",
    subText: "#1E40AF",
    primary: "#365AB8",
    border: "#BFDBFE",
    borderDark:"#323232",
    card: "#DBEAFE",
    white: "#FFFFFF",
    black: "#000000",
	shadowColor: "#000000",
  },
};

export const getThemeTokens = (theme: AppTheme): ThemeTokens =>
  THEME_TOKENS[theme];
