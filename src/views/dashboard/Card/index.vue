<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card>
          <Detail title="销售总额" count="￥112560">
            <template slot="charts">
              <span>
                周同比 <span></span> 56.78%
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
              </span>
              <span>
                日同比 &nbsp;19.27%
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
              </span>
            </template>
            <template slot="footer">
              <span>日销售额￥1220</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <lineCharts></lineCharts>
            </template>
            <template slot="footer">
              <span>日访问量1234</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="支付笔数" count="51030">
            <template slot="charts">
              <barCharts></barCharts>
            </template>
            <template slot="footer">
              <span>转化率65%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <Detail title="运营活动效果" count="78%">
            <template slot="charts">
              <progressCharts></progressCharts>
            </template>
            <template slot="footer">
              <span>
                周同比 <span v-html="space"></span> 10.78%
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
              </span>
              <span>
                日同比 &nbsp;9.27%
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
              </span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from "./Detail";
import lineCharts from "./lineChart";
import barCharts from "./BarChart";
import progressCharts from "./progressChart";
export default {
  name: "Header",
  components: {
    Detail,
    lineCharts,
    barCharts,
    progressCharts,
  },
  data() {
    return {
      space: "<span>&nbsp;&nbsp;</span>",
    };
  },
};
</script>

<style>
</style>