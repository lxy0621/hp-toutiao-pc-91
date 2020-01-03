<template>
  <div class="container-image">
      <el-card>
          <div slot="header">
              <my-bread>素材管理</my-bread>
          </div>
          <div class="btn_box">
              <el-radio-group @change="changeColllect" v-model="filterParams.collect" size="small">
                  <el-radio-button :label="false">全部</el-radio-button>
                  <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
              <el-button @click="openDialog()" style="float:right" type="success" size="small">添加素材</el-button>
          </div>
          <!--图片列表-->
          <div class="img_list">
              <div class="img_item" v-for="item in images" :key="item.id">
                  <img :src="item.url" alt="">
                  <div class="option" v-if="!filterParams.collect">
                      <span @click="toggleStatus(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
                      <span @click="delImage(item.id)" class="el-icon-delete"></span>
                  </div>
              </div>
          </div>
          <!--分页区域-->
          <el-pagination
          background
          layout="prev,pager,next"
          :total="total"
          :current-page="filterParams.page"
          :page-size="filterParams.per_page"
          @current-change="changePager"
          :hide-on-single-page="true"
          >
          </el-pagination>
      </el-card>
      <!-- 对话框 -->
      <el-dialog title="上传素材" :visible.sync="dialogVisible" width="300px">
          <el-upload
          class="avatar-uploader"
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          :headers="headers"
          :show-file-list="false"
          :on-success="uploadSuccess"
          name="image"
          >
          <img v-if="imageUrl" :src="imageUrl" class="img-avatar"/>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
      </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
export default {
  data () {
    return {
      // 筛选参数
      filterParams: {
        // false 全部 true 收藏
        collect: false,
        page: 1,
        per_page: 10
      },
      // 图片列表数据
      images: [],
      total: 0,
      dialogVisible: false,
      // 预览图
      imageUrl: null,
      // headers 上传
      headers: {
        Authorization: `Bearer ${store.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    // 上传成功的回调函数
    uploadSuccess (res) {
      console.log(res)
      // 预览图片
      this.imageUrl = res.data.url
      // 成功的提示
      this.$message.success('上传成功')
      // 2s后关闭对话框 更新列表
      window.setTimeout(() => {
        this.dialogVisible = false
        // 更新列表
        this.getImages()
      }, 2000)
    },
    // 打开对话框
    openDialog () {
      this.dialogVisible = true
    },
    // 删除图片
    async delImage (id) {
      try {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除图片成功')
        this.getImages()
      } catch (e) {
        this.$message.success('删除图片失败')
      }
    },
    // 添加收藏 取消收藏
    async toggleStatus (item) {
      try {
        const {
          data: { data }
        } = await this.$http.put(`user/images/${item.id}`, {
          collect: !item.is_collected
        })
        this.$message.success(data.collect ? '添加收藏成功' : '取消收藏成功')
        // 修改星星颜色
        // 修改当前图片数据，is_collected 值改成后台返回值即可
        item.is_collected = data.collect
      } catch (e) {
        this.$message.error('操作失败')
      }
    },
    // 出来切换 全部与收藏
    changeColllect () {
      this.filterParams.page = 1
      this.getImages()
    },
    // 处理页码改变
    changePager (newPage) {
      this.filterParams.page = newPage
      this.getImages()
    },
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.filterParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style lang="less">
.btn_box{
    margin-bottom: 8px;
}
.img_list{
    .img_item{
        width: 180px;
        height: 180px;
        border:1px dashed #ddd;
        position: relative;
        display: inline-block;
        margin: 0 15px 10px;
        img{
            width: 100%;
            height: 100%;
            display: block;
        }
        .option{
            height:30px;
            width: 100%;
            background: rgba(0,0,0,.5);
            position: absolute;
            left:0;
            bottom:0;
            text-align: center;
            line-height: 30px;
            span{
                color:#fff;
                margin: 0 20px;
            }
            .red{
                color:red;
            }
        }
    }
}
</style>
