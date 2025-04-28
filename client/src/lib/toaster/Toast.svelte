<script lang="ts">
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import ErrorIcon from '$lib/icons/ErrorIcon.svelte';
	import InfoIcon from '$lib/icons/InfoIcon.svelte';
	import SuccessIcon from '$lib/icons/SuccessIcon.svelte';
	import WarningIcon from '$lib/icons/WarningIcon.svelte';
	import type { Snippet } from 'svelte';
	import type { EventHandler } from 'svelte/elements';
	import { fade } from 'svelte/transition';

	let {
		type = 'success',
		children,
		dismissible = true,
		dismiss
	}: { type: string; children: Snippet; dismissible: Boolean; dismiss: EventHandler } = $props();
</script>

<article class={type} transition:fade>
	<!-- icon -->
	{#if type == 'success'}
		<SuccessIcon />
	{:else if type == 'error'}
		<ErrorIcon />
	{:else if (type = 'warning')}
		<WarningIcon />
	{:else}
		<InfoIcon />
	{/if}

	<!-- text -->
	<div>
		{@render children()}
	</div>

	<!-- close button -->
	{#if dismissible}
		<button onclick={dismiss}>
			<CloseIcon width="0.75rem" />
		</button>
	{/if}
</article>

<style lang="postcss">
	article {
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		gap: 1rem;
		padding: 0.75rem;
		border-radius: 0.25rem;
		max-width: 20rem;
	}

	.success {
		background-color: rgb(20, 119, 20);
	}

	.error {
		background-color: rgb(123, 2, 2);
	}

	.info {
		background-color: rgb(86, 86, 237);
	}

	.warning {
		background-color: rgb(148, 119, 24);
	}

	button {
		color: white;
		background: transparent;
		border: 0 none;
		padding: 0;
		margin: 0 0 0 auto;
		line-height: 1;
		font-size: 1rem;
	}
</style>
