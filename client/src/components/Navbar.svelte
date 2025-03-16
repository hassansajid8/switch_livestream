<script lang="ts">
    import Icon from "@iconify/svelte";
    
    let isAuth = true;
</script>


<div class="w-full flex justify-between items-center p-4 bg-secondary text-primary">
    <div class="flex items-center text-2xl font-funk">
        <div class="logo">
            <Icon icon="mdi:thunder" width="36" height="36" />
        </div>
        <p>switch</p>
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
                <a href="/" class="button p-2 px-4 text-accent border border-accent rounded hover:bg-accent hover:text-bg">
                    Login
                </a>
                <a href="/" class="button p-2 px-4 text-bg rounded bg-accent-dark hover:bg-accent">
                    Register
                </a>
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