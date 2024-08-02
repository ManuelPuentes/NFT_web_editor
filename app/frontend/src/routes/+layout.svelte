<script lang="ts">
	import '../app.css';
	import { DarkMode } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

	import Avatar from 'svelte-boring-avatars';

	import { page } from '$app/stores';

	let collection_name;
	let route: string | null;

	$: collection_name = $page.params.collection ? $page.params.collection : 'SVGeditor';
	$: route = $page.route.id;
</script>

<Navbar>
	<NavBrand>
		<div class="mr-3">
			<Avatar
				size={40}
				name={collection_name}
				variant="beam"
				colors={['#19381fff', '#eee82cff', '#91cb3eff', '#53a548ff', '#4c934cff']}
			/>
		</div>

		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
			>{collection_name}</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/">Home</NavLi>
		{#if route == '/editor/[collection=collection]'}
			<NavLi href={`/gallery/${collection_name}`}>Gallery</NavLi>
			<NavLi href={`/generate/${collection_name}`}>Generate</NavLi>
		{/if}

		{#if route == '/gallery/[collection=collection]'}
			<NavLi href={`/editor/${collection_name}`}>Editor</NavLi>
			<NavLi href={`/generate/${collection_name}`}>Generate</NavLi>
		{/if}

		{#if route == '/generate/[collection=collection]'}
			<NavLi href={`/editor/${collection_name}`}>Editor</NavLi>
			<NavLi href={`/gallery/${collection_name}`}>Gallery</NavLi>
		{/if}

		<NavLi href="/docs">Docs</NavLi>
	</NavUl>
	<DarkMode />
</Navbar>

<slot />
