<script lang="ts">
	import { onMount } from 'svelte';
	import Hls from 'hls.js';
	import Chat from '../../components/Chat.svelte';
	import Icon from '@iconify/svelte';

	let { data } = $props();

	let video_element: HTMLVideoElement;
	let video_container: HTMLElement;
	let msg: String = 'Loading';
	let msgType: Number = 1;
	let stream = data.username;

	onMount(async () => {
		if (data.isLive) {
			video_element = document.createElement('video');
			video_element.autoplay = true;
			video_element.muted = true;
			video_element.controls = true;
			video_element.width = 1000;
			video_element.style.borderRadius = "5px";

			if (Hls.isSupported()) {
				const hls = new Hls();
				hls.loadSource(`http://localhost:8080/hls/${stream}.m3u8`);
				hls.attachMedia(video_element);
				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					video_container.appendChild(video_element);
					video_element.play();
					msg = 'playing';
				});
				hls.on(Hls.Events.ERROR, (event, data) => {
					console.error('HLS.js error:', data);
					msg = 'Error loading stream. The streamer may be offline';
					msgType = 2;
				});
			} else if (video_element.canPlayType('application/vnd.apple.mpegurl')) {
				video_element.src = `http://localhost:8080/hls/${stream}.m3u8`;
				video_element.addEventListener('loadedmetadata', () => {
					video_element.play();
				});
			} else {
				msg = 'HLS not suported by this browser';
				msgType = 2;
			}
		}
	});
</script>

<section class="p-4">
	{#if data.isLive}
	<div class="lg:flex w-full gap-4 ">
		<div>
			<div class="flex w-fit flex-col items-end" id="video" bind:this={video_container}>
			</div>
			<div class="flex items-center gap-3 p-4">
				<div class="rounded-full border-2">
					<Icon icon="bxs:game" width="32" height="32" />
				</div>
 				<p class="text-accent m-0 text-3xl font-bold">{stream}</p>
			</div>
		</div>

		<Chat  data={data} />
	</div>
	{:else}
	<div>
		Streamer is offline
	</div>
	{/if}
</section>
