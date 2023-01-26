<template>
  <div>
    <el-table :data="skuList" border>
      <el-table-column
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="skuName"
        label="名称"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column prop="skuDesc" label="描述"></el-table-column>
      <el-table-column label="默认图片" align="center" width="120">
        <template slot-scope="{ row }">
          <img
            :src="row.skuDefaultImg"
            alt="123"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量(元)"
        align="center"
        width="80"
      ></el-table-column>
      <el-table-column
        property="price"
        label="价格(千克)"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button
            v-if="row.isSale"
            type="success"
            icon="el-icon-top"
            size="mini"
            @click="cancelSale(row)"
          ></el-button>
          <el-button
            v-else
            type="primary"
            icon="el-icon-bottom"
            size="mini"
            @click="onSale(row)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click="edit"
          ></el-button>
          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSkuInfo(row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
          ></el-button>
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
    <el-drawer :visible.sync="drawer" :show-close="false" size="50%">
      <el-row type="flex" align="middle">
        <el-col :span="5">
          <div class="title">名称</div>
        </el-col>
        <el-col :span="16">
          <div class="content">{{ skuInfo.skuName }}</div>
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="5">
          <div class="title">描述</div>
        </el-col>
        <el-col :span="16">
          {{ skuInfo.skuDesc }}
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="5">
          <div class="title">价格(元)</div>
        </el-col>
        <el-col :span="16">
          {{ skuInfo.price }}
        </el-col>
      </el-row>
      <el-row type="flex" align="middle">
        <el-col :span="5">
          <div class="title">平台属性</div>
        </el-col>
        <el-col :span="16">
          <el-tag
            v-for="item in skuInfo.skuAttrValueList"
            :key="item.id"
            type="success"
            style="margin: 5px"
            >{{ item.valueName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row>
        <el-col v-if="skuInfo.skuImageList" :span="5">
          <div class="title">商品图片</div>
        </el-col>
        <el-col :span="12">
          <el-carousel :interval="2000" weight="150px" height="150px">
            <el-carousel-item
              v-for="item in skuInfo.skuImageList"
              :key="item.id"
            >
              <img :src="item.imgUrl" alt="" style="height: 100%" />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "SKU",
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      list: [],
      skuList: [], //sku数据列表
      drawer: false, //右侧抽屉是否显示
      skuInfo: {}, //右侧抽屉数据
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
    //改变page
    changeCurrent(page) {
      this.page = page;
      this.getDataList();
    },
    //改变limit
    changeSize(size) {
      this.limit = size;
      this.getDataList();
    },
    //请求sku数据列表
    async getDataList() {
      let result = await this.$API.sku.reqSkuInfoList(this.page, this.limit);
      if (result.code === 200) {
        this.skuList = result.data.records;
        this.total = result.data.total;
      }
    },
    //上架
    async onSale(row) {
      row.isSale = 1;
      let result = await this.$API.sku.reqOnSale(row.spuId);
      if (result.code === 200) {
        this.$message.success("已上架");
      }
    },
    //下架
    async cancelSale(row) {
      row.isSale = 0;
      let result = await this.$API.sku.reqCancelSale(row.spuId);
      if (result.code === 200) {
        this.$message.success("已下架");
      }
    },
    edit() {
      this.$message("正在开发中");
    },
    //右侧抽屉
    async getSkuInfo(row) {
      let result = await this.$API.sku.reqSkuInfo(row.id);
      if (result.code === 200) {
        this.skuInfo = result.data;
        this.drawer = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table ::v-deep {
  tr th .cell {
    text-align: center;
  }
  button {
    margin: 10px;
  }
}
.el-col {
  margin: 10px;
  .title {
    font-size: 18px;
    font-weight: bold;
    text-align: right;
  }
}
.title {
  font-size: 18px;
  font-weight: bold;
  text-align: right;
}

.el-carousel__item {
  text-align: center;
}

</style>