<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import * as Collapsible from "$lib/components/ui/collapsible";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import { Button } from "$lib/components/ui/button";
	import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
	import {Input} from "$lib/components/ui/input";
	import {Trash2, FileDown, FileUp, Search, Send} from "lucide-svelte";

	import { socket, memories, searchQuery } from "../socketio";

	function getMemories() {
		socket.emit("get_memories", $searchQuery);
	}

	function clearShortTerm() {
		socket.emit("clear_short_term");
	}

	function deleteMemory(id: string) {
		socket.emit("delete_memory", id);
	}

	function importJSON() {
		socket.emit("import_json");
	}

	function exportJSON() {
		socket.emit("export_json");
	}

	let newMemory = "";
	function createMemory() {
		socket.emit("create_memory", newMemory);
		newMemory = "";
	}
</script>

<div class="w-full h-full flex border-t-2">
	<div class="h-full w-1/2 flex flex-col gap-[30px] p-5 xl:p-10 justify-start items-start">
		<Card.Root class="w-full grow flex flex-col">
			<Card.Header>
				<Card.Title>Memories</Card.Title>
				<Card.Description>Edit memories</Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<div class="flex gap-2.5">
					<Input placeholder="search query (optional)" class="" bind:value={$searchQuery}/>
					<Button variant="default" on:click={getMemories}>
						<Search class="mr-2 w-4 h-4" />
						Search
					</Button>
				</div>
				<Separator class="my-2" />
				<ScrollArea class="h-[500px]">
					{#each $memories as memory}
						<div class="flex justify-between">
							<Collapsible.Root>
								<Collapsible.Trigger>
									{memory.document.slice(0,80)}
								</Collapsible.Trigger>
								<Collapsible.Content>
									{memory.document.slice(80)}
								</Collapsible.Content>
							</Collapsible.Root>
							<Button variant="outline" size="icon" on:click={() => {deleteMemory(memory.id)}}>
								<Trash2 class="w-4 h-4" />
							</Button>
						</div>
						<Separator class="my-2" />
					{/each}
				</ScrollArea>
			</Card.Content>
			<Card.Footer>
				<div class="flex gap-2.5">
					<Button variant="destructive" on:click={clearShortTerm}>
						<Trash2 class="mr-2 w-4 h-4" />
						Clear Short-Term
					</Button>
					<Button variant="default" on:click={importJSON}>
						<FileDown class="mr-2 w-4 h-4" />
						Import from JSON
					</Button>
					<Button variant="default" on:click={exportJSON}>
						<FileUp class="mr-2 w-4 h-4" />
						Export to JSON
					</Button>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="h-full w-1/2 flex flex-col gap-[30px] p-5 xl:p-10 justify-start items-start">
		<Card.Root class="w-full  flex flex-col">
			<Card.Header>
				<Card.Title>Add Memory</Card.Title>
				<Card.Description>Add new short-term memories</Card.Description>
			</Card.Header>
			<Card.Content>
				<Input placeholder="Enter memory" class="w-full" bind:value={newMemory}/>
			</Card.Content>
			<Card.Footer>
				<Button variant="default" on:click={createMemory}>
					<Send class="mr-2 w-4 h-4" />
					Submit
				</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
