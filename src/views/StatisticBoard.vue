
<template>
  <Bar
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import axios from 'axios';
import Cookie from 'js-cookie';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const baseUrl = import.meta.env.VITE_API_BASE_URL

export default {
  components: { Bar },
  data() {
    return {
      id: 0,
      token: "",
      data: [],
      chartData: {
         labels: [],
         datasets: [{ data: [] }]
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  created() {
    this.id = this.$route.query.id;
    this.token = Cookie.get('token');
    if (!this.token) {
      alert("您尚未登入。")
      window.location.href = '/'
    } else {
      this.getProfile(this.token)
    }
  },
  methods: {
    async getProfile(token) {
      const response = await axios.get(`${baseUrl}/domain/${this.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if(response.status == 401) {
        Cookies.remove('token');
        alert("您尚未登入！");
        window.location.href = '/login'
      }
      if(response.status == 403) {
        alert("您沒有權限訪問");
        window.location.href = '/manage'
      }
      if(response.status == 404) {
        alert("記錄不存在！");
        window.location.href = '/manage'
      }
      this.domain = response.data.domain.domain
      this.getStatistic()
    },
    async getStatistic() {
  const domain = this.domain.split('.').reverse().join('/');
  const url = `${baseUrl}/traffic/${domain}`;
  const headers = {
    "Authorization": `Bearer ${this.token}`
  };
  try {
    const response = await axios.get(url, { headers: headers });
    this.data = response.data.data.reverse();
    console.log(this.data);

    this.chartData = {
      labels: [],
      datasets: [{ label: '查詢次數', data: [] }]
    };

    for (let i = 0; i < this.data.length; i++) {
      if (Array.isArray(this.data[i]) && this.data[i].length > 1) {
        this.chartData.labels.push(this.data[i][0]);
        this.chartData.datasets[0].data.push(this.data[i][1]);
      }
    }

  } catch (error) {
    console.error(error);
  }
},

  }
}
</script>
