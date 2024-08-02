<script>
	import Docs from '$components/docs/Docs.svelte';
	import Heading from '$components/docs/Heading.svelte';
	import Footer from '$components/docs/Footer.svelte';
</script>

<div class="flex h-screen w-screen justify-center dark:bg-gray-800">
	<div class="m-4 h-[90%] w-[40%] max-w-[600px] overflow-y-auto">
		<Heading />
		<Docs class="  w-[100%]" />
		<Footer />
	</div>
</div>
