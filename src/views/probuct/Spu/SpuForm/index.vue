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
          :on-success="handlerSuccess"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select
          v-model="attrIdAndAttrName"
          :placeholder="
            unSelectSaleAttr.length
              ? `还有${unSelectSaleAttr.length}未选择`
              : ''
          "
        >
          <el-option
            v-for="item in unSelectSaleAttr"
            :key="item.id"
            :label="item.name"
            :value="`${item.id}:${item.name}`"
          ></el-option>
        </el-select>
        <el-button
          :disabled="!attrIdAndAttrName"
          type="primary"
          icon="el-icon-plus"
          style="margin: 10px"
          @click="addSaleAttr"
          >添加销售属性</el-button
        >
        <el-table :data="spu.spuSaleAttrList" style="width: 100%" border>
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80"
          ></el-table-column>
          <el-table-column
            label="属性名"
            prop="saleAttrName"
            align="center"
            width="100"
          ></el-table-column>
          <el-table-column label="属性值名称列表">
            <template slot-scope="{ row, $index }">
              <el-tag
                v-for="(item, index) in row.spuSaleAttrValueList"
                :key="item.id"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index, 1)"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                :ref="$index"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
                @keyup.enter.native="$event.target.blur()"
                @blur="handleInputConfirm(row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput(row, $index)"
                >+ 新的属性值</el-button
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="{ $index }">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="spu.spuSaleAttrList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
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
          // {
          //   id: 0,
          //   imgName: "",
          //   imgUrl: "",
          //   spuId: 0,
          // },
        ],
        spuName: "",
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "",
          //       saleAttrName: "",
          //       saleAttrValueName: "",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
        tmId: "",
      },
      tradeMarkList: [], //存储品牌数据
      spuImageList: [], //spu图片数据
      saleAttr: [], //销售属性
      inputVisible: "", //控制tag和input的切换
      attrIdAndAttrName: "", //收集未选择的销售属性的Id
    };
  },
  computed: {
    unSelectSaleAttr() {
      //计算出未选择的销售属性
      let result = this.saleAttr;
      if (this.spu.spuSaleAttrList) {
        result = this.saleAttr.filter((i) => {
          return this.spu.spuSaleAttrList.every((item) => {
            return i.name !== item.saleAttrName;
          });
        });
      }
      return result;
    },
  },
  methods: {
    handleRemove(file, fileList) {
      //收集照片墙图片的数据
      this.spuImageList = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlerSuccess(response, file, fileList) {
      this.spuImageList = fileList;
    },
    //点击父组件添加Spu按钮回调
    async addSpuData(id) {
      this.spu.category3Id = id;
      //获取品牌的信息
      let tradeMarkInfo = await this.$API.spu.reqTrademarkList();
      if (tradeMarkInfo.code === 200) {
        this.tradeMarkList = tradeMarkInfo.data;
      }
      //获取平台全部的销售属性
      let saleAttr = await this.$API.spu.reqSaleAttrList();
      if (saleAttr.code === 200) {
        this.saleAttr = saleAttr.data;
      }
    },
    //点击父组件修改初始化Spuform数据
    async initSpuData(spu) {
      //spu是父组件传递的数据
      //获取SPU数据
      let result = await this.$API.spu.reqSpu(spu.id);
      if (result.code === 200) {
        this.spu = result.data;
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
      //获取品牌的信息
      let tradeMarkInfo = await this.$API.spu.reqTrademarkList();
      if (tradeMarkInfo.code === 200) {
        this.tradeMarkList = tradeMarkInfo.data;
      }
      //获取平台全部的销售属性
      let saleAttr = await this.$API.spu.reqSaleAttrList();
      if (saleAttr.code === 200) {
        this.saleAttr = saleAttr.data;
      }
    },
    //添加新的销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(":");
      let newSaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      };
      this.spu.spuSaleAttrList.push(newSaleAttr);
      this.attrIdAndAttrName = "";
    },
    //添加属性值input框失去焦点
    handleInputConfirm(row) {
      if (row.inputValue.trim() === "") {
        this.$message("属性值不能为空");
        row.inputVisible = false;
        return;
      }
      let result = row.spuSaleAttrValueList.every(
        (item) => item.saleAttrValueName !== row.inputValue
      );

      if (!result) {
        this.$message("属性值不能重复");
        row.inputVisible = false;
        return;
      }
      let newSaleAttrValue = {
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: row.inputValue,
      };
      row.spuSaleAttrValueList.push(newSaleAttrValue);
      row.inputVisible = false;
    },
    //添加销售属性值的回调
    showInput(row, index) {
      this.$set(row, "inputVisible", true);
      this.$set(row, "inputValue", "");
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    //保存按钮回调
    async addOrUpdateSpu() {
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url,
        };
      });
      let result = await this.$API.spu.reqUpdateOrAddSpu(this.spu);
      if (result.code === 200) {
        this.$message.success(this.spu.id?'修改成功':'添加成功')
        this.$emit("changeSene", 0);
        Object.assign(this._data, this.$options.data());
      }
    },
    //点击起取消
    cancel() {
      this.$emit("changeSene", 0);
      Object.assign(this._data, this.$options.data());
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table ::v-deep {
  .el-table_2_column_7 {
    .cell {
      line-height: 42px;
    }
  }
  tr th .cell {
    text-align: center;
  }
}
.el-tag + .el-tag ::v-deep {
  margin: 5px 10px;
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