import type { AppTheme } from '../state/themeSlice';

export const getThemeClasses = (theme: AppTheme) => {
	if (theme === 'black') return { bg: 'bg-black', text: 'text-white' } as const;
	if (theme === 'blue') return { bg: 'bg-blue-50', text: 'text-blue-950' } as const;
	return { bg: 'bg-white', text: 'text-black' } as const;
};


