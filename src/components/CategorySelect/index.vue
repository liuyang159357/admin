<template>
  <div class="categorySelect">
    <el-form v-model="idFrom" :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          v-model="idFrom.category1"
          placeholder="请选择"
          @change="handler1"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in this.list1"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="一级分类">
        <el-select
          v-model="idFrom.category2"
          placeholder="请选择"
          @change="handler2"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in this.list2"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="一级分类">
        <el-select
          v-model="idFrom.category3"
          placeholder="请选择"
          @change="handler3"
        >
          <el-option
            :label="item.name"
            :value="item.id"
            v-for="item in this.list3"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  data() {
    return {
      list1: "",
      list2: "",
      list3: "",
      //收集分类id
      idFrom: {
        category1: "",
        category2: "",
        category3: "",
      },
    };
  },
  mounted() {
    this.getCategoryList1();
  },
  methods: {
    //获取一级分类列表
    async getCategoryList1() {
      console.log(this.$API);
      let result = await this.$API.attr.reqCategoryList1();
      if (result.code === 200) {
        this.list1 = result.data;
      }
    },
    //切换一级分类
    async handler1(id) {
      //清除二级，三级数据
      this.idFrom.category2 = "";
      this.list2 = [];
      this.idFrom.category3 = "";
      this.list3 = [];
      //父组件回调
      // this.$emit("getCategoryId", this.idFrom);
      let result = await this.$API.attr.reqCategoryList2(id);
      if (result.code === 200) {
        this.list2 = result.data;
      }
    },
    //切换二级分类
    async handler2(id) {
      //清除三级数据
      this.idFrom.category3 = "";
      this.list3 = [];
      //父组件回调
      // this.$emit("getCategoryId", this.idFrom);
      let result = await this.$API.attr.reqCategoryList3(id);
      if (result.code === 200) {
        this.list3 = result.data;
      }
    },
    //切换三级分类
    handler3(id) {
      //父组件回调
      this.$emit("getCategoryId", this.idFrom);
    },
  },
};
</script>

<style>
</style>
