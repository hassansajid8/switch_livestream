<script lang="ts">
	import moment from "moment";

    export let item;

</script>

<div class="msg flex justify-between items-end p-2 hover:bg-gray-300 rounded">
    <div>
        <a href="" class="text-xs text-gray-600 hover:underline">{item.username}</a>
        <p>{item.text}</p>
    </div>
    <p class="text-xs text-gray-600">{moment(item.time).format("h:mm:ss a")}</p>
</div>


<style>
</style>