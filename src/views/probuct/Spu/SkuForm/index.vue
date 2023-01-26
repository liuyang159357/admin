<template>
  <div>
    <el-form label-width="80px">
      <el-form-item label="SPU名称"> {{ spuName }} </el-form-item>
      <el-form-item label="SKU名称">
        <el-input
          v-model="skuInfo.skuName"
          placeholder="请输入sku名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input
          v-model.number="skuInfo.price"
          type="number"
          placeholder="请输入价格(元)"
        ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input
          v-model.number="skuInfo.weight"
          type="number"
          placeholder="请输入重量(千克)"
        ></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input
          v-model="skuInfo.skuDesc"
          type="textarea"
          rows="4"
          placeholder="请输入描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            v-for="(item, index) in attrInfoList"
            :key="item.id"
            :label="item.attrName"
          >
            <el-select
              v-model="skuInfo.skuAttrValueList[index]"
              placeholder="请选择"
            >
              <el-option
                v-for="i in item.attrValueList"
                :key="i.id"
                :value="`${item.id}:${i.id}`"
                :label="i.valueName"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item v-if="spuSaleAttrList.length" label="销售属性">
        <el-form :inline="true" label-width="80px">
          <el-form-item
            v-for="(item, index) in spuSaleAttrList"
            :key="item.id"
            :label="item.saleAttrName"
          >
            <el-select
              v-model="skuInfo.skuSaleAttrValueList[index]"
              placeholder="请选择"
            >
              <el-option
                v-for="i in item.spuSaleAttrValueList"
                :key="i.id"
                :label="i.saleAttrValueName"
                :value="`${item.id}:${i.id}`"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          :data="spuImageList"
          style="width: 100%"
          border
          @selection-change="handlerSelectionChange"
        >
          <el-table-column type="selection" width="80" align="center">
          </el-table-column>
          <el-table-column label="图片" align="center">
            <template slot-scope="{ row }">
              <img :src="row.imgUrl" style="width: 100px; height: 100px" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName" align="center">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row }">
              <el-button
                v-if="!row.isDefault"
                type="primary"
                @click="changeDefault(row)"
                >设置默认</el-button
              >
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      spuName: "", //spu名称
      spuImageList: [], //图片数据
      spuSaleAttrList: [], //销售属性
      attrInfoList: [], //平台属性
      skuInfo: {
        category3Id: "",
        spuId: 0,
        tmId: 0,
        price: "",
        skuName: "",
        weight: "",//必填
        skuDesc: "",
        skuAttrValueList: [],
        skuImageList: [],
        skuSaleAttrValueList: [],
        skuDefaultImg: "",
      },
    };
  },
  methods: {
    async getData(row, idForm) {
      //初始化skuForm数据
      console.log(row, idForm);
      this.spuName = row.spuName;
      this.skuInfo.spuId = row.id;
      this.skuInfo.category3Id = row.category3Id;
      this.skuInfo.tmId = row.tmId;
      //平台数据
      let result = await this.$API.sku.reqattrInfoList(idForm);
      if (result.code === 200) {
        this.attrInfoList = result.data;
      }
      //销售属性数据
      let sale = await this.$API.sku.reqspuSaleAttrList(row.id);
      if (sale.code === 200) {
        this.spuSaleAttrList = sale.data;
      }
      //图片数据
      let imageList = await this.$API.sku.reqSpuImageList(row.id);
      if (imageList.code === 200) {
        imageList.data.forEach((item) => {
          item.isDefault = 0;
        });
        this.spuImageList = imageList.data;
      }
    },
    //图片列表多选框回调
    handlerSelectionChange(selection) {
      this.skuInfo.skuImageList = selection;
    },
    //切换图片的默认项
    changeDefault(row) {
      this.spuImageList.forEach((item) => (item.isDefault = 0));
      row.isDefault = 1;
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    //保存按钮回调
    async save() {
      if(!this.skuInfo.weight){
        this.$message.warning('重量是必填的')
        return
      }
      //整理平台属性数据
      let array = [];
      this.skuInfo.skuAttrValueList.forEach((item) => {
        if (item) {
          const [attrId, valueId] = item.split(":");
          let obj = { valueId, attrId };
          array.push(obj);
        }
        this.skuInfo.skuAttrValueList = array;
      });
      //整理销售属性数据
      let array2 = this.skuInfo.skuSaleAttrValueList.reduce((prev, item) => {
        if (item) {
          const [saleAttrId, saleAttrvalueId] = item.split(":");
          prev.push({ saleAttrvalueId, saleAttrId });
        }
        return prev;
      }, []);
      this.skuInfo.skuSaleAttrValueList = array2;
      //保存数据
      let result = await this.$API.sku.reqAddSku(this.skuInfo);
      if (result.code === 200) {
        Object.assign(this._data, this.$options.data());
        this.$emit("changeSene", 0);
        this.$message.success("添加成功");
      }
    },
    //取消按钮回调
    cancel() {
      this.$emit("changeSene", 0);
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style>
</style>