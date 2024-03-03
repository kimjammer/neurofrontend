<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Button } from "$lib/components/ui/button";
	import { Toggle } from "$lib/components/ui/toggle";
	import { Input } from "$lib/components/ui/input";
	import { Progress } from "$lib/components/ui/progress";
	import { Label } from "$lib/components/ui/label";
	import { Switch } from "$lib/components/ui/switch";
	import * as Select from "$lib/components/ui/select";

	import {BrainCircuit, CircleOff, VolumeX, MicOff, Move, Play, Sparkles, Send} from "lucide-svelte";

	//TODO: Placeholder for Song Select
	const fruits = [
		{ value: "apple", label: "Apple" },
		{ value: "banana", label: "Banana" },
		{ value: "blueberry", label: "Blueberry" },
		{ value: "grapes", label: "Grapes" },
		{ value: "pineapple", label: "Pineapple" }
	];
</script>

<div class="w-full h-full flex border-t-2">
	<div class="max-xl:w-1/2 flex flex-col gap-[30px] p-5 xl:p-10">
		<Card.Root class="xl:w-[480px] grow flex flex-col">
			<Card.Header>
				<Card.Title>Current Message</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<Textarea placeholder="Type your message here." class="resize-none h-full"/>
			</Card.Content>
			<Card.Footer>
				<Button variant="destructive">Abort Message</Button>
			</Card.Footer>
		</Card.Root>
		<Card.Root class="xl:w-[480px] grow flex flex-col">
			<Card.Header>
				<Card.Title>Next Message</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<Textarea placeholder="Type your message here." class="resize-none h-full"/>
			</Card.Content>
			<Card.Footer>
				<Button variant="destructive">Cancel Message</Button>
			</Card.Footer>
		</Card.Root>
	</div>

	<div class="max-xl:w-1/2 items-start flex flex-wrap gap-[30px] p-5 xl:p-10">
		<Card.Root class="w-[480px]">
			<Card.Header>
				<Card.Title>Signals</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content>
				<Toggle aria-label="Toggle AI Thinking">
					<BrainCircuit class="mr-2 h-4 w-4" />
					AI Thinking
				</Toggle>
				<Toggle aria-label="Toggle AI Speaking">
					<BrainCircuit class="mr-2 h-4 w-4" />
					AI Speaking
				</Toggle>
				<Toggle aria-label="Toggle Human Speaking">
					<BrainCircuit class="mr-2 h-4 w-4" />
					Human Speaking
				</Toggle>
			</Card.Content>
			<Card.Footer class="flex gap-2.5">
				<div class="text-lg font-semibold">Patience:</div>
				<Input disabled placeholder="0 s" class="w-1/3" />
				<Progress value={50} />
			</Card.Footer>
		</Card.Root>

		<Card.Root class="w-[480px]">
			<Card.Header>
				<Card.Title>Twitch Chat</Card.Title>
				<Card.Description>Messages being fed to the LLM</Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<Textarea placeholder="Type your message here." class="resize-none h-full"/>
			</Card.Content>
			<Card.Footer class="fl ex gap-2.5">
				<Label for="twitchSwitch">Enable Twitch Chat: </Label>
				<Switch id="twitchSwitch"/>
			</Card.Footer>
		</Card.Root>

		<Card.Root class="w-[480px]">
			<Card.Header>
				<Card.Title>Controls</Card.Title>
				<Card.Description>Card Description</Card.Description>
			</Card.Header>
			<Card.Content class="grid grid-cols-2 gap-2.5">
				<Button>
					<CircleOff class="mr-2 h-4 w-4" />
					Disable LLM
				</Button>
				<Button>
					<VolumeX class="mr-2 h-4 w-4" />
					Disable TTS
				</Button>
				<Button>
					<MicOff class="mr-2 h-4 w-4" />
					Disable STT
				</Button>
				<Button>
					<Move class="mr-2 h-4 w-4" />
					Disable Movement
				</Button>
			</Card.Content>
			<Card.Footer>
			</Card.Footer>
		</Card.Root>

		<Card.Root class="w-[480px]">
			<Card.Header>
				<Card.Title>Sing</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content class="flex gap-2.5">
				<Select.Root portal={null}>
					<Select.Trigger class="w-[180px]">
						<Select.Value placeholder="Select a song"/>
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.Label>Fruits</Select.Label>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label}>
									{fruit.label}
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
					<Select.Input name="favoriteFruit" />
				</Select.Root>

				<Button>
					<Play class="mr-2 h-4 w-4" />
					Play
				</Button>
			</Card.Content>
			<Card.Footer>
			</Card.Footer>
		</Card.Root>

		<Card.Root class="w-[480px]">
			<Card.Header>
				<Card.Title>Behavior</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content>
				<Button>
					<Sparkles class="mr-2 h-4 w-4" />
					Fun Fact
				</Button>
			</Card.Content>
			<Card.Footer class="flex gap-2.5">
				<Input placeholder="New Topic"/>
				<Button size="icon">
					<Send class="h-4 w-4" />
				</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
