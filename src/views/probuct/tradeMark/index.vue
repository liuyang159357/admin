<template>
  <div class="trademark">
    <el-button type="primary" icon="el-icon-plus" style="margin-top: 10px"
      @click="dialogFormVisible = true">添加</el-button>
    <el-table style="width: 100%" :data="list" border>
      <el-table-column type="index" prop="prop" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="tmName" label="品牌" width="" align="center"></el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="" align="center">
        <template slot-scope="{row}">
          <img :src="row.logoUrl" alt="" style="width:120px;">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="" align="center">
        <template>
          <el-button type="warning" icon="el-icon-edit" size="small" @click="dialogFormVisible = true">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination style="margin-top: 20px; text-align:center" :current-page="1" :page-sizes="[5, 7, 9]" :page-size="3"
      :total="99" layout="prev,pager,next,jumper,->,sizes,total" @current-change="changeCurrent"
      @size-change="changeSize"></el-pagination>
    <!-- 对话框 -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form style="width:80%">
        <el-form-item label="品牌名称" label-width="100px">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px">
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      imageUrl: ''
    }
  },
  mounted() {
    this.getPageLimit()
  },
  methods: {
    //获取列表数据
    async getPageLimit() {
      let result = await this.$API.trademark.reqTradeMarkList(this.page, this.limit)
      if (result.code === 200) {
        this.total = result.data.total;
        this.list = result.data.records
      }
    },
    //切换page
    changeCurrent(page) {
      this.page = page
      this.getPageLimit()
    },
    //改变limit
    changeSize(size) {
      this.limit = size
      this.getPageLimit()
    },
    //上传图片相关回调
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  }

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
    border-color: #409EFF;
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
    height: 178px;
    display: block;
  }

</style>
