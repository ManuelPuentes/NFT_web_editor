<script>
	import { linear } from 'svelte/easing';
	import { slide } from 'svelte/transition';

	export let folder_name = 'folder_name';

	let flag = false;

	const handleClick = () => {
		flag = !flag;
	};

	let animation_options = { duration: 200, easing: linear };

	$: folder_expanded = flag;

</script>

<div
	class="
  w-[90%]
  m-1
  p-4
  hover:bg-slate-200
  dark:hover:bg-[--primary_hover_color]
"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="truncate"
		on:click={handleClick}
		on:keyup={handleClick}
	>
		{#if folder_expanded}
			<span class="fa fa-chevron-down" />
			&nbsp
			<i class="fa-regular fa-folder-open" />
		{:else}
			<span class="fa-solid fa-chevron-right" />
			&nbsp
			<i class="fa-solid fa-folder" />
		{/if}
		&nbsp {folder_name}
	</div>

	{#if folder_expanded}
		<div
			class="
      mx-0 my-auto
      p-1
    "
			transition:slide={animation_options}
		>
			<slot>
				<div class="truncate">&nbsp &nbsp empty folder</div>
			</slot>
		</div>
	{/if}
</div>
