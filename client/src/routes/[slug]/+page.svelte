<script lang="ts">
	import { onMount } from 'svelte';
	import Hls from 'hls.js';

    export let data;

	let video_element: HTMLVideoElement;
	let video_container: HTMLElement;
    let msg: String = 'Loading';
	let msgType: Number = 1;
    let stream = data.username;

	onMount(async () => {
		video_element = document.createElement("video");
		video_element.autoplay = true;
		video_element.muted = true;
		video_element.controls = true;
		video_element.width = 1000;
		

		if (Hls.isSupported()) {
			const hls = new Hls();
            hls.loadSource(`http://localhost:8080/hls/${stream}.m3u8`);
			hls.attachMedia(video_element);
			hls.on(Hls.Events.MANIFEST_PARSED, () => {
				video_container.appendChild(video_element);
				video_element.play();
				msg = "playing";
			});
			hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS.js error:', data);
                msg = "Error loading stream. The streamer may be offline";
				msgType = 2;
            });
		} else if (video_element.canPlayType('application/vnd.apple.mpegurl')) {
			video_element.src = 'https://your-stream-url.m3u8';
			video_element.addEventListener('loadedmetadata', () => {
				video_element.play();
			});
		} else {
            msg = "HLS not suported by this browser";
			msgType = 2;
        }
	});
</script>

<section class="p-4">

	<div class="mb-4">
		<p class="m-0">You are watching</p>
		<p class="text-3xl text-accent font-bold m-0">{stream}</p>
	</div>
	<div class="w-fit flex flex-col items-end" id="video" bind:this={video_container}>
		{#if msg}
		<p class="{msgType == 1? "text-blue-500" : "text-red-600"}">{msg}</p>
		{/if}
	</div>

</section>

