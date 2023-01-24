<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" placeholder="请输入SPU名称"></el-input>
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option
            v-for="item in tradeMarkList"
            :key="item.id"
            :label="item.tmName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input
          v-model="spu.description"
          type="textarea"
          placeholder="请输入SPU描述"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="spuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select value="" placeholder="还有3未选择">
          <el-option label="" value=""></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-plus" style="margin: 10px"
          >添加销售属性</el-button
        >
        <el-table :data="spu.spuSaleAttrList" style="width: 100%" border>
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
          <el-table-column label="属性值名称列表">
            <template slot-scope="{ row }">
              <el-tag
                v-for="item in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                :disable-transitions="false"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="inputVisible"
                ref="saveTagInput"
                v-model="inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput"
                >+ New Tag</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeSene', 0)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      spu: {
        // 存储spu数据
        category3Id: 0,
        description: "",
        spuImageList: [
          {
            id: 0,
            imgName: "",
            imgUrl: "",
            spuId: 0,
          },
        ],
        spuName: "",
        spuSaleAttrList: [
          {
            baseSaleAttrId: 0,
            id: 0,
            saleAttrName: "",
            spuId: 0,
            spuSaleAttrValueList: [
              {
                baseSaleAttrId: 0,
                id: 0,
                isChecked: "",
                saleAttrName: "",
                saleAttrValueName: "",
                spuId: 0,
              },
            ],
          },
        ],
        tmId: 0,
      },
      tradeMarkList: [], //存储品牌数据
      spuImageList: [], //spu图片数据
      saleAttr: [], //销售属性
      inputVisible:''
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //初始化Spuform数据
    async initSpuData(spu) {
      //spu是父组件传递的数据
      //获取SPU数据
      let result = await this.$API.spu.reqSpu(spu.id);
      if (result.code === 200) {
        this.spu = result.data;
      }
      //获取品牌的信息
      let tradeMarkInfo = await this.$API.spu.reqTrademarkList();
      console.log(tradeMarkInfo);
      if (tradeMarkInfo.code === 200) {
        this.tradeMarkList = tradeMarkInfo.data;
      }
      //获取spu图片的数据
      let spuImage = await this.$API.spu.reqSpuImageList(spu.id);
      if (spuImage.code === 200) {
        spuImage.data.forEach((i) => {
          i.name = i.imgName;
          i.url = i.imgUrl;
        });
        this.spuImageList = spuImage.data;
      }
      //获取平台全部的销售属性
      let saleAttr = await this.$API.spu.reqSaleAttrList();
      if (saleAttr.code === 200) {
        this.saleAttr = saleAttr.data;
      }
    },
    handleInputConfirm(){

    },
    showInput(){

    }
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>