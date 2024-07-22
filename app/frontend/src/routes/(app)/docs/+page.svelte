<script>
	import Docs from '$components/docs/Docs.svelte';
	import Heading from '$components/docs/Heading.svelte';
	import Footer from '$components/docs/Footer.svelte';
</script>

<div class="flex h-screen w-screen justify-center">
	<div class="m-4 w-[40%] max-w-[600px]">
		<Heading />
		<Docs class="h-fit  w-[100%] " />
	<Footer/>

	</div>

</div>
