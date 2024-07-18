<script lang="ts">
	import Avatar from 'svelte-boring-avatars';
	import { Heading } from 'flowbite-svelte';
	import { collection_name } from '$stores/web_app_state';
</script>

<div
	class=" items-centerp-4 background mb-4 mt-4 flex min-w-[70%] flex-col items-center justify-center p-4 text-center"
>
	<Avatar
		size={200}
		name={$collection_name}
		variant="beam"
		colors={['#19381fff', '#eee82cff', '#91cb3eff', '#53a548ff', '#4c934cff']}
	/>
	<Heading tag="h1" class="mb-4" customSize="text-4xl font-extrabold  md:text-5xl lg:text-6xl"
		>Luchamask</Heading
	>
</div>
