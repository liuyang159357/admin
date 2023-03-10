<template>
  <div class="trademark">
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin: 10px 0"
      @click="showDialog"
      >添加品牌</el-button
    >
    <el-table style="width: 100%" :data="list" border>
      <el-table-column
        type="index"
        prop="prop"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="tmName"
        label="品牌"
        width=""
        align="center"
      ></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="" align="center">
        <template slot-scope="{ row }">
          <img :src="row.logoUrl" alt="logo" style="width: 120px" />
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="" align="center">
        <template slot-scope="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="small"
            @click="updateTradeMark(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="small"
            @click="deleteTraderMark(row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 20px; text-align: center"
      :current-page="page"
      :page-sizes="[5, 7, 9]"
      :page-size="limit"
      :total="total"
      layout="prev,pager,next,jumper,->,sizes,total"
      @current-change="changeCurrent"
      @size-change="changeSize"
    ></el-pagination>
    <!-- 对话框 -->
    <el-dialog
      :title="tmFrom.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form ref="ruleFrom" style="width: 80%" :model="tmFrom" :rules="rules">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input v-model="tmFrom.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="tmFrom.logoUrl" :src="tmFrom.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTradeMark"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      page: 1,
      limit: 5,
      total: 0,
      list: [],
      //对话框显示隐藏
      dialogFormVisible: false,
      //上传图片
      imageUrl: "",
      //收集品牌信息
      tmFrom: {
        tmName: "",
        logoUrl: "",
      },
      //表单验证规则
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请选择品牌图片" }],
      },
    };
  },
  mounted() {
    this.getPageLimit();
  },
  methods: {
    //获取列表数据
    async getPageLimit(page) {
      let result = await this.$API.trademark.reqTradeMarkList(
        page || this.page,
        this.limit
      );
      if (result.code === 200) {
        this.total = result.data.total;
        this.list = result.data.records;
      }
    },
    //添加品牌
    showDialog() {
      this.dialogFormVisible = true;
      this.tmFrom = { tmName: "", logoUrl: "" };
    },
    //修改品牌数据
    updateTradeMark(row) {
      this.dialogFormVisible = true;
      this.tmFrom = { ...row };
    },
    //切换page
    changeCurrent(page) {
      this.page = page;
      this.getPageLimit();
    },
    //改变limit
    changeSize(size) {
      this.limit = size;
      this.getPageLimit();
    },
    //上传图片相关回调
    handleAvatarSuccess(res, file) {
      this.tmFrom.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //添加或者修改品牌
    addOrUpdateTradeMark() {
      this.$refs.ruleFrom.validate(async (success) => {
        if (success) {
          this.dialogFormVisible = false;
          let result = await this.$API.trademark.reqAddOrUpdateTradeMark(
            this.tmFrom
          );
          if (result.code === 200) {
            this.$message.success(this.tmFrom.id ? "修改成功" : "添加成功");
            this.getPageLimit();
          }
        } else {
          this.$message.error("不符合条件！");
        }
      });
    },
    deleteTraderMark(row) {
      this.$confirm(`确定删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let result = await this.$API.trademark.reqDeleteTradeMark(row.id);
          if (result.code === 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            console.log(this.list.length);
            this.getPageLimit(this.list.length > 1 ? this.page : this.page - 1);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader ::v-deep.el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  display: block;
}
</style>
