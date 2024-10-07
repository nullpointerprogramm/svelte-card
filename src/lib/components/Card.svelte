<script lang="ts">
	import type { CardType } from '$lib/types';
	import { onMount } from 'svelte';

	export let cardData: CardType;

	let isImageLoading = true;
	let imageElement: HTMLImageElement;

	function handleLoad() {
		isImageLoading = false;
	}
	onMount(() => {
		//Work around: on ssr onLoad is not firing
		if (imageElement.complete) {
			handleLoad();
		}
	});
</script>

<div class="card">
	<div class="image-container">
		{#if isImageLoading}
			<div class="image-skeleton" />
		{/if}
		<img
			class="card-image"
			src={cardData.image}
			bind:this={imageElement}
			alt="Coffee"
			on:load={handleLoad}
		/>
	</div>
	<div class="card-content">
		<div class="card-header">
			<p class="origin">{cardData.origin}</p>
			<h2 class="blend-name">{cardData.blend_name}</h2>
			<p class="variety">{cardData.variety}</p>
		</div>
		<li class="notes">
			{#each cardData.notes.split(',') as note}
				<ul class="note">{note.trim()}</ul>
			{/each}
		</li>
		<div class="intensifier">{cardData.intensifier}</div>
	</div>
</div>

<style lang="postcss">
	.card {
		display: flex;
		flex-direction: column;
		width: 300px;
		background-color: rgb(255, 255, 255);
		position: relative;
		border-radius: 3%;
		overflow: hidden;
		box-shadow:
			0 10px 15px rgba(0, 0, 0, 0.1),
			0 4px 6px rgba(0, 0, 0, 0.05);
	}

	.card-content {
		padding: 10px;
	}

	.card-header {
		margin-bottom: 10px;
	}

	.origin {
		font-size: 12px;
		color: #9b9b9b;
	}

	.blend-name {
		font-size: 18px;
		margin: 5px 0;
	}
	.variety {
		font-size: 14px;
		color: #2d2d2d;
	}

	.intensifier {
		position: absolute;
		top: 10px;
		right: 10px;
		font-size: 18px;
		background-color: rgba(255, 255, 255, 0.8);
		color: black;
		padding: 2px 6px;
		border-radius: 5px;
		height: 20px;
		text-align: center;
	}

	.image-container {
		width: 100%;
		height: 200px;
		position: relative;
	}

	.card-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image-skeleton {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #e0e0e0;
	}

	.notes {
		display: flex;
		gap: 5px;
		margin-bottom: 10px;
		overflow-x: scroll;
		-webkit-overflow-scrolling: touch;
		scrollbar-width: none;
		-ms-overflow-style: none;
	}

	.note {
		text-align: center;
		background-color: #e0e0e0;
		color: black;
		padding: 5px;
		border-radius: 5px;
		font-size: 10px;
		min-width: 80px;
		text-wrap: nowrap;
	}

	.notes .note:nth-child(4n + 1) {
		background-color: rgb(255, 80, 80);
	}

	.notes .note:nth-child(4n + 2) {
		background-color: rgb(83, 83, 248);
	}

	.notes .note:nth-child(4n + 3) {
		background-color: rgb(101, 187, 101);
	}

	.notes .note:nth-child(4n + 4) {
		background-color: rgb(247, 247, 120);
	}
</style>
