<script lang="ts">
	import * as Avatar from "$lib/components/ui/avatar";
	import {ModeWatcher, toggleMode} from "mode-watcher";
	import "../app.pcss";

	import { Button } from "$lib/components/ui/button";
	import { Sun, Moon } from "lucide-svelte";
</script>
<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
</svelte:head>

<ModeWatcher />

<div class="h-screen flex flex-col">
	<nav class="w-full p-5 justify-start items-start gap-[100px] inline-flex">
		<div class="justify-start items-center gap-[25px] inline-flex grow">
			<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight xl:text-5xl">
				Neuro Control Panel
			</h1>
			<div class="p-2.5 justify-start items-center gap-1 inline-flex">
				<Button variant="link" href="/" class="leading-7">
					Main
				</Button>
				<Button variant="link" href="/lobotomy" class="leading-7">
					Lobotomy
				</Button>
				<Button variant="link" href="/moderation" class="leading-7">
					Moderation
				</Button>
				<Button variant="link" href="/vtube" class="leading-7">
					Vtube Studio
				</Button>
			</div>
		</div>
		<div class="h-full flex justify-end items-center gap-[25px]">
			<div class="text-lg font-semibold text-right">Welcome, KimJammer</div>

			<Avatar.Root>
				<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
				<Avatar.Fallback>CN</Avatar.Fallback>
			</Avatar.Root>

			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
				<Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>
	</nav>
	<slot></slot>
</div>