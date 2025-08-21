import type { AppTheme } from '../state/themeSlice';

export interface ThemeTokens {
	bgClass: string;
	textClass: string;
	textSubClass:string;
	borderClass: string;
	mutedTextClass: string;
	cardBgClass: string;
	primaryTextClass: string;
	headertBgHex: string;
	headerTintHex: string;
	palette?: {
		primary?: string;
		secondary?: string;
		accent?: string;
		surface?: string;
		muted?: string;
	};
}

export const THEME_TOKENS: Record<AppTheme, ThemeTokens> = {
	white: {
		bgClass: 'bg-white',
		textClass: 'text-[#2C3E50]',
		textSubClass: 'text-[#2C3E50]',		
		borderClass: 'border-slate-300/60',
		mutedTextClass: 'text-slate-600',
		cardBgClass: 'bg-slate-50',
		primaryTextClass: 'text-blue-600',
		headertBgHex: '#ffffff',
		headerTintHex: '#000000',
		palette: {
			primary: '#335DCC',
			secondary: '#1F2937',
			accent: '#0EA5E9',
			surface: '#F1F5F9',
			muted: '#64748B',
		},
	},
	black: {
		bgClass: 'bg-black',
		textClass: 'text-[#2C3E50]',
		textSubClass: 'text-[#2C3E50]',		
		borderClass: 'border-gray-700',
		mutedTextClass: 'text-gray-300',
		cardBgClass: 'bg-neutral-900',
		primaryTextClass: 'text-blue-300',
		headertBgHex: '#000000',
		headerTintHex: '#ffffff',
	},
	blue: {
		bgClass: 'bg-blue-50',
		textClass: 'text-[#2C3E50]',
		textSubClass: 'text-[#2C3E50]',		
		borderClass: 'border-blue-200',
		mutedTextClass: 'text-blue-800',
		cardBgClass: 'bg-blue-100',
		primaryTextClass: 'text-blue-700',
		headertBgHex: '#eff6ff',
		headerTintHex: '#0b1b42',
	},
};

export const getThemeTokens = (theme: AppTheme): ThemeTokens => THEME_TOKENS[theme];


