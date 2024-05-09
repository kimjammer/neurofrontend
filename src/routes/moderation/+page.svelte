<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Button } from "$lib/components/ui/button";
	import {toast} from "svelte-sonner";
	import {Send} from "lucide-svelte";

	import { io } from "socket.io-client";
	const socket = io("localhost:8080");
	socket.on("error", (data) => {
		toast.error(data);
	});


	let blacklist: string;
	function submitBlacklist() {
		let data = blacklist.split("\n")
		socket.emit("set_blacklist", data);
	}

	socket.on("get_blacklist", (data) => {
		console.log(data);
		blacklist = data.join("\n");
	});

	//Initalize UI
	socket.emit("get_blacklist");
</script>

<div class="w-full h-full flex border-t-2">
	<div class="h-full w-1/2 flex flex-col gap-[30px] p-5 xl:p-10 justify-start items-start">
		<Card.Root class="w-full grow flex flex-col">
			<Card.Header>
				<Card.Title>Blacklist</Card.Title>
				<Card.Description>Edit word blacklist</Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<Textarea placeholder="Current Blacklist" class="resize-none h-full" bind:value={blacklist}/>
			</Card.Content>
			<Card.Footer>
				<Button variant="default" on:click={submitBlacklist}>
					<Send class="mr-2 w-4 h-4" />
					Submit
				</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
