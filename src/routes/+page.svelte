<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import timer, { startTimer, resetTimer } from './timer';

	let minutes: number;
	let seconds: number;
	let isActive: boolean;
	let timerDone: boolean = false;

	let alertSound: HTMLAudioElement; // Reference to the audio element

	// Function to play the alert sound
	function playAlertSound() {
		alertSound.play();
	}

	// Function to display a browser notification
	function displayNotification() {
		if (!('Notification' in window)) {
			console.error('This browser does not support desktop notification');
			return;
		}

		if (Notification.permission === 'granted') {
			new Notification('Pomodoro Timer', { body: 'Time is up!' });
		} else if (Notification.permission !== 'denied') {
			Notification.requestPermission().then((permission) => {
				if (permission === 'granted') {
					new Notification('Pomodoro Timer', { body: 'Time is up!' });
				}
			});
		}
	}

	const unsubscribe = timer.subscribe(($timer) => {
		minutes = $timer.minutes;
		seconds = $timer.seconds;
		isActive = $timer.isActive;

		if (minutes === 0 && seconds === 0 && isActive) {
			timerDone = true;
			isActive = false; // Set isActive to false when the timer hits zero
			playAlertSound();
			displayNotification();
		}
	});

	onMount(() => {
		if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
			Notification.requestPermission();
		}
	});

	onDestroy(() => {
		unsubscribe();
	});
</script>

<svelte:head>
	<title>Pomodoro Timer</title>
	<meta name="description" content="Pomodoro Timer built with SvelteKit" />
</svelte:head>

<section class="flex flex-col justify-center items-center flex-grow">
	<h1 class="text-3xl font-semibold w-full text-center">Pomodoro Timer</h1>
	<div class={timerDone ? 'text-2xl my-4 text-red-500' : 'text-2xl my-4'}>
		{minutes}:{seconds < 10 ? '0' : ''}{seconds}
	</div>
	<button
		on:click={() => {
			startTimer();
		}}
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
	>
		{isActive && !timerDone ? 'Pause' : 'Start'}
	</button>
	<button
		on:click={() => {
			resetTimer();
			timerDone = false;
		}}
		class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
	>
		Reset
	</button>
	{#if timerDone}
		<div class="mt-4 bg-yellow-500 p-2 rounded">Time's up! Take a break.</div>
	{/if}
	<audio src="/alarm.mp3" bind:this={alertSound} />
	<!-- Binding the audio element -->
</section>
