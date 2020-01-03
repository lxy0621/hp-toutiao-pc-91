<template>
  <div class="container-comment">
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <el-table :data="comments">
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.comment_status" @click="toggleStatus(scope.row)" type="success" size="small">打开评论</el-button>
            <el-button v-else type="danger" @click="toggleStatus(scope.row)" size="small">关闭评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="changePager"
        hide-on-single-page
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reqParams: {
        page: 1,
        per_page: 20,
        response_type: 'comment'
      },
      comments: [],
      total: 0
    }
  },
  created () {
    this.getComments()
  },
  methods: {
    async toggleStatus (row) {
      try {
        const { data: { data } } = await this.$http.put(`comments/status?article_id=${row.id}`, {
          allow_comment: !row.comment_status
        })
        // 成功   提示  更新列表（局部更新  修改当前行数据中的状态）
        this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
        row.comment_status = data.allow_comment
      } catch (e) {
        this.$message.default('操作失败')
      }
    },
    async getComments () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.comments = data.results
      this.total = data.total_count
    },
    changePager (newPage) {
      this.reqParams.page = newPage
      this.getComments()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
