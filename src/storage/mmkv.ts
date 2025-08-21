import { MMKV } from 'react-native-mmkv';

export const mmkv = new MMKV({ id: 'ai-assistant' });

export const readString = (key: string): string | undefined => {
	try {
		return mmkv.getString(key) ?? undefined;
	} catch {
		return undefined;
	}
};

export const writeString = (key: string, value: string): void => {
	try {
		mmkv.set(key, value);
	} catch {
		// ignore
	}
};


