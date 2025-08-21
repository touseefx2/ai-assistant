import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppLanguage = 'en' | 'fr';

interface LanguageState {
	current: AppLanguage;
}

const initialState: LanguageState = {
	current: 'en',
};

const languageSlice = createSlice({
	name: 'language',
	initialState,
	reducers: {
		setLanguage(state, action: PayloadAction<AppLanguage>) {
			state.current = action.payload;
		},
	},
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
