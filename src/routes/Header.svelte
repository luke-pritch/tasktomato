<!-- src/lib/Header.svelte -->
<header class="bg-tomato text-white py-3 shadow-md">
	<div class="container mx-auto flex items-center justify-between">
		<a href="/" class="text-2xl font-bold"> Task Tomato</a>
		<nav>
			<ul class="flex space-x-4">
				<li><a href="/" class="hover:underline">Home</a></li>
				<li><a href="/about" class="hover:underline">About</a></li>
				<li><a href="/contact" class="hover:underline">Contact</a></li>
			</ul>
		</nav>
	</div>
</header>

<style>
	.bg-tomato {
		background-color: #ff6347;
	}
</style>
