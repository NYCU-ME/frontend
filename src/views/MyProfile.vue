<template>
  <p>學號：{{ this.uid }}</p>
  <p>郵箱：{{ this.email }}</p>
  <p>使用量：{{ this.nums }}</p>
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
      nums: 0
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
    }
  }
}
</script>
