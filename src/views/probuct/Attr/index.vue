<template>
  <div class="attr">
    <el-card style="margin: 20px 0">
      <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button type="primary" icon="el-icon-plus" style="margin-bottom: 10px"
          :disabled="!idFrom.category3">添加属性</el-button>
        <el-table :data="attrList" border>
          <el-table-column type="index" align="center" label="序号" width="80"> </el-table-column>
          <el-table-column align="center" prop="attrName" label="属性名称" width="150"> </el-table-column>
          <el-table-column prop="1" label="属性值列表">
            <template slot-scope="{row}">
              <el-tag v-for="item in row.attrValueList" :key="item.categoryId" class="arrtList">{{
                item.valueName
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="1" label="操作" width="150">
            <template>
              <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template> </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form v-model="attrInfo" ref="from" :inline="true" label-width="80px">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus">添加属性值</el-button>
        <el-button>取消</el-button>
        <el-table style="width: 100%;margin: 20px 0;" border>
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column label="属性值名称"></el-table-column>
          <el-table-column label="操作"></el-table-column>
        </el-table>
        <el-button type="primary">保存</el-button>
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ATTR",
  data() {
    return {
      //收集categorySelect组件三级数据
      idFrom: {},
      //平台属性数据
      attrList: [],
      //展示平台数据table
      isShowTable: false,
      //收集新增属性||修改属性数据
      attrInfo: {
        attrName: "",//属性名
        attrValueList: [
          {
            attrId: 0,//属性值id
            valueName: "string"//属性值
          }
        ],
        categoryId: 0,//三级分类id
        categoryLevel: 0,//层级是三
      }
    };
  },
  methods: {
    //获取CategorySelect组件的id
    getCategoryId(id) {
      this.idFrom = id;
      console.log(this.idFrom);
      this.getAttrList();
    },
    //获取属性列表
    async getAttrList() {
      let result = await this.$API.attr.reqAttrList(this.idFrom);
      if (result.code === 200) {
        this.attrList = result.data;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.attr {
  .el-table ::v-deep {

    tr th .cell {
      text-align: center;
    }

    span.arrtList {
      margin: 5px 10px;
    }
  }
}
</style>