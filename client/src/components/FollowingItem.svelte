<script lang="ts">
	import { page } from "$app/state";
	import Hls from "hls.js";
	import { onMount } from "svelte";

    export let data: any;

    let video_elem: HTMLVideoElement;

	onMount(() => {
        if(data.isLive){
		video_elem.onmouseover = () => {
			video_elem.play();
		};

		video_elem.onmouseleave = () => {
			video_elem.pause();
		};

		if (Hls.isSupported()) {
			const hls = new Hls();
			hls.loadSource(`http://${page.url.hostname}/rtmp/hls/${data?.username}.m3u8`);
			hls.attachMedia(video_elem);
			hls.on(Hls.Events.ERROR, (event, data) => {
				console.error('HLS.js error:', data);
			});
		} else if (video_elem.canPlayType('application/vnd.apple.mpegurl')) {
			video_elem.src = `http://${page.url.hostname}/rtmp/hls/${data?.username}.m3u8`;
		}
    }
	});

    function gotoLink() {
        window.location.replace(`/${data.username}`);
    }

    let thumbnail = "https://placehold.co/250x150/gray/white?text=Offline";
</script>

<div class="min-w-36 min-h-36 flex flex-col mx-4">
    {#if data.isLive}
    <a href="/{data.username}">
        <video width="250" bind:this={video_elem} muted class="rounded" preload="none"></video>
    </a>
    {:else}        
        <div id="thumbnail" class="w-[250px] h-[140px]">
        </div>
    {/if}
    <h1 class="font-bold text-accent">{data.username}</h1>
</div>

<style>
    #thumbnail {
        background: url("notlive.png");
        background-size: cover;
    }
</style>