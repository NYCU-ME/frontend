<template>
	<div>
        <button @click="toggle" class="mx-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
            新增記錄
        </button>
        <button @click="renew" class="mx-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded">
            延長網域
        </button>
        <a :href="`/statistic?id=${id}`"><button class="mx-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 border border-yellow-700 rounded">
            查看統計
        </button></a>
        <button @click="release" class="mx-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded">
            釋放網域
        </button>
    </div>	

	<div v-if="isAdding" class="w-full mt-3 p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <div class="flex flex-col items-center sm:flex-row">
            <input v-model="subdomain" type="text" class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="輸入子網域">
            <select v-model="recordType" id="domains" class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value="A">A</option>
                <option value="AAAA">AAAA</option>
                <option value="CNAME">CNAME</option>
                <option value="NS">NS</option>
                <option value="MX">MX</option>
                <option value="TXT">TXT</option>
            </select>
            <input v-model="recordValue" type="text" class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="值">
            <input v-model="ttl" type="text" class="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="值">
        </div>
        <div class="flex justify-end mt-2">
            <button @click="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                新增
            </button>
        </div>
    </div>

	<div class="relative overflow-x-auto mt-3">
		<table class="w-full text-sm text-left rtl:text-right text-gray-500 border-2 border-[#575757]">
			<thead class="text-xs text-gray-200 bg-[#575757] border-2 border-[#575757]" >
				<tr>
					<th scope="col" class="px-6 py-3">
						子網域
					</th>
					<th scope="col" class="px-6 py-3">
						型別
					</th>
					<th scope="col" class="px-6 py-3">
						值
					</th>
					<th scope="col" class="px-6 py-3">
						TTL
					</th>
					<th scope="col" class="px-6 py-3">
						操作
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(record, index) in this.records" :key="index" class="bg-white border-b">
					<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
						@
					</th>
					<td class="px-6 py-4">
						{{ record[1] }}
					</td>
					<td class="px-6 py-4">
						{{ record[2] }}
					</td>
					<td class="px-6 py-4">
						{{ record[3] }}
					</td>
					<td class="px-6 py-4"><a @click="delRecord(record[1], record[2])">刪除</a></td>
				</tr>
				<tr v-for="(record, index) in this.glues" :key="index" class="bg-white border-b">
					<th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
						{{ record[1] }}
					</th>
					<td class="px-6 py-4">
						{{ record[2] }}
					</td>
					<td class="px-6 py-4">
						{{ record[3] }}
					</td>
					<td class="px-6 py-4">
						{{ record[4] }}
					</td>
                    <td class="px-6 py-4"><a @click="delGlueRecord(record[1], record[2], record[3])">刪除</a></td>
				</tr>
			</tbody>
		</table>
	</div>

</template>

<script>

import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = import.meta.env.VITE_API_BASE_URL

export default {
  data() {
    return {
      id: 0,
	  isAdding: false,
      domain: "",
      records: [],
      glues: [],
      subdomain: '@',
      recordType: 'A',
      recordValue: '',
      ttl: 5,
	  token: ""
    }
  },
  created() {
    this.token = Cookies.get('token');
    this.id = this.$route.query.id;
    if (!this.token) {
      Cookies.remove('token');
      alert("您尚未登入。");
      window.location.href = '/login';
    } else {
      this.getProfile(this.token);
    }
  },
  methods: {
		toggle() {
			this.isAdding = !this.isAdding;
		},
    async getProfile(token) {
      try {
          const response = await axios.get(`${baseUrl}/domain/${this.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.domain = response.data.domain.domain
          this.records = response.data.domain.records
          this.glues = response.data.domain.glues
      } catch (e) {
          if(e.response.status == 401) {
            alert("您尚未登入！");
            window.location.href = '/login'
          }
          if(e.response.status == 403) {
            alert("您沒有權限訪問");
            window.location.href = '/domains'
          }
          if(e.response.status == 404) {
            alert("記錄不存在！");
            window.location.href = '/domains'
          }
      }
    },
    convert(type_, value) {
      if(type_ == 'TXT')
        return btoa(value);
      return value;
    },
		async submit(){
      const domain = this.domain.split('.').reverse().join('/');
      this.recordValue = this.convert(this.recordType, this.recordValue);
      if(this.subdomain == "@") {
        const url = `${baseUrl}/ddns/${domain}/records/${this.recordType}/${this.recordValue}`;
        const data = {
          ttl: this.ttl
        };
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`
        };
        try {
          await axios.post(url, data, { headers });
          alert("新增成功！")
          location.reload()
        } catch (error) {
          console.error(error)
          alert(error.response.data.msg)
        }
      } else {
        const url = `${baseUrl}/glue/${domain}/records/${this.subdomain}/${this.recordType}/${this.recordValue}`;
        const data = {
          ttl: this.ttl
        };
        const headers = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.token}`
        };
        try {
          await axios.post(url, data, { headers });
          alert("新增成功！")
          location.reload()
        } catch (error) {
          console.error(error)
          alert(error.response.data.msg)
        }
      }
		},
    async delRecord(type_, value) {
			const domain = this.domain.split('.').reverse().join('/');
      value = this.convert(type_, value)
			const url = `${baseUrl}/ddns/${domain}/records/${type_}/${value}`;
			const headers = {
				"Authorization": `Bearer ${this.token}`
			};
      try {
        await axios.delete(url, { headers: headers });
        alert("移除成功！")
        location.reload()
      } catch (error) {
				console.error(error)
				alert(error.response.data.msg)
      }
    },
    async delGlueRecord(subdomain, type_, value) {
			const domain = this.domain.split('.').reverse().join('/');
      value = this.convert(type_, value)
			const url = `${baseUrl}/glue/${domain}/records/${subdomain}/${type_}/${value}`;
			const headers = {
				"Authorization": `Bearer ${this.token}`
			};
      try {
        await axios.delete(url, { headers: headers });
        alert("移除成功！")
        location.reload()
      } catch (error) {
				console.error(error)
				alert(error.response.data.msg)
      }
    },
		async renew() {
			const domain = this.domain.split('.').reverse().join('/');
			const url = `${baseUrl}/renew/${domain}`;
			const headers = {
				"Authorization": `Bearer ${this.token}`
			};
      try {
        await axios.post(url, {}, { headers });
        alert("延長成功！")
      } catch (error) {
				console.error(error)
				alert(error.response.data.msg)
      }
		},
    async release() {
      const isConfirmed = confirm("釋放網域操作將不可撤回，你所有記錄都將被消除，你確定要這麽做嗎？");
      if(isConfirmed) {
        const domain = this.domain.split('.').reverse().join('/');
        const url = `${baseUrl}/domains/${domain}`;
        const token = Cookies.get('token');

        try {
          await axios.delete(url, {
            "headers": {
              'Authorization': `Bearer ${token}`
            }
          });
          alert("刪除成功！")
          window.location.href = '/domains';
        } catch (error) {
          alert(error.response.data.msg)
          console.log(error)
        }
      }
    }
  }
}

</script>
