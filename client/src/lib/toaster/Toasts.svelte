<script lang="ts">
	import { dismissToast, toasts } from "$lib/store";
	import Toast from "./Toast.svelte";

</script>

{#if $toasts}
<section>
  {#each $toasts as toast (toast.id)}
  <Toast
    type={toast.type}
    dismissible={toast.dismissible}
    dismiss={() => dismissToast(toast.id)}> {toast.text} </Toast>   
  {/each}
</section>
{/if}

<style lang="postcss">
    section {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    margin-top: 1rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 0.5rem;
    z-index: 1000;
    padding: 1rem;
    padding-bottom: 3rem;
  }
</style>