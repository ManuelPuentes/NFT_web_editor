<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import DownloadIcon from '$icons/download.icon.svelte';
	export let item: { url: string; hash: string; metadata: any };

	let flipped = false;

	const flip = () => {
		flipped = !flipped;
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class=" card flex h-fit flex-row" on:click={flip} class:flip={flipped}>
	<img src={item.url} alt={item.hash} class="aspect-auto backface-hidden" />

	<Button
		class="absolute bottom-2 right-2 self-end !p-1 backface-hidden"
		size="lg"
		color="dark"
		href={item.url}
		on:click={(e) => {
			e.stopPropagation();
		}}
	>
		<DownloadIcon class="inline" />
		<a href={item.url} download={item.hash}> </a></Button
	>

	<div
		class="back absolute flex h-[100%] w-[100%] overflow-y-auto overflow-x-hidden text-base backface-hidden dark:bg-[#282A36]"
	>
		<ul class="m-auto p-3">
			{#each Object.keys(item.metadata) as key, i}
				<li>
					<span>
						<span class="dark:text-[#8BE9FD]">{key}</span>
						<span class="dark:text-[#FF79C6]">:</span>
						<span class="dark:text-[#50FA7B]">"{item.metadata[key]}"</span>
					</span>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.card {
		transition: all 0.5s ease;
		transform-style: preserve-3d;
		cursor: pointer;
	}

	.flip {
		transform: rotateY(180deg);
	}

	.back {
		transform: rotateY(180deg);
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #f1fa8c;
		border-radius: 1000px;
	}

	/* width */
	::-webkit-scrollbar {
		width: 3px;
		height: 3px;
	}
</style>
