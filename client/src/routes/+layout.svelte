<script lang="ts">
	import '../app.css';
	import Login from '../components/Login.svelte';
	import Navbar from '../components/Navbar.svelte';
	import { shared } from '$lib/shared.svelte';
	import Register from '../components/Register.svelte';
	import Toasts from '$lib/toaster/Toasts.svelte';
	import { onMount } from 'svelte';
	import AccountDetails from '../components/AccountDetails.svelte';

	
	let { children, data } = $props();

	$inspect(shared.isAuth).with((type, isAuth) => {
		if(type == "update"){
			if(isAuth == true){
				if(!data.user){
					isAuth = false;
				}
			}
		}
	});

	onMount(() => {
		if(data.user){
			console.log("User exists", data.user);
			shared.isAuth = true;
		} else {
			shared.isAuth = false;
		}
	});
</script>

<Toasts />

<!-- Main -->
<main class="bg-bg h-screen w-full overflow-x-hidden">
	<Navbar />
	{#if shared.showLoginDialog}
		<Login />
	{/if}
	{#if shared.showRegisterDialog}
		<Register />
	{/if}
	{#if shared.showAccountDetails}
		<AccountDetails data={data} />
	{/if}
	{@render children()}
</main>

<style>
	br {
		color: #ebe9f4;
	}
</style>
