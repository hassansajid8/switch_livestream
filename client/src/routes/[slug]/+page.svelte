<script lang="ts">
	import { onMount } from 'svelte';
	import Hls from 'hls.js';
	import Chat from '../../components/Chat.svelte';
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import { shared } from '$lib/shared.svelte';
	import { createToast, ToastType } from '$lib/store';

	let { data } = $props();

	let video_element: HTMLVideoElement;
	let video_container: HTMLElement;
	let msg: String = 'Loading';
	let msgType: Number = 1;
	let stream = data.username;
	let isFollowing = $state(false);
	let followbtn: HTMLButtonElement;

	console.log(data.user);

	onMount(async () => {
		if (data.isLive) {
			video_element = document.createElement('video');
			video_element.autoplay = true;
			video_element.muted = true;
			video_element.controls = true;
			video_element.width = 1000;
			video_element.style.borderRadius = '5px';

			if (Hls.isSupported()) {
				const hls = new Hls();
				hls.loadSource(`http://${page.url.hostname}/rtmp/hls/${stream}.m3u8`);
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
				video_element.src = `http://${page.url.hostname}/rtmp/hls/${stream}.m3u8`;
				video_element.addEventListener('loadedmetadata', () => {
					video_element.play();
				});
			} else {
				msg = 'HLS not suported by this browser';
				msgType = 2;
			}
		}

		if (data.user) {
			data.user.following.forEach((element) => {
				if (element.username == data.username) {
					console.log(`${data.user?.username} follows ${element.username}`);
					isFollowing = true;
				}
			});
		}
	});

	async function toggleFollow() {
		if (!shared.isAuth) {
			createToast({
				text: 'Login to follow',
				type: ToastType.WARNING
			});
			shared.showLoginDialog = true;
			return;
		}

		// toggle follow

		try {
			followbtn.disabled = true;
			const response = await fetch('/api/follow/', {
				method: 'POST',
				headers: { 'Content-Type': 'applciation/json' },
				body: JSON.stringify({
					username: data.user?.username,
					streamername: data.username,
					isFollowing: isFollowing
				})
			});

			if (!response.ok) {
				createToast({
					text: 'Cannot follow right now. Please try again later.',
					type: ToastType.ERROR
				});
				setTimeout(() => followbtn.disabled = false, 1000);
				return;
			}

			setTimeout(() => followbtn.disabled = false, 1000);
			isFollowing = !isFollowing;
		} catch (e) {
			console.log('some error occurred', e);
			createToast({
				text: 'Cannot follow right now. Please try again later.',
				type: ToastType.ERROR
			});
			setTimeout(() => followbtn.disabled = false, 1000);
		}
	}
</script>

<section class="p-4">
	{#if data.isLive}
		<div class="w-full gap-4 lg:flex">
			<div>
				<div class="flex w-fit flex-col items-end" id="video" bind:this={video_container}></div>
				<div class="flex w-full items-center justify-between p-4">
					<div class="flex items-center gap-3">
						<div class="rounded-full border-2">
							<Icon icon="bxs:game" width="32" height="32" />
						</div>
						<p class="text-accent m-0 text-3xl font-bold">{stream}</p>
					</div>
					<button
						class="bg-accent hover:bg-accent-dark w-22 cursor-pointer justify-end rounded p-2 text-white disabled:bg-gray-300"
						onclick={toggleFollow}
						bind:this={followbtn}
					>
						{isFollowing ? 'Unfollow' : 'Follow'}
					</button>
				</div>
			</div>

			<Chat {data} />
		</div>
	{:else}
		<div class="m-auto mt-20 text-center">Streamer is offline</div>
	{/if}
</section>
