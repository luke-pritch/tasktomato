<script>
	import Footer from './Footer.svelte';
	import './styles.css';
	import '../app.css';
	import Header from './Header.svelte';
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>

	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		background-color: #f7f7f7;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
		background-color: #fff;
		box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
	}
</style>
