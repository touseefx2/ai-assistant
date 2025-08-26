import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import type { AppLanguage } from './languageSlice';
import language from './languageSlice';
import type { AppTheme } from './themeSlice';
import theme from './themeSlice';
import user from './userSlice';

const THEME_KEY = 'theme.current';
const LANG_KEY = 'language.current';

export const hydrateFromStorage = async (dispatch: any) => {
	try {
		const [t, l] = await Promise.all([
			AsyncStorage.getItem(THEME_KEY),
			AsyncStorage.getItem(LANG_KEY),
		]);
		if (t === 'white' || t === 'black' || t === 'blue') {
			dispatch({ type: 'theme/setTheme', payload: t as AppTheme });
		}
		if (l === 'en' || l === 'fr') {
			dispatch({ type: 'language/setLanguage', payload: l as AppLanguage });
		}
	} catch {}
};

export const persistMiddleware = (storeAPI: any) => (next: any) => async (action: any) => {
	const result = next(action);
	try {
		if (action.type === 'theme/setTheme' || action.type === 'theme/nextTheme') {
			const state = storeAPI.getState();
			await AsyncStorage.setItem(THEME_KEY, state.theme.current as AppTheme);
		}
		if (action.type === 'language/setLanguage') {
			const state = storeAPI.getState();
			await AsyncStorage.setItem(LANG_KEY, state.language.current as AppLanguage);
		}
	} catch {}
	return result;
};

export const store = configureStore({
	reducer: { theme, language, user },
	middleware: (gDM) => gDM().concat(persistMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
