<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "PieCharts",
  data() {
    return {
    };
  },
  mounted() {
    let myCharts = echarts.init(this.$refs.charts);
    myCharts.setOption({
      title: {
        text: this.name,
        subtext: this.value,
        left: "center",
        top: "center",
      },
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "outside",
          },
          data: [
            { value: 1048, name: "视屏" },
            { value: 735, name: "Direct" },
            { value: 580, name: "Email" },
            { value: 484, name: "Union Ads" },
            { value: 300, name: "Video Ads" },
          ],
        },
      ],
    });
    myCharts.on("mouseover", (params) => {
      const { name, value } = params.data;
      myCharts.setOption({
        title:{
            text:name,
            subtext:value
        }
      })
    });
  },
};
</script>

<style lang="scss" scoped>
.charts {
  width: 100%;
  height: 300px;
}
</style>