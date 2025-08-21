import React, { useMemo, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import type { RootState } from '../state/store';
import { useAppSelector } from '../state/useStoreHooks';

interface DropdownProps<T extends string> {
	label: string;
	value: T;
	options: { label: string; value: T }[];
	onChange: (value: T) => void;
  placeholder?: string;
  compact?: boolean;
  showLabel?: boolean;
}

export function Dropdown<T extends string>({ label, value, options, onChange, placeholder, compact = false, showLabel = true }: DropdownProps<T>) {
	const [open, setOpen] = useState(false);
	const [anchor, setAnchor] = useState<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });
	const triggerRef = useRef<View>(null);
	const selectedLabel = useMemo(() => options.find(o => o.value === value)?.label ?? placeholder ?? '', [options, value, placeholder]);
	const theme = useAppSelector((s: RootState) => s.theme.current);

	const textClass = theme === 'black' ? 'text-white' : theme === 'blue' ? 'text-blue-950' : 'text-black';
	const bgClass = theme === 'black' ? 'bg-black' : theme === 'blue' ? 'bg-blue-50' : 'bg-white';
	const borderClass = theme === 'black' ? 'border-gray-700' : theme === 'blue' ? 'border-blue-200' : 'border-slate-300/60';

	const toggleOpen = () => {
		if (!open) {
			try {
				(triggerRef.current as any)?.measureInWindow?.((x: number, y: number, w: number, h: number) => {
					setAnchor({ x, y, w, h });
					setOpen(true);
				});
			} catch {
				setOpen(true);
			}
		} else {
			setOpen(false);
		}
	};

	return (
		<View className={compact ? '' : 'w-full'}>
			{showLabel ? <Text className={`text-sm font-medium ${textClass} mb-1.5`}>{label}</Text> : null}
			<Pressable
				ref={triggerRef}
				className={`flex-row items-center justify-between rounded-xl border ${borderClass} ${bgClass} shadow-sm active:opacity-80 ${compact ? 'px-3 py-2 min-w-[140px]' : 'px-4 py-3'}`}
				onPress={toggleOpen}
			>
				<Text className={`${textClass} ${compact ? 'text-sm' : 'text-base'}`}>{selectedLabel}</Text>
				<Text className={`${textClass} ${compact ? 'text-xs' : 'text-sm'}`}>{open ? '˄' : '˅'}</Text>
			</Pressable>

			<Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
				{/* Backdrop to close */}
				<Pressable style={{ position: 'absolute', inset: 0 }} onPress={() => setOpen(false)} />
				<View
					style={{ position: 'absolute', top: anchor.y + anchor.h + 8, left: anchor.x, width: Math.max(180, anchor.w) }}
					className={`rounded-xl border ${borderClass} ${bgClass} shadow-lg overflow-hidden`}
				>
					<ScrollView className="max-h-60">
						{options.map(o => {
							const isSelected = o.value === value;
							return (
								<Pressable
									key={o.value}
									className={`px-4 py-3 flex-row items-center justify-between`}
									onPress={() => {
										onChange(o.value);
										setOpen(false);
									}}
								>
									<Text className={`${compact ? 'text-sm' : 'text-base'} ${isSelected ? 'font-semibold' : ''} ${textClass}`}>{o.label}</Text>
									{isSelected ? <Text className={`${textClass} ${compact ? 'text-xs' : 'text-sm'}`}>✓</Text> : null}
								</Pressable>
							);
						})}
					</ScrollView>
				</View>
			</Modal>
		</View>
	);
}


