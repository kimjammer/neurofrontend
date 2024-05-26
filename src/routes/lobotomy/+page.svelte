<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Button } from "$lib/components/ui/button";
	import {Send, Trash2} from "lucide-svelte";
	import {Input} from "$lib/components/ui/input";
	import { socket, lobotomy, customPrompt, priority } from "../socketio";

	function nukeHistory() {
		socket.emit("nuke_history");
	}

	function submitCustomPrompt() {
		socket.emit("set_custom_prompt", { "prompt": $customPrompt + "\n", "priority": $priority });
	}
</script>

<div class="w-full h-full flex border-t-2">
	<div class="h-full w-1/2 flex flex-col gap-[30px] p-5 xl:p-10 justify-start items-start">
		<Card.Root class="w-full grow flex flex-col">
			<Card.Header>
				<Card.Title>Lobotomy</Card.Title>
				<Card.Description>See the current context</Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<Textarea bind:value={$lobotomy} disabled placeholder="Current Context" class="resize-none h-full"/>
			</Card.Content>
			<Card.Footer class="gap-2.5">
				<Button variant="default" on:click={nukeHistory}>
					<Trash2 class="mr-2 w-4 h-4" />
					Nuke History
				</Button>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="h-full w-1/2 flex flex-col gap-[30px] p-5 xl:p-10 justify-start items-start">
		<Card.Root class="w-full grow flex flex-col">
			<Card.Header>
				<Card.Title>Custom Prompt</Card.Title>
				<Card.Description>Set a custom prompt to be injected</Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<Textarea placeholder="Current Custom Prompt" class="resize-none h-full" bind:value={$customPrompt}/>
			</Card.Content>
			<Card.Footer>
				<div class="flex justify-between w-full">
					<div class="flex gap-2.5 align-baseline">
						<div class="text-lg font-semibold">Priority:</div>
						<Input placeholder="priority" class="w-1/4" bind:value={$priority}/>
					</div>
					<Button variant="default" on:click={submitCustomPrompt}>
						<Send class="mr-2 w-4 h-4" />
						Submit
					</Button>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
