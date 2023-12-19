<template>
  <div ref="dashboard-menu" id="dashboard-menu" class="hidden sm:flex w-[240px] flex-col justify-between bg-[#575757] w-1/4 text-gray-300 h-screen text-center fixed top-0 left-0 bottom-0">
		<div>
			<div class="px-2 pt-2 pb-3">
				<ul class="space-y-1.5">
					<li><h5 class="text-2xl"><a href="/">NYCU-ME</a></h5></li>
					<li><hr class="my-1.5"/></li>
					<li><a class="my-1.5" href="/dashboard">儀表板</a></li>
					<li><a class="my-1.5" href="/domains">DNS 管理</a></li>
					<li><a class="my-1.5" href="/profile">個人資料</a></li>
				</ul>
			</div>
		</div>

		<div>
			<div class="px-2 pt-2 pb-3">
				<ul class="space-y-1.5">
					<li><hr class="my-1.5"/></li>
					<li><a class="my-1.5" href="/about-us">關於我們</a></li>
					<li><a class="my-1.5" href="/contact-us">聯繫我們</a></li>
					<li><a class="my-1.5" href="/rules">使用規章</a></li>
					<li><hr class="my-1.5"/></li>
					<li><a class="my-1.5" @click="logout">登出</a></li>
				</ul>
			</div>
		</div>
	</div>

  <nav ref="navbar" class="sm:hidden w-screen bg-[#575757]">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex-1 flex items-center justify-start sm:items-stretch">
          <div class="flex-shrink-0 flex items-center">
            <a href="/">
              <h1 class="text-2xl text-gray-300">NYCU-ME</h1>
            </a>
          </div>
        </div>

        <div class="flex items-center justify-end">
          <button ref="menuButton" @click="toggleMenu" class="inline-flex items-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
            <ButtonStyle></ButtonStyle>
          </button>
        </div>
      </div>
    </div>
  </nav>
 
  <div ref="dashboard-menu" id="dashboard-menu" class="sm:hidden overlay-element bg-[#363B3F] w-screen text-gray-300" v-show="isMenuOpen">
    <div class="flex flex-col items-center px-2 pt-2 pb-3 space-y-1.5">
    <ul class="w-full text-center space-y-1.5">
      <li><a href="/dashboard" class="my-1.5 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">儀表板</a></li>
      <li><a href="/domains" class="my-1.5 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">DNS 管理</a></li>
      <li><a href="/profile" class="my-1.5 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">個人資料</a></li>
      <li><hr class="my-1.5 w-full"/></li>
      <li><a href="/about-us" class="my-1.5 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">關於我們</a></li>
      <li><a href="/contact-us" class="my-1.5 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">聯繫我們</a></li>
      <li><a href="/rules" class="my-1.5 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">使用規章</a></li>
      <li><hr class="my-1.5 w-full"/></li>
      <li><a @click="logout" class="my-1.5 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">登出</a></li>
    </ul>
    </div>
  </div>
 
</template>


<script>

import ButtonStyle from './ButtonStyle.vue';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  components: {
    ButtonStyle,
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    logout() {
      Cookies.remove('token');
      location.reload();
    },
  }
}

</script>
