<script>
	import { Footer, FooterIcon } from 'flowbite-svelte';
	import { GithubSolid } from 'flowbite-svelte-icons';
</script>

<Footer footerType="socialmedia">
	<hr class="my-6 border-gray-200 sm:mx-auto lg:my-8 dark:border-gray-700" />
	<div class="sm:flex sm:items-center sm:justify-between">
		<div class="mt-4 flex space-x-6 sm:mt-0 sm:justify-end rtl:space-x-reverse">
			<FooterIcon href="https://github.com/ManuelPuentes/NFT_web_editor">
				<GithubSolid
					class="h-5 w-5 text-gray-500 hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
				/>
			</FooterIcon>
		</div>
	</div>
</Footer>
