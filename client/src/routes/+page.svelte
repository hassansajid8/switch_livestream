<script lang="ts">
	import { onMount } from 'svelte';
	import Hls from 'hls.js';
	import { goto } from '$app/navigation';
	import VideoListElement from '../components/VideoListElement.svelte';

	export let data;

	let video_element: HTMLVideoElement;
	let video_container: HTMLElement;
	let videos_container: HTMLElement;


	onMount(() => {
		console.log(data.streams);
	});
</script>

<div class="">
	<div class="p-8">
		<h1 class="text-lg font-bold mb-4">Live Channels</h1>
		<div class="">
			{#each data.streams as stream}
				<VideoListElement stream = {stream} />				
			{/each}
		</div>
	</div>
</div>


<style>
</style>