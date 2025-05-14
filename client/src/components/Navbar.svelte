<script lang="ts">
	import Icon from '@iconify/svelte';
	import { shared } from '$lib/shared.svelte';
	import { createToast, ToastType } from '$lib/store';
	import { goto } from '$app/navigation';

	let showProfileDialog = false;

    async function logout() {
        event?.preventDefault();
		showProfileDialog = false;
        const response = await fetch("/api/logout");
        if(response.ok){
            createToast({
                type: ToastType.SUCCESS,
                text: "Logged out successfuly",
            });

			shared.isAuth = false;

        }else{
            createToast({
                type: ToastType.ERROR,
                text: "Error logging out. Please try again.",
            });
        }
    }
</script>

<div class="bg-secondary text-primary flex w-full items-center justify-between p-4">
	<div class="">
		<a href="/" class="font-funk flex items-center text-2xl">
			<div class="logo">
				<Icon icon="mdi:thunder" width="36" height="36" />
			</div>
			<p>switch</p>
		</a>
	</div>
	<div class="pr-4 flex items-center gap-4">
		{#if shared.isAuth}
		<button class="border border-accent p-2 rounded hover:bg-gray-900 hover:border-accent-dark cursor-pointer" onclick={() => shared.showLiveDetails = true}>Go Live</button>
			<div class="relative inline-block text-left">
				<div>
					<button
						type="button"
						class="inline-flex w-full justify-center cursor-pointer gap-x-1.5 text-white bg-accent p-1 rounded-full text-sm shadow-xs hover:bg-accent-dark"
						id="menu-button"
						aria-expanded="true"
						aria-haspopup="true"
						onclick={() => showProfileDialog = !showProfileDialog}
					>
                        <Icon icon="gg:profile" width="28" height="28" />
					</button>
				</div>

				{#if showProfileDialog}
					<div
						class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden"
						role="menu"
						aria-orientation="vertical"
						aria-labelledby="menu-button"
						tabindex="-1"
					>
						<div class="py-1" role="none">
							<button
								onclick={() => {shared.showAccountDetails = true; showProfileDialog = false;}}
								class="block w-full px-4 py-2 text-left text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
								role="menuitem"
								tabindex="-1"
								id="menu-item-0">Account settings</button
							>
							<form method="POST" onsubmit={logout} role="none">
								<button
									type="submit"
									class="block w-full px-4 py-2 text-left text-sm text-gray-700 cursor-pointer hover:bg-gray-200"
									role="menuitem"
									tabindex="-1"
									id="menu-item-3">Sign out</button
								>
							</form>
						</div>
					</div>
				{/if}
			</div>
		{:else}
			<div class="flex items-center justify-between gap-4 font-extralight">
				<button
					onclick={() => (shared.showLoginDialog = true)}
					class="button text-accent border-accent cursor-pointer hover:bg-accent hover:text-bg rounded border p-2 px-4"
				>
					Login
				</button>
				<button
					onclick={() => (shared.showRegisterDialog = true)}
					class="button text-bg bg-accent-dark cursor-pointer hover:bg-accent rounded p-2 px-4"
				>
					Register
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.logo {
		transition: transform 200ms ease-out;
	}

	.logo:hover {
		transform: rotateZ(-5deg) rotateY(180deg);
	}
</style>
