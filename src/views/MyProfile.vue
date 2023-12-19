<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div class="flex w-full flex-col items-center pb-10">
        <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">{{ this.uid }}</h5>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ this.email }}</span>
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
	  console.log(this.uid)
    }
  }
}
</script>
