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
	import { type Props } from "$lib/components/ui/button/.";

	import {BrainCircuit, CircleOff, VolumeX, MicOff, Move, Play, Sparkles, Send, XOctagon, Pause, PlayCircle} from "lucide-svelte";

	import { socket,
		currentMessage,
		nextMessage,
		AI_thinking,
		AI_speaking,
		human_speaking,
		patiencePercent,
		total_time,
		twitchChat,
		twitchChatEnabled,
		LLMEnabled,
		TTSEnabled,
		STTEnabled,
		multimodalEnabled,
		movementEnabled,
		selectedAudio,
		songs} from "./socketio";

	//Current Message Section
	function abortMessage() {
		socket.emit("abort_current_message");
	}

	//Next Message Section
	function cancelMessage() {
		socket.emit("cancel_next_message");
	}

	//Twitch Chat Section
	function toggleTwitchChat() {
		twitchChatEnabled.set(! $twitchChatEnabled);
		if ($twitchChatEnabled) {
			socket.emit("enable_twitch");
		} else {
			socket.emit("disable_twitch");
		}
	}

	//Controls Section
	let LLMVariant: Props['variant'];
	$: LLMVariant = $LLMEnabled ? "default" : "destructive";
	let TTSVariant: Props['variant']
	$: TTSVariant = $TTSEnabled ? "default" : "destructive";
	let STTVariant: Props['variant'];
	$: STTVariant = $STTEnabled ? "default" : "destructive";
	let movementVariant: Props['variant'];
	$: movementVariant = $movementEnabled ? "default" : "destructive";
	function toggleLLM() {
		LLMEnabled.set(! $LLMEnabled);
		if ($LLMEnabled) {
			socket.emit("enable_LLM");
		} else {
			socket.emit("disable_LLM");
		}
	}
	function toggleTTS() {
		TTSEnabled.set(! $TTSEnabled);
		if ($TTSEnabled) {
			socket.emit("enable_TTS");
		} else {
			socket.emit("disable_TTS");
		}
	}
	function toggleSTT() {
		STTEnabled.set(! $STTEnabled);
		if ($STTEnabled) {
			socket.emit("enable_STT");
		} else {
			socket.emit("disable_STT");
		}
	}
	function toggleMovement() {
		movementEnabled.set(! $movementEnabled);
		if ($movementEnabled) {
			socket.emit("enable_movement");
		} else {
			socket.emit("disable_movement");
		}
	}
	function toggleMultimodal() {
		multimodalEnabled.set(! $multimodalEnabled);
		if ($multimodalEnabled) {
			socket.emit("enable_multimodal");
		} else {
			socket.emit("disable_multimodal");
		}
	}

	//Sing section
	function playAudio() {
		socket.emit("play_audio", $selectedAudio.value);
	}
	function pauseAudio() {
		socket.emit("pause_audio");
	}
	function resumeAudio() {
		socket.emit("resume_audio");
	}
	function abortAudio() {
		socket.emit("abort_audio");
	}

	//Behavior Section
	function funFact() {
		socket.emit("fun_fact");
	}
	let topic = "";
	function newTopic() {
		socket.emit("new_topic", topic);
		topic = "";
	}
</script>

