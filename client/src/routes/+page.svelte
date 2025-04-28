<script lang="ts">
	import { onMount } from 'svelte';
	import VideoListElement from '../components/VideoListElement.svelte';

	export let data: any;

	let video_element: HTMLVideoElement;
	let video_container: HTMLElement;
	let videos_container: HTMLElement;

	async function pingserver() {
		const response = await fetch("http://localhost:8000");
		console.log(await response.json());
	}

	onMount(() => {
	});
</script>

{#await data}
	loading
{:then} 

<div class="">
	<div class="p-8">
<!-- 		<button class="bg-blue-500 cursor-pointer p-4 " onclick={pingserver}>Ping server</button> -->
		<h1 class="text-lg font-bold mb-4">Live Channels</h1>
		<div class="">
			{#each data.streams as stream}
				<VideoListElement stream = {stream} />				
			{/each}
		</div>
	</div>
</div>

{/await}



<style>
</style>