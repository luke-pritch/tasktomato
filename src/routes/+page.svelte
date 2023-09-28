<script lang="ts">
	import timer, { startTimer, resetTimer } from './timer';

	let minutes: number;
	let seconds: number;
	let isActive: boolean;

	const unsubscribe = timer.subscribe(($timer) => {
		minutes = $timer.minutes;
		seconds = $timer.seconds;
		isActive = $timer.isActive;
	});
</script>

<svelte:head>
	<title>Pomodoro Timer</title>
	<meta name="description" content="Pomodoro Timer built with SvelteKit" />
</svelte:head>

<section class="flex flex-col justify-center items-center flex-grow">
	<h1 class="text-3xl font-semibold w-full text-center">Pomodoro Timer</h1>
	<div class="text-2xl my-4">
		{minutes}:{seconds < 10 ? '0' : ''}{seconds}
	</div>
	<button
		on:click={() => startTimer()}
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
	>
		{isActive ? 'Pause' : 'Start'}
	</button>
	<button
		on:click={() => resetTimer()}
		class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
	>
		Reset
	</button>
</section>

<style>
	/* You can keep the styles empty if you are fully using Tailwind CSS */
</style>
