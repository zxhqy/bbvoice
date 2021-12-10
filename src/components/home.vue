<template>
  <el-container class="home-container">
    <el-header>
      <div>
        <span>蚌埠语音管理后台</span>
      </div>
      <el-button type="info" @click="logout">退出系统</el-button>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#ffd04b"
          router="true"
          :default-active="activePath"
        >
          <el-menu-item index="users" @click="saveNavState('users')">
            <i class="el-icon-user"></i>
            <span slot="title">用户概览</span>
          </el-menu-item>

          <el-menu-item index="date" @click="saveNavState('date')">
            <i class="el-icon-menu"></i>
            <span slot="title">用户日程</span>
          </el-menu-item>

          <el-menu-item index="course" @click="saveNavState('course')">
            <i class="el-icon-school"></i>
            <span slot="title">课表管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>








<script>
export default {
  data(){
    activePath:''
  },
  created(){
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    saveNavState(activePath){
      window.sessionStorage.setItem('activePath', activePath)
    }
  },
};
</script>









<style lang="less" scoped>
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 30px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background-color: #eaedf1;
}
.home-container {
  height: 100%;
}
</style>