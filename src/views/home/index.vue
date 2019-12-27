<template>
  <el-container class="my-container">
    <el-aside :width="isOpen?'200px':'64px'">
      <!-- logo -->
      <div class="logo" :class="{minLogo:!isOpen}"></div>
      <!-- 导航菜单 -->
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#002033"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="!isOpen"
        :collapse-transition="false"
        router
      >
        <el-menu-item index="/">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/article">
          <i class="el-icon-document"></i>
          <span slot="title">内容管理</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture"></i>
          <span slot="title">素材管理</span>
        </el-menu-item>
        <el-menu-item index="/publish">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
        <el-menu-item index="/comment">
          <i class="el-icon-chat-dot-round"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="/fans">
          <i class="el-icon-present"></i>
          <span slot="title">粉丝管理</span>
        </el-menu-item>
        <el-menu-item index="/setting">
          <i class="el-icon-setting"></i>
          <span slot="title">个人设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <span @click="toggleAside" class="icon el-icon-s-fold"></span>
        <span class="text">江苏传智播客科技教育有限公司</span>
        <!-- 下拉菜单组件 -->
        <el-dropdown class="my-dropdown">
          <span class="el-dropdown-link">
            <img class="avatar" :src="photo" alt />
            <span class="name">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <!-- vue基础知识  插槽 -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-setting" @click.native="setting()">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-unlock" @click.native="logout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import store from '@/store'
export default {
  name: '',
  data: function () {
    return {
      // 表示左菜单是展开还是收起
      isOpen: true,
      name: '',
      photo: ''
    }
  },
  created () {
    const user = store.getUser()
    this.name = user.name
    this.photo = user.photo
  },
  methods: {
    setting () {
      this.$router.push('/setting')
    },
    logout () {
      store.delUser()
      this.$router.push('/login')
    },
    toggleAside () {
      this.isOpen = !this.isOpen
    }
  }
}
</script>

<style scoped lang='less'>
// 标签选择器  渲染后显示组件的html标签  不是当前的自定义标签
// 渲染后的标签上 有一个类 类的名称和自定义标签（组件）的名称一致
// FE  front end  前端简写
.my-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  .el-aside {
    background: #002033;
  }
  .el-header {
    border-bottom: 1px solid #ddd;
  }
}
.el-header {
  border-bottom: 1px solid #ddd;
  line-height: 60px;
  .icon {
    font-size: 24px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
  .my-dropdown {
    float: right;
    .avatar {
      width: 30px;
      height: 30px;
      vertical-align: middle;
    }
    .name {
      color: #333;
      font-weight: bold;
      vertical-align: middle;
    }
  }
}
.el-aside {
  background: #002033;
  .logo {
    width: 100%;
    height: 60px;
    background: #002244 url(../../assets/logo_admin.png) no-repeat center /
      140px auto;
  }
  .minLogo{
      background-image: url(../../assets/logo_admin_01.png);
      background-size: 36px auto;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
