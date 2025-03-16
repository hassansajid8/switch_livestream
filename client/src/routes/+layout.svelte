<script lang="ts">
	import '../app.css';
	import Navbar from '../components/Navbar.svelte';
	let { children } = $props();
</script>

<main class="bg-bg h-screen w-full overflow-x-hidden">
	<Navbar />
	{@render children()}
</main>

<style>
	br {
		color: #ebe9f4;
	}
</style>
