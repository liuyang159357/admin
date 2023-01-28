<template>
  <div ref="charts" class="charts"></div>
</template>

<script>
import * as echarts from "echarts";
import { Tooltip } from "element-ui";
export default {
  name: "BarChart",
  components: {
    echarts,
  },
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
          type: "bar",
          data: [45, 9, 32, 12, 26, 35, 20, 25],
        },
      ],
      tooltip: {
        show:true
      },
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
.charts {
  width: 100%;
  height: 100%;
}
</style>