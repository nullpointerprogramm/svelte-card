<script lang="ts">
	import { tick } from 'svelte';
	import Card from './Card.svelte';
	import type { CardType } from '$lib/types';

	export let listData: CardType[];
	let lastItem: HTMLElement;

	export async function scrollToLast() {
		await tick();
		lastItem?.scrollIntoView({ behavior: 'smooth' });
	}
</script>

<ul class="card-list">
	{#each listData as cardData (cardData.uid)}
		<li class="list-item" bind:this={lastItem}>
			<Card {cardData} />
		</li>
	{/each}
</ul>

<style>
	.card-list {
		display: flex;
		flex-direction: column;
	}
	.card-list .list-item {
		margin-bottom: 20px;
	}
</style>
