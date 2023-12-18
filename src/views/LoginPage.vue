<template>
    <div class="flex h-screen items-center">
        <div class="flex-1 flex justify-center items-center">
            <a :href="oauthUrl">
                <img src="../assets/oauth.svg" class="max-w-[200px] max-h-[200px]">
            </a>
        </div>

        <div class="bg-gray-400 flex w-px h-2/3 m-3"></div>

        <div class="flex-1 flex justify-center">
			敬請期待其他登入方式！	
		</div>
    </div>
</template>

<script setup>

const oauthUrl = import.meta.env.VITE_OAUTH_URL;

</script>
