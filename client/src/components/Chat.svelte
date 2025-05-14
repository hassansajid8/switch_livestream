<script lang="ts">
	import Icon from "@iconify/svelte";
    import { io } from "socket.io-client";
	import ChatItem from "./ChatItem.svelte";
	import { shared } from "$lib/shared.svelte";
	import { page } from "$app/state";

    let chattext: string = $state('');
    let chatbox: HTMLElement;

    let chatitems: Array<ChatMsg> = $state([]);

    const { data } = $props();

    const socket = io(`http://${page.url.hostname}`, {
        path: '/server/socket.io',
        query: {
            streamer: page.url.pathname
        }
    });

    socket.on("connect", () => {
        console.log("connected to server with id:", socket.id);
    });

    socket.on("chatbroadcast", (arg) => {
        try{
            chatitems.push(arg);
            chatitems = chatitems;
        } catch(e) {
            console.log("Error recieving broadcast ", e);
        }
    })

    async function sendchat() {
        event?.preventDefault();

        if(!chattext) return;

        const chatmsg: ChatMsg = {
            username: data.user.username,
            text: chattext,
            time: new Date()
        };

        console.log(chatmsg);

        socket.emit("chatmsg", chatmsg);

        chattext = '';
    }

</script>

<div class="flex-1 p-4 flex flex-col inset-shadow-sm inset-shadow-accent/50 hover:inset-shadow-accent transition-all h-96 lg:h-[80svh]">
    <p>Live Chat</p>
    <div class="flex-1 flex flex-col-reverse overflow-y-auto">
        <div bind:this={chatbox} class="chatbox p-2">
            {#each chatitems as item}
                <ChatItem item={item} />                
            {/each}
        </div>
    </div>
    {#if shared.isAuth}
    <form class="flex items-center" onsubmit={sendchat}>
        <input bind:value={chattext} type="text" class="w-full border-2 p-2 rounded" placeholder="Sign-in to chat" />
        <button type="submit" class="cursor-pointer border-2 border-l-0 pl-2 pr-1 py-2 active:bg-gray-400 hover:bg-gray-300 ">
            <Icon icon="material-symbols:send-outline" width="24" height="24" />
        </button>
    </form>
    {:else}
    <button class="flex items-center" onclick={() => shared.showLoginDialog = true}>
        <span class="w-full border-2 p-2 rounded text-left">Sign in to chat</span>
        <div class="cursor-pointer border-2 border-l-0 pl-2 pr-1 py-2 active:bg-gray-400 hover:bg-gray-300 ">
            <Icon icon="material-symbols:send-outline" width="24" height="24" />
        </div>
    </button>
    {/if}
</div>

<style>
</style>