<template>
  <div>
    <el-card style="margin: 20px 0">
      <CategorySelect
        :show="scene == 0"
        @getCategoryId="getCategoryId"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="scene === 0">
        <el-button
          :disabled="!id"
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table :data="list" style="width: 100%" border>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column prop="spuName" label="SPU名称"></el-table-column>
          <el-table-column prop="description" label="SPU描述"></el-table-column>
          <el-table-column label="SPU操作">
            <template slot-scope="{ row }">
              <HintButton
                title="添加SKU"
                type="success"
                icon="el-icon-plus"
                size="mini"
              ></HintButton>
              <HintButton
                title="修改SPU"
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateSpu(row)"
              ></HintButton>
              <HintButton
                title="查看当前SPU全部SKU列表"
                type="info"
                icon="el-icon-info"
                size="mini"
              ></HintButton>
              <HintButton
                title="删除SPU"
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></HintButton>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 20px; text-align: center"
          :total="total"
          :current-page="page"
          :page-size="limit"
          :page-sizes="[5, 7, 9]"
          layout="prev, pager, next, jumper, ->, sizes, total "
          @current-change="changeCurrent"
          @size-change="changeSize"
        ></el-pagination>
      </div>
      <div v-show="scene === 1">
        <SpuForm ref="spu" @changeSene="changeSene"></SpuForm>
      </div>
      <div v-show="scene === 2">
        <SkuForm></SkuForm>
      </div>
    </el-card>
  </div>
</template>

<script>
import SpuForm from "./SpuForm";
import SkuForm from "./SkuForm";
export default {
  name: "SPU",
  components: {
    SpuForm,
    SkuForm,
  },
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      list: [],
      //三级联动传来的三级id
      id: "",
      scene: 0, //控值三级联动下边显示内容的切换
    };
  },
  methods: {
    //三级联动的自定义事件
    getCategoryId(idFrom) {
      this.id = idFrom.category3;
      this.getSpuList();
    },
    //获取SPU列表数据
    async getSpuList() {
      let result = await this.$API.spu.reqSpuInfoList(
        this.page,
        this.limit,
        this.id
      );
      if (result.code === 200) {
        this.list = result.data.records;
        this.total = result.data.total;
      }
    },
    //改变page
    changeCurrent(page) {
      this.page = page;
      this.getSpuList();
    },
    //改变limit
    changeSize(size) {
      this.limit = size;
      this.getSpuList();
    },
    //添加Spu按钮回调
    addSpu() {
      this.scene = 1;
      this.$refs.spu.initSpuData();
    },
    //修改Spu回调
    updateSpu(row) {
      this.scene = 1;
      this.$refs.spu.initSpuData(row);
    },
    changeSene(scene) {
      this.scene = scene;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>