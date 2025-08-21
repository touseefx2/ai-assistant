import type { AppTheme } from '../state/themeSlice';

export interface ThemeTokens {
	bgClass: string;
	textClass: string;
	borderClass: string;
	mutedTextClass: string;
	cardBgClass: string;
	primaryTextClass: string;
	headertBgHex: string;
	headerTintHex: string;
}

export const THEME_TOKENS: Record<AppTheme, ThemeTokens> = {
	white: {
		bgClass: 'bg-white',
		textClass: 'text-black',
		borderClass: 'border-slate-300/60',
		mutedTextClass: 'text-slate-600',
		cardBgClass: 'bg-slate-50',
		primaryTextClass: 'text-blue-600',
		headertBgHex: '#ffffff',
		headerTintHex: '#000000',
	},
	black: {
		bgClass: 'bg-black',
		textClass: 'text-white',
		borderClass: 'border-gray-700',
		mutedTextClass: 'text-gray-300',
		cardBgClass: 'bg-neutral-900',
		primaryTextClass: 'text-blue-300',
		headertBgHex: '#000000',
		headerTintHex: '#ffffff',
	},
	blue: {
		bgClass: 'bg-blue-50',
		textClass: 'text-blue-950',
		borderClass: 'border-blue-200',
		mutedTextClass: 'text-blue-800',
		cardBgClass: 'bg-blue-100',
		primaryTextClass: 'text-blue-700',
		headertBgHex: '#eff6ff',
		headerTintHex: '#0b1b42',
	},
};

export const getThemeTokens = (theme: AppTheme): ThemeTokens => THEME_TOKENS[theme];


