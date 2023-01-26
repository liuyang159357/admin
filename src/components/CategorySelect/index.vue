<template>
  <div class="categorySelect">
    <el-form v-model="idForm" :inline="true" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          v-model="idForm.category1Id"
          :disabled="!show"
          placeholder="请选择"
          @change="handler1"
        >
          <el-option
            v-for="item in list1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="一级分类">
        <el-select
          v-model="idForm.category2Id"
          :disabled="!show"
          placeholder="请选择"
          @change="handler2"
        >
          <el-option
            v-for="item in list2"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="一级分类">
        <el-select
          v-model="idForm.category3Id"
          :disabled="!show"
          placeholder="请选择"
          @change="handler3"
        >
          <el-option
            v-for="item in list3"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CategorySelect",
  props: ["show"],
  data() {
    return {
      list1: "",
      list2: "",
      list3: "",
      //收集分类id
      idForm: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
    };
  },
  mounted() {
    this.getCategoryList1();
  },
  methods: {
    //获取一级分类列表
    async getCategoryList1() {
      let result = await this.$API.attr.reqCategoryList1();
      if (result.code === 200) {
        this.list1 = result.data;
      }
    },
    //切换一级分类
    async handler1(id) {
      //清除二级，三级数据
      this.idForm.category2Id = "";
      this.list2 = [];
      this.idForm.category3Id = "";
      this.list3 = [];
      //父组件回调
      // this.$emit("getCategoryId", this.idForm);
      let result = await this.$API.attr.reqCategoryList2(id);
      if (result.code === 200) {
        this.list2 = result.data;
      }
    },
    //切换二级分类
    async handler2(id) {
      //清除三级数据
      this.idForm.category3Id = "";
      this.list3 = [];
      //父组件回调
      // this.$emit("getCategoryId", this.idForm);
      let result = await this.$API.attr.reqCategoryList3(id);
      if (result.code === 200) {
        this.list3 = result.data;
      }
    },
    //切换三级分类
    handler3(id) {
      //父组件回调
      this.$emit("getCategoryId", this.idForm);
    },
  },
};
</script>

<style>
</style>
