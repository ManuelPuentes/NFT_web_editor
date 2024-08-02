<script>
	import { Footer, FooterIcon } from 'flowbite-svelte';

	import GithubIcon from '$icons/github.icon.svelte';
</script>

<Footer footerType="socialmedia">
	<hr class="my-6 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
	<div class="sm:flex sm:items-center sm:justify-between">
		<div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-end rtl:space-x-reverse">
			<FooterIcon href="https://github.com/ManuelPuentes/NFT_web_editor">
				<GithubIcon class="inline" /> contribute
			</FooterIcon>
		</div>
	</div>
</Footer>
