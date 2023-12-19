<template>
  <div class="overflow-x-auto">
    <table class="min-w-full bg-white">
      <thead class="bg-gray-800 text-white">
        <tr>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">網域名稱</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">有效日期</th>
          <th class="text-left py-3 px-4 uppercase font-semibold text-sm">操作</th>
        </tr>
      </thead>
      <tbody class="text-gray-700">
       <tr v-for="(user_domain, index) in this.domains" :key="index">
            <td class="text-left py-3 px-4">{{ user_domain.domain }}</td>
            <td class="text-left py-3 px-4">{{ user_domain.expDate }}</td>
            <td class="text-left py-3 px-4"><a :href="`/domain?id=${user_domain.id}`">操作</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import axios from 'axios';
  import Cookies from 'js-cookie';

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  export default {
    data() {
      return {
        isRegistering: false,
        domain: "",
        domains: [],
      }
    },
    mounted() {
      const token = Cookies.get('token');
      if (!token) {
        alert("還並未登入。");
        window.location.href = '/';
      } else {
        this.getDomains(token);
      }
    },
    methods: {
      async getDomains(token) {
        try {
          const response = await axios.get(`${baseUrl}/domains`, {headers: `Authorization: Bearer ${token}`});
          const data = response.data;
          this.domains = data.data;
          console.log(this.domains)
        } catch(e){
          console.log(e)
		  if(e.response.status == 401) {
			 Cookies.remove('token');
			 alert("您尚未登入！");
			 window.location.href = '/login'
		  }
		  if(e.response.status == 403) {
			alert("暫時不開放給非管理員使用。")	
			window.location.href = '/'
          }
        }
      }
    }
  }
</script>
