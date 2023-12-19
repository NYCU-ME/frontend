<template>
<span v-if="logging">正在跳轉頁面。</span>
</template>

<script>

import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export default {
	data() {
		return {
			logging: 0
		}
	},

  created() {
      const code = this.$route.query.code;
      if (code) {
        this.logging = 1
        this.login(code)
      }
  },
  methods: {
    async login(code) {
      try {
        const response = await axios.get(`${baseUrl}/oauth/${code}`);
        const expires = new Date(new Date().getTime() + 60 * 60 * 1000);
        Cookies.set('token', response.data.token, { expires: expires });
        const urlWithoutParams = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.replaceState({ path: urlWithoutParams }, '', urlWithoutParams);
        location.reload()
      } catch (error) {
        console.error(error);
        alert(error.response.data.msg);
      }
    }
  }
}

</script>

