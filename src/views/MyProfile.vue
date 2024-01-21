<template>

<div class="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden my-4 ">
  <div class="flex items-center px-6 py-3 bg-[#575757]">
    <h1 class="mx-3 text-white font-semibold text-lg">基本資訊</h1>
  </div>
  <div class="py-4 px-6">
    <h1 class="text-2xl font-semibold text-gray">學號: {{ this.uid }}</h1>
    <div class="flex items-center mt-4 text-gray-700">
      <svg class="h-6 w-6 fill-current" viewBox="0 0 512 512">
        <path d="M437.332 80H74.668C51.199 80 32 99.198 32 122.667v266.666C32 412.802 51.199 432 74.668 432h362.664C460.801 432 480 412.802 480 389.333V122.667C480 99.198 460.801 80 437.332 80zM432 170.667L256 288 80 170.667V128l176 117.333L432 128v42.667z"/>
      </svg>
      <h1 class="px-2 text-sm"> 信箱: {{ this.email }}</h1>
    </div>
    <div class="flex items-center mt-4 text-gray-700">
      <svg class="h-6 w-6 fill-current" viewBox="0 0 32 32" version="1.1">
        <path d="M15.999 0c-6.188 0-11.035 5.035-11.035 11.223 0 4.662 2.29 6.883 4.1 8.504 1.165 1.044 1.949 1.674 1.949 2.448v1.695c0 0.044 0.006 0.086 0.011 0.129h-0.023v2.895c0.001 3.053 1.975 5.105 5.033 5.105 2.952 0 4.967-2.052 4.967-5.105v-2.895h-0.029c0.006-0.043 0.013-0.085 0.013-0.129v-1.695c0-1.18 0.876-1.893 2.204-3.053 1.797-1.569 3.844-3.521 3.844-7.899 0-6.189-4.847-11.223-11.036-11.223zM15.962 30c-1.872 0-2.959-1.161-2.959-3.105l-0.014-1.334c0.72 0.246 1.7 0.439 3.012 0.439 1.294 0 2.276-0.207 3.003-0.462v1.356c0 1.974-1.102 3.105-3.041 3.105zM21.876 17.616c-1.358 1.186-2.889 2.413-2.889 4.559v1.264c-0.474 0.265-1.349 0.58-3.004 0.58-1.736 0-2.56-0.308-2.969-0.546v-1.298c0-1.706-1.334-2.791-2.615-3.938-1.697-1.521-3.434-3.245-3.434-7.014-0-5.085 3.95-9.223 9.034-9.223 5.086 0 9.036 4.138 9.036 9.223 0 3.47-1.515 4.956-3.16 6.393z"></path>
      </svg>
      <h1 class="px-2 text-sm"> 網域數量: {{ this.nums }}</h1>
    </div>
  </div>
</div>

</template>


<script>
import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default {
  data() {
    return {
      uid: "",
      email: "",
      nums: 0, 
      isLoading: false
    }
  },
  created() {
    const token = Cookies.get('token');
    if (!token) {
      alert("還並未登入。");
      window.location.href = '/';
    } else {
      this.getProfile(token);
    }
  },
  methods: {
    async getProfile(token) {
      const response = await axios.get(`${baseUrl}/whoami/`, {headers: `Authorization: Bearer ${token}`});
      if(response.status == 401) {
          Cookies.remove('token');
          alert("還並未登入。");
          window.location.href = '/';
      }
      const data = response.data;
      this.uid = data.uid;
      this.email = data.email;
      this.nums = data.domains.length;
      this.isLoading = true;
    }
  }
}
</script>
