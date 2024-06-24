<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { SuperValidated } from 'sveltekit-superforms';
	import { Spinner } from 'flowbite-svelte';

	type T = Record<string, unknown>;
	export let data: SuperValidated<T>;
	export let dataType: 'form' | 'json' = 'form';
	export let invalidateAll = true; // set to false to keep form data using muliple forms on a page

	export const superform = superForm(data, {
		dataType,
		invalidateAll,
		onUpdated({ form }) {
			if (form.valid) {
			}
		},
		taintedMessage: 'are you sure you want to leave'
	});

	const { form, message, delayed, errors, allErrors, enhance, constraints, submitting } = superform;
</script>

<form method="POST" use:enhance {...$$restProps}>
	<slot
		{superform}
		form={$form}
		message={$message}
		errors={$errors}
		allErrors={$allErrors}
		delayed={$delayed}
		constraints={$constraints}
	/>

	{#if $submitting }
		<Spinner size="6"/>
	{/if}
</form>
