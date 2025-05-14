<script lang="ts">
	import VideoListElement from '../components/VideoListElement.svelte';
	import { page } from '$app/state';
	import FollowingItem from '../components/FollowingItem.svelte';
	import { shared } from '$lib/shared.svelte';

	export let data: any;
	const sortedFollowers = data.user?.following.sort((a: any, b: any) => {
		return Number(b.isLive) - Number(a.isLive);
	}) || null;

	let following: String[];

	async function pingserver() {
		const response = await fetch(`http://${page.url.hostname}/server`);
		console.log(await response.json());
	}
</script>

{#await data}
	loading
{:then} 

<div class="">
	<div class="">
		{#if shared.isAuth}
		<div class="p-8">
			<h1 class="text-lg font-bold mb-4 bg-gray-300 p-2 px-4">Following</h1>
			<div class="flex overflow-x-auto">
				{#each sortedFollowers as follow}
					<FollowingItem data={follow} />
				{/each}
			</div>
		</div>
		{/if}

		{#if !shared.isAuth && data.streams.length > 0}
			<div class="flex p-8">
				<div class="">
					<p class="text-md font-bold p-3 bg-gray-300">Featured Channel</p>
				</div>
				<div>
					<VideoListElement stream={data.streams[0]} />
				</div>
			</div>
		{/if}
	<div class="p-8">
<!-- 		<button class="bg-blue-500 cursor-pointer p-4 " onclick={pingserver}>Ping server</button> -->
		<h1 class="text-lg font-bold mb-4 bg-gray-300 p-2 px-4">Live Channels</h1>
		<div class="">
			{#each data.streams as stream}
				<VideoListElement stream = {stream} />				
			{/each}
		</div>
	</div>
	</div>

</div>

{/await}



<style>
</style>