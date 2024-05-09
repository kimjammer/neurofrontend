<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { toast } from "svelte-sonner";
	import {RefreshCcw} from "lucide-svelte";

	// Setup socket.io client
	import { io } from "socket.io-client";
	const socket = io("localhost:8080");
	socket.on("error", (data) => {
		console.log(data)
		toast.error(data);
	});

	// Request list of Hotkeys
	let hotkeys:any[] = [];
	function getHotkeys() {
		socket.emit("get_hotkeys");
	}
	socket.on("get_hotkeys", (data) => {
		hotkeys = data;
	});

	// Send hotkey
	function sendHotkey(hotkey: string) {
		socket.emit("send_hotkey", hotkey);
	}

	//Send Prop Action
	function triggerProp(prop_action: string) {
		socket.emit("trigger_prop", prop_action);
	}

	//Move Model
	function moveModel(mode: string) {
		socket.emit("move_model", mode);
	}

	getHotkeys();
</script>

<div class="w-full h-full flex border-t-2">
	<div class="max-xl:w-1/2 items-start flex flex-wrap gap-[30px] p-5 xl:p-10">
		<Card.Root class="w-[480px]">
			<Card.Header>
				<Card.Title>Trigger Hotkeys</Card.Title>
				<Card.Description>Manually trigger Vtube Studio Hotkeys</Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<div class="flex flex-wrap gap-2.5">
					{#each hotkeys as hotkey}
						<Button on:click={() => {sendHotkey(hotkey)}}>
							{hotkey}
						</Button>
					{/each}
				</div>
			</Card.Content>
			<Card.Footer>
				<Button variant="outline" on:click={getHotkeys}>
					<RefreshCcw class="mr-2 w-4 h-4" />
					Refresh
				</Button>
			</Card.Footer>
		</Card.Root>
		<Card.Root class="w-[480px]">
			<Card.Header>
				<Card.Title>Props</Card.Title>
				<Card.Description>Animate props in and out</Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<div class="flex flex-wrap gap-2.5">
					<Button on:click={() => {triggerProp("spawn_microphone")}}>
						Spawn Microphone
					</Button>
					<Button on:click={() => {triggerProp("despawn_microphone")}}>
						Despawn Microphone
					</Button>
				</div>
			</Card.Content>
		</Card.Root>
		<Card.Root class="w-[480px]">
			<Card.Header>
				<Card.Title>Move Model</Card.Title>
				<Card.Description>Move the model to preset locations</Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<div class="flex flex-wrap gap-2.5">
					<Button on:click={() => {moveModel("chat")}}>
						Chatting
					</Button>
					<Button on:click={() => {moveModel("screen")}}>
						Full Screen
					</Button>
					<Button on:click={() => {moveModel("react")}}>
						Reacting
					</Button>
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</div>
