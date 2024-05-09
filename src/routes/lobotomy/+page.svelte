<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Button } from "$lib/components/ui/button";
	import {toast} from "svelte-sonner";
	import {Send, Trash2} from "lucide-svelte";

	// Setup socket.io client
	import { io } from "socket.io-client";
	const socket = io("localhost:8080");

	socket.on("error", (data) => {
		toast.error(data);
	});

	//Lobotomy Section
	let lobotomy = "";
	socket.on("full_prompt", (message: string) => {
		lobotomy = message;
	});

	function nukeHistory() {
		socket.emit("nuke_history");
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
				<Textarea bind:value={lobotomy} disabled placeholder="Current Context" class="resize-none h-full"/>
			</Card.Content>
			<Card.Footer class="gap-2.5">
				<Button disabled variant="default">
					<Send class="mr-2 w-4 h-4" />
					Submit
				</Button>
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
				<Card.Title>System Prompt</Card.Title>
				<Card.Description>See the system prompt</Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<Textarea disabled placeholder="Current System Prompt" class="resize-none h-full"/>
			</Card.Content>
			<Card.Footer>
				<Button disabled variant="default">
					<Send class="mr-2 w-4 h-4" />
					Submit
				</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
