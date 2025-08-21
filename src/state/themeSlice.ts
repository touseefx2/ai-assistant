import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppTheme = 'white' | 'black' | 'blue';

interface ThemeState {
	current: AppTheme;
}

const initialState: ThemeState = {
	current: 'white',
};

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		setTheme(state, action: PayloadAction<AppTheme>) {
			state.current = action.payload;
		},
		nextTheme(state) {
			const order: AppTheme[] = ['white', 'black', 'blue'];
			const idx = order.indexOf(state.current);
			const next = order[(idx + 1) % order.length];
			state.current = next;
		},
	},
});

export const { setTheme, nextTheme } = themeSlice.actions;
export default themeSlice.reducer;
