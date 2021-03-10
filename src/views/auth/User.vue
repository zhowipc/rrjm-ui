<template>
  <div>
    <div style="display: flex; justify-content: center;margin-top: 20px">
      <el-button
        icon="el-icon-plus"
        type="success"
        style="margin-right:20px"
        @click="showAddView"
        >添加</el-button
      >
      <el-input
        v-model="search.nickName"
        placeholder="通过昵称搜索用户..."
        prefix-icon="el-icon-search"
        style="width: 400px;margin-right: 10px"
      ></el-input>
      <el-button icon="el-icon-search" type="primary" @click="getAllUserByCond"
        >搜索</el-button
      >
    </div>
    <div class="admin-container">
      <el-card class="admin-card" v-for="(user, index) in users" :key="index">
        <div slot="header" class="clearfix">
          <span>{{ user.nickName }}</span>
          <el-button
            style="float: right; padding: 3px 0;color:red;"
            type="text"
            icon="el-icon-delete"
            @click="delUser(user)"
          ></el-button>
        </div>
        <div>
          <div class="img-container">
            <img
              :src="user.avatar"
              :alt="user.nickName"
              :title="user.nickName"
              class="userFace-img"
            />
          </div>
          <div class="userinfo-container">
            <div><span>用户名</span>:{{ user.username }}</div>
            <div><span>手机号码</span>:{{ user.phone }}</div>
            <div><span>地址</span>:{{ user.address }}</div>
            <div><span>创建时间</span>:{{ user.gmtCreate }}</div>
            <div>
              <span>性别</span>:
              <span v-if="user.sex == '1'">男</span>
              <span v-else>女</span>
            </div>
            <div>
              <span>用户状态</span>:
              <el-switch
                @change="enabledChange(admin)"
                v-model="user.status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                active-value="1"
                inactive-text="禁用"
                inactive-value="0"
              >
              </el-switch>
            </div>
            <div>
              <span>用户角色</span>:
              <el-tag
                type="success"
                v-for="(role, index) in user.roles"
                :key="index"
                style="margin-right: 5px"
                >{{ role.name }}
              </el-tag>
              <el-popover
                placement="right"
                title="角色列表"
                width="200"
                @show="showPop(user)"
                @hide="hidePop(user)"
                trigger="click"
              >
                <el-select
                  v-model="selectedRoles"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="(r, index) in allRoles"
                    :key="index"
                    :label="r.name"
                    :value="r.id"
                  >
                  </el-option>
                </el-select>
                <el-button
                  type="text"
                  slot="reference"
                  icon="el-icon-more"
                ></el-button>
              </el-popover>
            </div>
            <div><span>备注</span>: {{ user.remark }}</div>
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="500px">
      <div></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import userApi from "@/api/auth/user";
import roleApi from "@/api/auth/role";
export default {
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value === undefined) callback(new Error("请输入用户名"));
      else {
        userApi.checkUsername(value).then(resp => {
          if (resp.code !== 20000) {
            callback(new Error("用户名已存在，请更换"));
          }
          callback();
        });
      }
    };
    return {
      title: "",
      dialogVisible: false,
      users: [],
      search: {},
      allRoles: [],
      selectedRoles: []
    };
  },
  created() {
    this.getAllUserByCond();
  },
  methods: {
    showAddView() {
      this.dialogVisible = true;
    },
    getAllUserByCond() {
      userApi.getAllUserByCond(this.search).then(resp => {
        this.users = resp.obj;
      });
    },
    delUser(user) {
      this.$confirm("是否永久删除【" + user.nickName + "】用户？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userApi.delUser(user).then(resp => {
            this.getAllUserByCond();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getAllRoles() {
      roleApi.getAllRoles().then(resp => {
        this.allRoles = resp.obj;
      });
    },
    showPop(user) {
      this.getAllRoles();
      let roles = user.roles;
      this.selectedRoles = [];
      roles.forEach(r => {
        this.selectedRoles.push(r.id);
      });
    },
    hidePop(user) {
      let roles = [];
      Object.assign(roles, user.roles);
      let flag = false;
      if (roles.length != this.selectedRoles.length) flag = true;
      else {
        for (let i = 0; i < roles.length; i++) {
          let role = roles[i];
          for (let j = 0; j < this.selectedRoles.length; j++) {
            let sr = this.selectedRoles[j];
            if (role.id == sr) {
              roles.splice(i, 1);
              i--;
              break;
            }
          }
        }
      }
      if (roles.length != 0) flag = true;
      if (flag) {
        console.log(typeof user.id);
        userApi.updateUserRoles(user.id, this.selectedRoles).then(resp => {
          this.getAllUserByCond();
        });
      }
    }
  }
};
</script>
<style scope>
.layo {
  display: flex;
}
.admin-card {
  width: 300px;
  margin-bottom: 20px;
}
.admin-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 20px;
}
.userFace-img {
  width: 72px;
  height: 72px;
  border-radius: 40px;
}
.imgs {
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 8px;
}

.img-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.userinfo-container {
  font-size: 12px;
  color: #7fadff;
}
</style>
