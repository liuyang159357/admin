<template>
  <div>
    <div class="header">
      <span>搜索用户</span>
      <svg
        t="1674833168762"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3725"
        width="12"
        height="12"
      >
        <path
          d="M512 1024c282.771 0 512-229.23 512-512s-229.23-512-512-512-512 229.23-512 512 229.23 512 512 512zM432 256c0-44.183 35.817-80 80-80s80 35.817 80 80v31.999c0 44.183-35.817 80-80 80s-80-35.817-80-80v-31.999zM431.999 512c0-44.183 35.817-80 80-80s80 35.817 80 80v256c0 44.183-35.817 80-80 80s-80-35.817-80-80v-256z"
          p-id="3726"
          fill="#8a8a8a"
        />
      </svg>
    </div>
    <div class="main">
      <span class="main-title">1235</span>
      <span class="main-content">17.1</span>
      <svg
        t="1674835050697"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4881"
        width="12"
        height="12"
      >
        <path
          d="M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z"
          fill="#d81e06"
          p-id="4882"
        />
      </svg>
      <svg
        t="1674835265095"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="7429"
        width="12"
        height="12"
      >
        <path
          d="M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z"
          fill="#1afa29"
          p-id="7430"
        />
      </svg>
    </div>
    <div class="footer">
      <div ref="charts" class="charts"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineCharts",
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        show: false,
        type: "category",
      },
      yAxis: {
        // show: false,
      },
      series: [
        {
          type: "line",
          data: [45, 9, 32, 12, 26, 35, 20, 25],
          lineStyle: {
            color: "purple",
          },
          itemStyle: {
            opacity: 0,
          },
          areaStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "purple", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "white", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
          },
          smooth: true,
        },
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #999;

  span {
    margin-right: 10px;
  }
}
.main {
margin: 20px 0;
  .main-title {
    margin-right: 30px;
  }
  .main-content {
    margin-right: 10px;
  }
}
.footer {
  .charts {
    width: 100%;
    height: 60px;
  }
}
</style>