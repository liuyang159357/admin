<template>
  <div class="attr">
    <el-card style="margin: 20px 0">
      <CategorySelect
        :show="isShowTable"
        @getCategoryId="getCategoryId"
      ></CategorySelect>
    </el-card>
    <el-card>
      <div v-show="isShowTable">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 20px"
          :disabled="!idFrom.category3"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" border>
          <el-table-column type="index" align="center" label="序号" width="80">
          </el-table-column>
          <el-table-column
            align="center"
            prop="attrName"
            label="属性名称"
            width="150"
          >
          </el-table-column>
          <el-table-column prop="1" label="属性值列表">
            <template slot-scope="{ row }">
              <el-tag
                v-for="item in row.attrValueList"
                :key="item.categoryId"
                class="arrtList"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" prop="1" label="操作" width="150">
            <template slot-scope="{ row }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="editAttrValue(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteAttr(row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form
          v-model="attrInfo"
          ref="from"
          :inline="true"
          label-width="80px"
        >
          <el-form-item label="属性名">
            <el-input
              v-model="attrInfo.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
        <el-table
          :data="attrInfo.attrValueList"
          style="width: 100%; margin: 20px 0"
          border
        >
          <el-table-column type="index" label="序号" align="center" width="80">
          </el-table-column>
          <el-table-column label="属性值名称">
            <template slot-scope="{ row, $index }">
              <el-input
                v-if="row.flag"
                :ref="$index"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
                size="mini"
                @blur="toLook(row)"
                @keydown.enter.native="row.flag = false"
              ></el-input>
              <span
                v-else
                style="display: block"
                @click="toEdit(row, $index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="{ row, $index }">
              <!-- 气泡确认框 -->
              <el-popconfirm
                :title="`确定删除${row.valueName}吗？`"
                @onConfirm="deleteAttrValue($index)"
              >
                <el-button
                  slot="reference"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          :disabled="attrInfo.attrValueList.length < 1"
          type="primary"
          @click="addOrUpdateAttr"
          >保存</el-button
        >
        <el-button @click="isShowTable = true">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "ATTR",
  data() {
    return {
      //收集categorySelect组件三级数据
      idFrom: {},
      //平台属性数据
      attrList: [],
      //展示平台数据table
      isShowTable: true,
      //收集新增属性||修改属性数据
      attrInfo: {
        attrName: "", //属性名
        attrValueList: [
          // {
          //   attrId: 0,//属性值id
          //   valueName: ""//属性值
          // }
        ],
        categoryId: 0, //三级分类id
        categoryLevel: 3, //层级是三
      },
    };
  },
  methods: {
    //获取CategorySelect组件的id
    getCategoryId(id) {
      this.idFrom = id;
      this.getAttrList();
    },
    //获取属性列表
    async getAttrList() {
      let result = await this.$API.attr.reqAttrList(this.idFrom);
      if (result.code === 200) {
        this.attrList = result.data;
      }
    },
    //添加属性
    addAttr() {
      this.isShowTable = false;
      this.attrInfo = {
        //清空上次编辑的数据&&添加三级分类id
        attrName: "",
        attrValueList: [],
        categoryId: this.idFrom.category3,
        categoryLevel: 3,
      };
    },
    //修改属性值
    editAttrValue(row) {
      this.isShowTable = false;
      this.attrInfo = cloneDeep(row);
      //在修改某个属性的时候，给该属性的所有属性值添加flag标记
      this.attrInfo.attrValueList.forEach((i) => this.$set(i, "flag", false));
    },
    //删除属性
    deleteAttr(row) {
      console.log(row);
      this.$confirm(`确定删除${row.attrName}属性吗？`, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.attr.reqDeleteAttr(row.id);
          if (result.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getAttrList()
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //添加属性值
    addAttrValue() {
      //往attrValueList中添加元素
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        valueName: "",
        flag: true,
      });
      this.$nextTick(() => {
        this.$refs[this.attrInfo.attrValueList.length - 1].focus();
      });
    },
    //属性值输入框失去焦点
    toLook(row) {
      if (row.valueName.trim() === "") {
        this.$message("属性值不能为空");
        return;
      }
      //判断新增的属性值是否重复
      let isRepeat = this.attrInfo.attrValueList.some((i) => {
        if (row !== i) {
          return row.valueName === i.valueName;
        }
      });
      if (isRepeat) {
        this.$message("属性值不能重复");
        return;
      }
      row.flag = false;
    },
    //点击属性值出现input自动聚焦
    toEdit(row, $index) {
      row.flag = true;
      this.$nextTick(() => {
        this.$refs[$index].focus();
      });
    },
    //气泡框确认回调
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index, 1);
    },
    //保存对属性的修改或添加
    async addOrUpdateAttr() {
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(
        (item) => {
          if (item.valueName !== "") {
            delete item.flag;
            return true;
          }
        }
      );
      let result = await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo);
      console.log(result);
      if (result.code === 200) {
        this.$message.success("保存成功");
        this.getAttrList();
        this.isShowTable = true;
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