<div class="w-full h-full flex border-t-2">
	<div class="max-xl:w-1/2 flex flex-col gap-[30px] p-5 xl:p-10">
		<Card.Root class="xl:w-[480px] grow flex flex-col">
			<Card.Header>
				<Card.Title>Current Message</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<Textarea disabled placeholder="Current Message" class="resize-none h-full" bind:value={$currentMessage}/>
			</Card.Content>
			<Card.Footer>
				<Button variant="destructive" on:click={abortMessage}>Abort Message</Button>
			</Card.Footer>
		</Card.Root>
		<Card.Root class="xl:w-[480px] grow flex flex-col">
			<Card.Header>
				<Card.Title>Next Message</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<Textarea disabled placeholder="Next message" class="resize-none h-full" bind:value={$nextMessage}/>
			</Card.Content>
			<Card.Footer>
				<Button variant="destructive" on:click={cancelMessage}>Cancel Message</Button>
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
				<Toggle disabled aria-label="Toggle AI Thinking" bind:pressed={$AI_thinking}>
					<BrainCircuit class="mr-2 h-4 w-4" />
					AI Thinking
				</Toggle>
				<Toggle disabled aria-label="Toggle AI Speaking" bind:pressed={$AI_speaking}>
					<BrainCircuit class="mr-2 h-4 w-4" />
					AI Speaking
				</Toggle>
				<Toggle disabled aria-label="Toggle Human Speaking" bind:pressed={$human_speaking}>
					<BrainCircuit class="mr-2 h-4 w-4" />
					Human Speaking
				</Toggle>
			</Card.Content>
			<Card.Footer class="flex gap-2.5">
				<div class="text-lg font-semibold">Patience:</div>
				<Input disabled placeholder="0 s" class="w-1/3" bind:value={$total_time}/>
				<Progress bind:value={$patiencePercent} />
			</Card.Footer>
		</Card.Root>

		<Card.Root class="w-[480px]">
			<Card.Header>
				<Card.Title>Twitch Chat</Card.Title>
				<Card.Description>Messages being fed to the LLM</Card.Description>
			</Card.Header>
			<Card.Content class="grow">
				<Textarea disabled placeholder="Twitch messages" class="resize-none h-full" bind:value={$twitchChat}/>
			</Card.Content>
			<Card.Footer class="flex gap-2.5">
				<Label for="twitchSwitch">Enable Twitch Chat: </Label>
				<Switch id="twitchSwitch" bind:checked={$twitchChatEnabled} on:click={toggleTwitchChat}/>
			</Card.Footer>
		</Card.Root>

		<Card.Root class="w-[480px]">
			<Card.Header>
				<Card.Title>Controls</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content class="grid grid-cols-2 gap-2.5">
				<Button bind:variant={LLMVariant} on:click={toggleLLM}>
					<CircleOff class="mr-2 h-4 w-4" />
					Disable LLM
				</Button>
				<Button bind:variant={TTSVariant} on:click={toggleTTS}>
					<VolumeX class="mr-2 h-4 w-4" />
					Disable TTS
				</Button>
				<Button bind:variant={STTVariant} on:click={toggleSTT}>
					<MicOff class="mr-2 h-4 w-4" />
					Disable STT
				</Button>
				<Button bind:variant={movementVariant} on:click={toggleMovement}>
					<Move class="mr-2 h-4 w-4" />
					Disable Movement
				</Button>
			</Card.Content>
			<Card.Footer class="flex gap-2.5">
				<Label for="multimodalSwitch">Enable Vision: </Label>
				<Switch id="multimodalSwitch" bind:checked={$multimodalEnabled} on:click={toggleMultimodal}/>
			</Card.Footer>
		</Card.Root>

		<Card.Root class="w-[480px]">
			<Card.Header>
				<Card.Title>Sing</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content class="flex flex-wrap gap-2.5">
				<div>
					<Select.Root portal={null} bind:selected={$selectedAudio}>
						<Select.Trigger class="w-[180px]">
							<Select.Value placeholder="Select a song"/>
						</Select.Trigger>
						<Select.Content>
							<Select.Group>
								<Select.Label>Playlist 1</Select.Label>
								{#each $songs as song}
									<Select.Item value={song.value} label={song.label}>
										{song.label}
									</Select.Item>
								{/each}
							</Select.Group>
						</Select.Content>
						<Select.Input name="fileName" />
					</Select.Root>
				</div>

				<div class="grid grid-cols-2 gap-2.5">
					<Button on:click={playAudio}>
						<PlayCircle class="mr-2 h-4 w-4" />
						Play
					</Button>
					<Button variant="destructive" on:click={abortAudio}>
						<XOctagon class="mr-2 h-4 w-4" />
						Stop
					</Button>
					<Button on:click={pauseAudio}>
						<Pause class="mr-2 h-4 w-4" />
						Pause
					</Button>
					<Button on:click={resumeAudio}>
						<Play class="mr-2 h-4 w-4" />
						Resume
					</Button>
				</div>
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
				<Button on:click={funFact}>
					<Sparkles class="mr-2 h-4 w-4" />
					Fun Fact
				</Button>
			</Card.Content>
			<Card.Footer class="flex gap-2.5">
				<Input placeholder="New Topic" bind:value={topic}/>
				<Button size="icon" on:click={newTopic}>
					<Send class="h-4 w-4" />
				</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
