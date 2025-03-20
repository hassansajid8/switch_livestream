<script lang="ts">
	import '../app.css';
	import Login from '../components/Login.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { shared } from '$lib/shared.svelte';
	import Register from '../components/Register.svelte';

	let { children } = $props();
</script>

<main class="bg-bg h-screen w-full overflow-x-hidden">
	<Navbar />
	{#if shared.showLoginDialog}
		<Login />
	{/if}
	{#if shared.showRegisterDialog}
		<Register />
	{/if}
	{@render children()}
</main>

<style>
	br {
		color: #ebe9f4;
	}
</style>
