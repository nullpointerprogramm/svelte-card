<script lang="ts">
	import AddButton from '$lib/components/AddButton.svelte';
	import CardList from '$lib/components/CardList.svelte';
	import LoadingIcon from '$lib/components/LoadingIcon.svelte';
	import { errorToast } from '$lib/custom-toast.js';
	import { onMount } from 'svelte';

	export let data;
	$: listData = data.listData;
	$: isLoading = data.isLoading;

	data.error.subscribe((value) => {
		if (value) {
			errorToast(value.message);
		}
	});

	let cardList: CardList;

	let timeoutId: number;

	function setFetchTimeout() {
		deleteTimeout();
		timeoutId = setTimeout(() => handleClick(), 30_000);
	}

	function deleteTimeout() {
		if (timeoutId) clearTimeout(timeoutId);
	}

	onMount(() => {
		setFetchTimeout();
		return () => deleteTimeout();
	});

	async function handleClick() {
		if ($isLoading) return;
		try {
			await data.fetchOneMoreCard();
			cardList?.scrollToLast();
		} catch (error) {
			console.error('Failed to fetch cards:', error);
		} finally {
			setFetchTimeout();
		}
	}
</script>

{#if listData}
	<div class="content">
		<CardList listData={$listData} bind:this={cardList} />
		{#if !$isLoading}
			<AddButton onClick={handleClick} />
		{:else}
			<LoadingIcon />
		{/if}
	</div>
{/if}

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 10px;
	}
</style>
