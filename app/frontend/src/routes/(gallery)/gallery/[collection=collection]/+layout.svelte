<script lang="ts">
	import '../../../../app.css';
	import { DarkMode } from 'flowbite-svelte';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';

	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-lg p-2.5  right-4 top-2 z-50';
	import Avatar from 'svelte-boring-avatars';

	import { page } from '$app/stores';
	let collection_name: string = $page.params.collection;
</script>

<div
	class="
	flex
	h-screen
	w-screen
	flex-col overflow-x-hidden
"
>
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
			<NavLi href={`/editor/${collection_name}`}>Editor</NavLi>
			<NavLi href={`/gallery/${collection_name}`}>Generate</NavLi>
			<NavLi href="/docs">Docs</NavLi>
		</NavUl>
		<DarkMode btnClass={darkmodebtn} />
	</Navbar>

	<slot />
</div>
