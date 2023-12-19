<template>
   <nav ref="navbar" class="bg-[#575757]">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
         <div class="relative flex items-center justify-between h-16">
            <div class="flex-1 flex items-center justify-start sm:items-stretch">
               <div class="flex-shrink-0 flex items-center">
                  <a href="/">
                     <h1 class="text-2xl text-gray-300">NYCU-ME</h1>
                  </a>
               </div>
               <div class="flex flex-1 items-center justify-end">
                	<a href="/about-us" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">團隊介紹</a>
                    <a href="/contact-us" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">聯係我們</a>
                    <a :href="oauthUrl" class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">登入</a>
               </div>
            </div>
         </div>
      </div>
   </nav>
</template>

<script setup>

const oauthUrl = import.meta.env.VITE_OAUTH_URL;

</script>
