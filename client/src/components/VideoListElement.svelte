<script lang="ts">
	import { onMount } from 'svelte';
	import Hls from 'hls.js';

	export let stream: any;

	let video_elem: HTMLVideoElement;

	onMount(() => {
		video_elem.onmouseover = () => {
			video_elem.play();
		};

		video_elem.onmouseleave = () => {
			video_elem.pause();
		};

		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(`http://localhost:8080/hls/${stream?.username}.m3u8`);
			hls.attachMedia(video_elem);
			hls.on(Hls.Events.ERROR, (event, data) => {
				console.error('HLS.js error:', data);
			});
		} else if (video_elem.canPlayType('application/vnd.apple.mpegurl')) {
			video_elem.src = `http://localhost:8080/rtmp/hls/${stream?.username}.m3u8`;
		}
	});

    function gotoLink() {
        window.location.replace(`/${stream.username}`);
    }
</script>

<a href="/{stream.username}">
<div class="hover:bg-black-trans mb-4 flex cursor-pointer items-start justify-start gap-2 p-2">
	<video width="250" bind:this={video_elem} muted class="rounded"></video>
	<div class="w-0">
		<span class="relative right-16 top-1 bg-red-400 px-2 text-sm font-bold text-white">LIVE</span>
	</div>
	<h1 class="text-3xl font-bold">{stream?.username}</h1>
</div>
</a>
