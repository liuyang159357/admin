<template>
  <div ref="charts" class="charts"></div>
</template>
  
  <script>
import * as echarts from "echarts";

export default {
  name: "ProgressChart",
  components: {
    echarts,
  },
  mounted() {
    let lineCharts = echarts.init(this.$refs.charts);
    lineCharts.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100,
      },
      yAxis: {
        show: false,
        type: "category",
      },
      series: [
        {
          type: "bar",
          data: [78],
          color: "cyan",
          barWidth:'30%',
          color:'yellowgreen',
          showBackground:true,
          backgroundStyle:{
            color:'#eee'
          },
          label:{
            show:true,
            color:'yellowgreen',
            formatter:'|',
            position:'right'
          }
        },
      ],
      tooltip: {
        show: true,
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