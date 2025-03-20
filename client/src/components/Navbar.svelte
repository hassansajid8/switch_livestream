<script lang="ts">
    import Icon from "@iconify/svelte";
    import { shared } from "$lib/shared.svelte";
    
    let isAuth = false;
</script>


<div class="w-full flex justify-between items-center p-4 bg-secondary text-primary">
    <div class="">
        <a href="/" class="flex items-center text-2xl font-funk">
            <div class="logo">
                <Icon icon="mdi:thunder" width="36" height="36" />
            </div>
            <p>switch</p>
        </a>
    </div>
    <div class="pr-4">
        {#if isAuth}
            <div class="flex items-center">
                <button class="hover:cursor-pointer text-bg bg-accent rounded-full">
                    <Icon icon="gg:profile" width="36" height="36" />
                </button>
            </div>
        {:else}
            <div class="flex items-center justify-between gap-4 font-extralight">
                <button onclick={() => shared.showLoginDialog = true} class="button p-2 px-4 text-accent border border-accent rounded hover:bg-accent hover:text-bg">
                    Login
                </button>
                <button onclick={() => shared.showRegisterDialog = true} class="button p-2 px-4 text-bg rounded bg-accent-dark hover:bg-accent">
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

    .logo:hover{
        transform: rotateZ(-5deg) rotateY(180deg);
    }
</style>