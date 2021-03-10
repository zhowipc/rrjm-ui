<template>
  <div>
    <el-card class="box-card" style="height:82vh">
      <div slot="header" class="clearfix">
        <h3>个人信息</h3>
      </div>
      <div
        style="display:flex; justify-content: space-around;width:100%; margin-top:30px"
      >
        <div style="flex:2">
          <div style="display:flex;justify-content: center; ">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="user.avatar" :src="user.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div style="flex:3">
          <el-form
            label-position="right"
            label-width="80px"
            :ref="form"
            :rules="rules"
            :model="admin"
          >
            <el-form-item label="用户名">
              <el-input disabled v-model="admin.username" />
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="admin.nickName" />
            </el-form-item>
            <el-form-item label="性别">
              <template>
                <div>
                  <el-radio-group v-model="admin.sex">
                    <el-radio label="0">男</el-radio>
                    <el-radio label="1">女</el-radio>
                  </el-radio-group>
                </div>
              </template>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="admin.email"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="admin.phone"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="admin.remark" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUserInfo"
                >修改信息</el-button
              >
              <el-button @click="qu">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div style="flex:1"></div>
        <div style="flex:3">
          <el-form
            :rules="passrules"
            label-position="right"
            label-width="80px"
            :ref="update"
            :model="update"
          >
            <el-form-item label="旧密码" prop="oldpass">
              <el-input type="password" v-model="update.oldpass"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="update.pass"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="pass2">
              <el-input type="password" v-model="update.pass2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updatePass">修改密码</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import userApi from "@/api/auth/user";
import loginApi from "@/api/login";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {

        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.update.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: {},
      admin: {},
      update: {oldpass:'',pass:'',pass2:''},
      form: {},
      admin2: {},
      action: process.env.VUE_APP_BASE_API + "/toss/fileoss",
      headers: {
        Authorization: this.authApi.getToken()
      },
      passrules: {
        oldpass: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        pass: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator: validatePass, trigger: "blur" }
        ],
        pass2: [
          { validator: validatePass2, trigger: "blur" },
          { required: true, message: "请再次输入密码", trigger: "blur" }
        ]
      },
      rules: {
        email: [
          { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.initAdmin();
  },
  methods: {
    updatePass() {
      this.$refs[update].validate(valid => {
        if (valid) {
          userApi.modifiedPass(update.oldpass, update.pass).then(resp => {
            if (resp.code === 20000) {
              loginApi.logout();
              this.authApi.remoceToken();
              this.authApi.removeCurrentUser();
              this.$store.commit("INIT_ROUTES", []);
              this.$router.replace("/");
            }
          });
        }
      });
    },
    updateUserInfo() {
      this.$refs[form].validate(valid => {
        if (valid) {
          userApi.updateInfo(this.admin).then(resp => {
            this.initAdmin();
          });
        }
      });
    },
    qu() {
      console.log(this.user);
      this.admin = Object.assign(this.admin, this.user);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = res.obj;
    },
    initAdmin() {
      userApi.info().then(resp => {
        this.user = resp.obj;
        this.admin = Object.assign({}, this.user);
        this.authApi.setCurrentUser(JSON.stringify(resp.obj));
        this.$store.commit("INIT_ADMIN", resp.obj);
      });
    }
  }
};
</script>
<style scoped>
.avatar-uploader .el-upload {
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
  height: 178px;
  display: block;
}
</style>
