<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName" class="tabs">
        <el-tab-pane label="销售额" name="sale"> </el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <div class="right">
        <span @click="setDay">今日</span>
        <span @click="setWeek">本周</span>
        <span @click="setMonth">本月</span>
        <span @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          value-format="yyyy-MM-dd"
          class="date"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          size="mini"
        >
        </el-date-picker>
      </div>
    </div>
    <el-row :gutter="10" class="row">
      <el-col :span="18">
        <div ref="charts" class="charts"></div>
      </el-col>
      <el-col :span="6">
        <h3 style="text-align: center">门店{{ title }}排名</h3>
        <ul>
          <li>
            <div>
              <span class="black">1</span>
              <span>沙县小吃</span>
            </div>
            <span>88888</span>
          </li>
          <li>
            <div>
              <span class="black">2</span>
              <span>兰州拉面</span>
            </div>
            <span>80213</span>
          </li>
          <li>
            <div>
              <span class="black">3</span>
              <span>肯德基</span>
            </div>
            <span>76322</span>
          </li>
          <li>
            <div>
              <span>4</span>
              <span>张亮麻辣烫</span>
            </div>
            <span>59968</span>
          </li>
          <li>
            <div>
              <span>5</span>
              <span>麦当劳</span>
            </div>
            <span>58688</span>
          </li>
          <li>
            <div>
              <span>6</span>
              <span>必胜客</span>
            </div>
            <span>42453</span>
          </li>
          <li>
            <div>
              <span>7</span>
              <span>华莱士</span>
            </div>
            <span>12250</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Sale",
  data() {
    return {
      w: window.clientWidth,
      activeName: "sale",
      mycharts: null,
      date: [], //日历数据
    };
  },
  computed: {
    title() {
      return this.activeName === "sale" ? "销售额" : "访问量";
    },
  },
  watch: {
    title(newV, oldV) {
      this.mycharts.setOption({
        title: {
          text: this.title + "趋势",
        },
      });
    },
  },
  mounted() {
    this.mycharts = echarts.init(this.$refs.charts);
    this.mycharts.setOption({
      title: {
        text: "销售额趋势",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        width: "auto",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "一月",
            "二月",
            "三月",
            "四月",
            "五月",
            "六月",
            "七月",
            "八月",
            "九月",
            "十月",
            "十一月",
            "十二月",
          ],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "Direct",
          type: "bar",
          barWidth: "60%",
          data: [10, 52, 200, 334, 390, 330, 220, 225, 360, 128, 330, 156],
        },
      ],
    });
    this.$echartsResize(this.mycharts);
  },
  methods: {
    resize() {
      this.mycharts.resize();
    },
    setDay() {
      const day = this.$moment(new Date()).format("YYYY-MM-DD");
      this.date = [day, day];
    },
    setWeek() {
      const start = this.$moment().startOf("week").format("YYYY-MM-DD");
      const end = this.$moment().endOf("week").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setMonth() {
      const start = this.$moment().startOf("month").format("YYYY-MM-DD");
      const end = this.$moment().endOf("month").format("YYYY-MM-DD");
      this.date = [start, end];
    },
    setYear() {
      const start = this.$moment().startOf("year").format("YYYY-MM-DD");
      const end = this.$moment().endOf("year").format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style lang="scss" scoped>
.box-card {
  margin: 10px 0;
  .clearfix {
    position: relative;
    .tabs {
      width: 100%;
    }
    .right {
      position: absolute;
      right: 0;
      top: 0;
      span {
        cursor: pointer;
        margin-right: 20px;
        font-size: 12px;
      }
      .date {
        width: 250px;
      }
    }
  }
  .charts {
    width: 100%;
    height: 300px;
  }
  ul {
    text-align: center;
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
    li {
      font-size: 14px;
      margin-block: 10px;
      height: 8%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      div {
        display: flex;
        align-items: baseline;
        span {
          display: inline-block;
          margin-right: 20px;
          &:nth-child(1) {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            line-height: 20px;
            text-align: center;
          }
          &.black {
            background-color: black;
            color: white;
          }
        }
      }
    }
  }
}
</style>