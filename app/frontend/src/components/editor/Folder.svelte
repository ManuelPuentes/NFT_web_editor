<script lang="ts">
	import { linear } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	import FolderCloseIcon from '$icons/folder.close.icon.svelte';
	import FolderOpenIcon from '$icons/folder.open.icon.svelte';

	export let flag = false;
	export let folder_name;

	const handleClick = (event: any) => {
		flag = !flag;
	};

	let animation_options = { duration: 200, easing: linear };

	$: folder_expanded = flag;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	on:click={handleClick}
	class="  
  w-[100%]
  truncate
  p-4
  text-left
  hover:bg-slate-200 dark:hover:bg-[--primary_color]"
>
	{#if folder_expanded}
		<FolderOpenIcon class="mr-2 inline" />{folder_name}
	{:else}
		<FolderCloseIcon class="mr-2 inline" />{folder_name}
	{/if}
</div>

{#if folder_expanded}
	<div transition:slide={animation_options}>
		<slot>
			<div>empty folder</div>
		</slot>
	</div>
{/if}
