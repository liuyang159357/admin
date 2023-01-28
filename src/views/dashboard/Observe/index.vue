<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="header">
          <span>线上热门搜索</span>
          <el-dropdown>
            <i class="el-icon-more"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <linecharts></linecharts>
          </el-col>
          <el-col :span="12">
            <linecharts></linecharts>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          style="width: 100%; margin: 10px 0; font-size: 12px"
          border
        >
          <el-table-column label="排名" type="index" width="80">
          </el-table-column>
          <el-table-column label="搜索关键字"> </el-table-column>
          <el-table-column label="用户数" sortable> </el-table-column>
          <el-table-column label="周涨幅" sortable> </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="box-card">
        <div slot="header" class="header">
          <span>销售类别占比</span>
          <el-radio-group v-model="value" size="mini">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
        <pieCharts></pieCharts>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import linecharts from "./linCharts";
import pieCharts from './pieCharts'
export default {
  name: "Observe",
  components: {
    linecharts,
    pieCharts
  },
  data() {
    return {
      tableData: [{}],
      value:'全部渠道'
    };
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  i {
    cursor: pointer;
  }
}
</style>