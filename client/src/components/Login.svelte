<script lang="ts">
    import Icon from "@iconify/svelte";
    import { shared } from "$lib/shared.svelte";
	import { createToast, ToastType } from "$lib/store";
	import { goto } from "$app/navigation";

    let username = '';
    let password = '';

    async function send(){
        if(!username || !password) {
            console.log("Incomplete form");
            return;
        }

        const body = {
            username,
            password
        };

        const response = await fetch('/api/login', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( body ),
        });

        if(response.status == 404){
            console.log("User not found");
            createToast({
                text: "User not found. You might want to register",
                type: ToastType.ERROR
            });
            return;
        }

        if(response.status == 401){
            console.log("Incorrect password");
            createToast({
                text: "Invalid credentials. Please try again.",
                type: ToastType.ERROR
            });
            return;
        }

        if(!response.ok){
            console.log("Some error occurred");
            createToast({
                text: "Some error occurred. Please try again.",
                type: ToastType.ERROR
            });
            return;
        }

        const result = await response.json();

        createToast({
            text: "Logged in successfully.",
            type: ToastType.SUCCESS
        });

        shared.showLoginDialog = false;
        shared.isAuth = true;
    }
</script>

<div class="w-screen h-screen bg-black-trans flex justify-center items-center absolute top-0 left-0 z-50 p-2">
    <div class="w-fit h-fit bg-white flex flex-col justify-center rounded shadow-xl">
        <div class="w-full flex justify-end h-0">
            <button class="cursor-pointer relative p-1 text-3xl hover:text-white" onclick={() => shared.showLoginDialog = false}>
                <Icon icon="iconamoon:close-fill" />
            </button>
        </div>

        <div class="flex md:flex-row flex-col-reverse">
        <div class="p-8 box">
            <h2 class="text-2xl">Login</h2>
            <form onsubmit={async () => send()} class="flex flex-col mt-8 gap-4">
                <div class="flex flex-col">
                    <label for="" class="text-sm">Username</label>
                    <input bind:value={username} type="text" class="w-64 rounded" required />
                </div>
                <div class="flex flex-col">
                    <label for="" class="text-sm">Password</label>
                    <input bind:value={password} type="password" class="w-64 rounded" required />
                </div>
                <div class="flex items-end gap-2">
                    <button type="submit" class="cursor-pointer rounded w-fit px-4 py-2 bg-accent-dark hover:bg-accent text-white">Login</button>
                    <button type="button" onclick={() => {
                        shared.showLoginDialog = false;
                        shared.showRegisterDialog = true;
                    }} class="cursor-pointer hover:underline">Create new account?</button>
                </div>
        </form>
        </div>
        </div>

    </div>
</div>

<style>

</style>
