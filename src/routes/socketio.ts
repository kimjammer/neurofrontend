import { writable } from 'svelte/store';
import {io} from "socket.io-client";
import {toast} from "svelte-sonner";

//Connect to the backend and handle storing received data.
export const socket = io("localhost:8080");

socket.on("error", (data) => {
	toast.error(data);
});

////// MAIN PAGE

//Current Message Section
export let currentMessage = writable("");
socket.on("current_message", (message: string) => {
	currentMessage.set(message);
});

//Next Message Section
export let nextMessage = writable("");
socket.on("reset_next_message", () => {
	nextMessage.set("");
});
socket.on("next_chunk", (message: string) => {
	nextMessage.update(n => n + message);
});

//Signals Section
export let AI_thinking = writable(false);
socket.on("AI_thinking", (message: boolean) => {
	AI_thinking.set(message);
});
export let AI_speaking = writable(false);
socket.on("AI_speaking", (message: boolean) => {
	AI_speaking.set(message);
});
export let human_speaking = writable(false);
socket.on("human_speaking", (message: boolean) => {
	human_speaking.set(message);
});
export let patiencePercent = writable(0);
export let total_time = writable(0);
socket.on("patience_update", (message) => {
	patiencePercent.set((message.crr_time / message.total_time) * 100);
	total_time.set(message.total_time);
});

//Twitch Chat Section
export let twitchChat = writable("");
export let twitchChatEnabled = writable(true);
socket.on("recent_twitch_messages", (message) => {
	twitchChat.set(message.join("\n"));
});
socket.on("twitch_status", (message: boolean) => {
	twitchChatEnabled.set(message);
});

//Controls Section
export let LLMEnabled = writable(true);
export let TTSEnabled = writable(true);
export let STTEnabled = writable(true);
export let movementEnabled = writable(true);
export let multimodalEnabled = writable(true);
socket.on("LLM_status", (message: boolean) => {
	LLMEnabled.set(message);
});
socket.on("TTS_status", (message: boolean) => {
	TTSEnabled.set(message);
});
socket.on("STT_status", (message: boolean) => {
	STTEnabled.set(message);
});
socket.on("movement_status", (message: boolean) => {
	movementEnabled.set(message);
});
socket.on("multimodal_status", (message: boolean) => {
	multimodalEnabled.set(message);
});

//Sing Section
export let selectedAudio = writable<any>(null);
export let songs = writable([
	{ value: "", label: "Loading..." }
]);
socket.on("audio_list", (message) => {
	let songList: any[] = [];
	message.forEach((song : any) => {
		songList.push({ value: song, label: song });
	});
	songs.set(songList);
});

////// LOBOTOMY PAGE

//Lobotomy Section
export const lobotomy = writable("");
socket.on("full_prompt", (message: string) => {
	lobotomy.set(message);
});

//Custom Prompt Section
export const priority = writable(200);
export const customPrompt = writable("");
socket.on("get_custom_prompt", (message: any) => {
	customPrompt.set(message.prompt);
	priority.set(message.priority);
});

////// MEMORY PAGE

export const memories = writable<any>([]);
export const searchQuery = writable("");
socket.on("get_memories", (data) => {
	memories.set(data);
});

////// MODERATION PAGE

export const blacklist = writable("");
socket.on("get_blacklist", (data) => {
	blacklist.set(data.join("\n"));
});

////// VTUBE PAGE

export const hotkeys = writable<any>([]);
socket.on("get_hotkeys", (data) => {
	hotkeys.set(data);
});