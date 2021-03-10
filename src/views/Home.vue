<template>
  <el-container>
    <el-header class="homeHeader">
      <div class="title" @click="test11()">
        测试管理系统
      </div>
      <el-dropdown trigger="click" class="userInfo" @command="commandHandler">
        <span class="el-dropdown-link">
          {{ user.nickName }}<i><img :src="user.avatar"/></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
          <!-- <el-dropdown-item command="setting">设置</el-dropdown-item> -->
          <el-dropdown-item command="logout">注销登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container>
      <el-aside style="width:17%;min-width:180px">
        <el-menu router unique-opened>
          <el-submenu
            :index="index + ''"
            v-for="(item, index) in routes"
            :key="index"
          >
            <template slot="title">
              <i
                :class="item.icon"
                style="color: #1accff;margin-right: 5px"
              ></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item
              :index="children.path"
              v-for="(children, indexj) in item.children"
              :key="indexj"
              >{{ children.name }}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main style="height: 90vh">
        <router-view class="homeRouterView" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import loginApi from "@/api/login";
import userApi from "@/api/auth/user";

export default {
  name: "Home",
  computed: {
    routes() {
      return this.$store.state.routes;
    },
    user() {
      return this.authApi.getCurrentUser();
    }
  },
  methods: {
    test11() {
      console.log(this.user);
    },
    commandHandler(command) {
      if (command === "logout") {
        this.$confirm("是否退出登录?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          loginApi.logout().then(() => {
            this.authApi.removeCurrentUser();
            this.authApi.removeToken();
            this.$store.commit("INIT_ROUTES", []);
            this.$router.replace("/");
          });
        });
      }
      if (command === "userinfo") {
        this.$router.replace("/info");
      }
    }
  }
};
</script>

<style scoped>
.asideContainer {
  height: 90vh;
  width: 30%;
}

.homeHeader {
  background: #c6dcfa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}
.homeHeader .userInfo {
  cursor: pointer;
}
.el-dropdown-link img {
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}
.homeHeader .title {
  font-size: 30px;
  font-family: 华文楷体;
  color: white;
}
.homeRouterView {
  margin-top: 10px;
}
</style>
