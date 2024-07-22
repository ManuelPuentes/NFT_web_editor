<script>
	import { Timeline, TimelineItem, Button } from 'flowbite-svelte';

	import Step1 from '$components/docs/steps/Step1.svelte';
	import Step2 from '$components/docs/steps/Step2.svelte';
	import Step3 from '$components/docs/steps/Step3.svelte';
	import Step4 from '$components/docs/steps/Step4.svelte';
	import Step5 from '$components/docs/steps/Step5.svelte';
</script>

<div class={$$restProps.class || ''}>
	<Timeline>
		<Step1 />
		<Step2 />
		<Step3 />
		<Step4 />
		<Step5 />
	</Timeline>
</div>
