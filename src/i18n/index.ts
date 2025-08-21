import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
	en: {
		translation: {
			dashboard: 'Dashboard',
			welcome: 'Welcome',
			settings: 'Settings',
			changeLanguage: 'Change language',
			toggleTheme: 'Toggle theme',
			currentTheme: 'Current theme',
		},
	},
	fr: {
		translation: {
			dashboard: 'Tableau de bord',
			welcome: 'Bienvenue',
			settings: 'Paramètres',
			changeLanguage: 'Changer de langue',
			toggleTheme: 'Changer le thème',
			currentTheme: 'Thème actuel',
		},
	},
} as const;

i18n.use(initReactI18next).init({
	resources,
	lng: 'en',
	fallbackLng: 'en',
	compatibilityJSON: 'v3',
	interpolation: { escapeValue: false },
});

export default i18n;


