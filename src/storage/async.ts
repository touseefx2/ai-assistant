import AsyncStorage from '@react-native-async-storage/async-storage';

export const readString = async (key: string): Promise<string | undefined> => {
	try {
		const v = await AsyncStorage.getItem(key);
		return v ?? undefined;
	} catch {
		return undefined;
	}
};

export const writeString = async (key: string, value: string): Promise<void> => {
	try {
		await AsyncStorage.setItem(key, value);
	} catch {
		// ignore
	}
};


