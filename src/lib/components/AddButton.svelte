<script>
	export let onClick = () => {};
</script>

<button class="button" on:click={onClick}>
	<span class="plus">+</span>
</button>

<style>
	.button {
		background-color: #ff5630;
		border: none;
		border-radius: 50%;
		width: 60px;
		height: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.button:focus {
		outline: none;
	}

	.plus {
		color: white;
		font-size: 24px;
	}
</style>
