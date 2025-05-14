<script lang="ts">
	import Icon from '@iconify/svelte';
	import { shared } from '$lib/shared.svelte';
	import { createToast, ToastType } from '$lib/store';

	const { data } = $props();
	let streamkey = $state('-------');
	let deletebtn: HTMLButtonElement;

	async function fetchkey() {
		const response = await fetch('/api/fetchkey', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: data.user.username
			})
		});

		if (!response.ok) {
			createToast({
				type: ToastType.ERROR,
				text: 'Some error occurred. Try again later'
			});
		}

		streamkey = (await response.json()).streamkey;
	}

    function hidekey(){
        streamkey = "-------";
    }

    async function copykey(){
        try{
            await navigator.clipboard.writeText(streamkey);

            createToast({
                type: ToastType.SUCCESS,
                text: "Streamkey copied to clipboard"
            })
        } catch(e) {
            console.log("error copying", e);
        }
    }

	async function deleteacc () {
		deletebtn.disabled = true;
		setTimeout(() => {
			createToast({
				text: "Cannot delete account right now. Please try again later",
				type: ToastType.ERROR
			});
			deletebtn.disabled = false;
		}, 1500);
	}
</script>

<div
	class="bg-black-trans absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center p-2"
>
	<div class="flex h-fit w-1/2 flex-col justify-center rounded bg-white shadow-xl">
		<div class="flex h-0 w-full justify-end">
			<button
				class="relative cursor-pointer p-1 text-3xl text-gray-400 hover:text-gray-800"
				onclick={() => (shared.showAccountDetails = false)}
			>
				<Icon icon="iconamoon:close-fill" />
			</button>
		</div>

		<div class="box p-8 text-center">
			<h2 class="text-center text-2xl">Account Details</h2>
			<div class="mt-8 text-left">
				<div class="my-4 flex items-center justify-between">
					<p class="text-md w-1/4">Username</p>
					<div class="flex w-72 items-center">
						<input
							type="text"
							class="flex-1 rounded-l border-r-0"
							disabled
							value={data.user.username}
						/>
						<button class="cursor-pointer rounded-r border p-2 hover:bg-gray-200">
							<Icon icon="mynaui:edit" width="24" height="24" />
						</button>
					</div>
				</div>

				<div class="my-4 flex items-center justify-between">
					<p class="text-md w-1/4">Stream Key</p>
					<div class="flex min-w-72 items-center">
						<input type="text" class="flex-1 rounded-l border-r-0 cursor-copy" readonly onclick={copykey}  bind:value={streamkey} />
						{#if streamkey == '-------'}
							<button
								class="cursor-pointer rounded-r border p-2 hover:bg-gray-200"
								onclick={fetchkey}
							>
								Show
							</button>
						{:else}
							<button
								class="cursor-pointer rounded-r border p-2 hover:bg-gray-200"
								onclick={hidekey}
							>
								Hide
							</button>
						{/if}
					</div>
				</div>

				<div class="my-4 flex items-center justify-between">
					<p class="text-md w-1/4">Followers</p>
					<div class="flex min-w-72 items-center">
						{data.user.followinfo.followers.length - 1}
					</div>
				</div>
				<div class="my-4 flex items-center justify-between">
					<p class="text-md w-1/4">Following</p>
					<div class="flex min-w-72 items-center">
						{data.user.followinfo.following.length - 1}
					</div>
				</div>
			</div>
			<div class="text-right">
				<button class="bg-red-700 p-2 rounded text-white hover:bg-red-800 cursor-pointer disabled:bg-gray-300" onclick={deleteacc} bind:this={deletebtn}>Delete Account</button>
			</div>
		</div>

	</div>
</div>

<style>
</style>
