<script lang="ts">
	import { shared } from '$lib/shared.svelte';
	import Icon from '@iconify/svelte';
</script>

<div
	class="bg-black-trans absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center p-2"
>
	<div class="flex h-fit w-1/2 flex-col justify-center rounded bg-white shadow-xl">
		<div class="flex h-0 w-full justify-end">
			<button
				class="relative cursor-pointer p-1 text-3xl text-gray-400 hover:text-gray-800"
				onclick={() => (shared.showLiveDetails = false)}
			>
				<Icon icon="iconamoon:close-fill" />
			</button>
		</div>

		<div class="box p-8 text-center">
			<h2 class="text-left text-2xl font-bold">Go Live!</h2>
			<div class="mt-8 text-left">
				<div class="my-4">
					<p class="text-md">Follow these steps to start streaming</p>
                    <ul class="list-disc pl-4">
                        <li>Go to Account Details from the menu on the top right</li>
                        <li>Reveal and copy your stream key</li>
                        <li>You can use any streaming software. We recommend OBS Studio</li>
                        <li>Enter these details in the stream section of your software</li>
                        <ul class="list-disc pl-4">
                            <li>Server: rtmp://localhost:1935/live</li>
                            <li>Stream key: [your_username]?key=[your_stream_key]</li>
                        </ul>
                        <li>You can now start streaming</li>
                        <li>Contact us if you have any trouble streaming</li>  
                    </ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
</style>
