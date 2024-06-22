
<script>
	import '../../app.css';
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
	import { DarkMode } from 'flowbite-svelte';
	let darkmodebtn =
		'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-lg p-2.5  right-4 top-2 z-50';
</script>

<Navbar>
	<NavBrand href="/">
		<img
			src="https://flowbite-svelte.com/images/flowbite-svelte-icon-logo.svg"
			class="me-3 h-6"
			alt="Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Flowbite</span
		>
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<!-- <NavLi href="/">Home</NavLi>
		<NavLi href="/">About</NavLi> -->
	</NavUl>
	<DarkMode btnClass={darkmodebtn} />
</Navbar>

<slot class="container" />

