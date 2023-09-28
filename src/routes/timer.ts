import { writable } from 'svelte/store';

interface TimerState {
	minutes: number;
	seconds: number;
	isActive: boolean;
	intervalId?: number;
}

// Initial state
const initialState: TimerState = {
	minutes: 25,
	seconds: 0,
	isActive: false
};

const timer = writable<TimerState>(initialState);

export const startTimer = () => {
	timer.update((state) => {
		if (state.isActive) {
			// If the timer is active, clear the interval and pause it
			if (state.intervalId !== undefined) {
				clearInterval(state.intervalId);
			}
			return { ...state, isActive: false, intervalId: undefined };
		} else {
			// If the timer is not active, start the interval and update the timer
			const intervalId = window.setInterval(() => {
				timer.update((state) => {
					let { minutes, seconds } = state;
					if (seconds === 0) {
						if (minutes === 0) {
							// Timer has reached zero, clear interval
							clearInterval(state.intervalId!);
							return { ...state, isActive: false, intervalId: undefined };
						} else {
							minutes -= 1;
							seconds = 59;
						}
					} else {
						seconds -= 1;
					}
					return { ...state, minutes, seconds };
				});
			}, 1000);
			return { ...state, isActive: true, intervalId };
		}
	});
};

export const resetTimer = () => {
	timer.update((state) => {
		if (state.intervalId !== undefined) {
			clearInterval(state.intervalId);
		}
		return { ...initialState };
	});
};

export default timer;
