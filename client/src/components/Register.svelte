<script lang="ts">
    import Icon from "@iconify/svelte";
    import { shared } from "$lib/shared.svelte";
	import { createToast, ToastType } from "$lib/store";

    let username = "";
    let password = "";
    let re_password = "";

    async function send() {
        if(!username || !password || !re_password){
            console.log("Fill the entire form!");
            createToast({
                type: ToastType.WARNING,
                text: "All fields are required."
            });
            return;
        }

        if(password != re_password){
            createToast({
                type: ToastType.WARNING,
                text: "Passwords do not match."
            });
            return;
        }

        const body = {
            username: username,
            password: password,
        };

        try{
            const response = await fetch('/api/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify( body ),
            });

            if(!response){
                createToast({
                    type: ToastType.ERROR,
                    text: "Some error occurred. Please Try again"
                });
                return;
            }

            if(response.status == 403) {
                createToast({
                    type: ToastType.ERROR,
                    text: "User already exists. Please Login."
                });
                return;
            }

            if(!response.ok) {
                createToast({
                    type: ToastType.ERROR,
                    text: "Some error occurred. Please Try again"
                });
                return;
            }
    
            createToast({
                    type: ToastType.SUCCESS,
                    text: "Registered Successfully. Please Login to continue."
            });

            shared.showRegisterDialog = false;
            shared.showLoginDialog = true;

        } catch (e) {
            createToast({
                    type: ToastType.ERROR,
                    text: "Some error occurred. Please Try again"
            });
            return;
        }
    }
</script>

<div
	class="bg-black-trans absolute top-0 left-0 z-50 flex h-screen w-screen items-center justify-center p-2"
>
	<div class="flex h-fit w-fit flex-col justify-center rounded bg-white shadow-xl">
		<div class="flex h-0 w-full justify-end">
			<button
				class="relative cursor-pointer p-1 text-3xl hover:text-white"
				onclick={() => (shared.showRegisterDialog = false)}
			>
				<Icon icon="iconamoon:close-fill" />
			</button>
		</div>

		<div class="flex flex-col-reverse md:flex-row">
			<div class="box p-8">
				<h2 class="text-2xl">Register</h2>
				<form onsubmit={async () => send()} class="mt-8 flex flex-col gap-4">
					<div class="flex flex-col">
						<label for="" class="text-sm">Create a Username</label>
						<input bind:value={username} type="text" class="w-64 rounded" required />
					</div>
					<div class="flex flex-col">
						<label for="" class="text-sm">Create a Password</label>
						<input bind:value={password} type="password" class="w-64 rounded" required />
					</div>
					<div class="flex flex-col">
						<label for="" class="text-sm">Confirm Password</label>
						<input bind:value={re_password} type="password" class="w-64 rounded" required />
					</div>
					<div class="flex items-end gap-2">
						<button
							type="submit"
							class="bg-accent-dark hover:bg-accent w-fit cursor-pointer rounded px-4 py-2 text-white"
							>Register</button
						>
						<button
							type="button"
							onclick={() => {
								shared.showLoginDialog = true;
								shared.showRegisterDialog = false;
							}}
							class="cursor-pointer hover:underline">Login instead</button
						>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<style>
</style>
