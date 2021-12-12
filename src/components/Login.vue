<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar"><img src="../assets/1.jpg" ></div>
            <el-form ref="loginref" :model="loginForm" :rules="loginrules" class="login_form">

            <el-form-item prop="aid" >
            <el-input v-model="loginForm.aid" prefix-icon="el-icon-user-solid"></el-input>
            </el-form-item>

            <el-form-item prop="apwd" >
            <el-input v-model="loginForm.apwd" prefix-icon="el-icon-lock" type="apwd" show-password></el-input>
            </el-form-item>

             <el-form-item class="btns">
                <el-button type="primary" @click="login">登录</el-button>
                <el-button type="info" @click="resetFields">重置</el-button>
            </el-form-item>

            </el-form>
        </div >
    </div>   
</template>







<script>
export default {  
    data(){
        return{
            loginForm:{
                aid:'',
                apwd:''
            },

            loginrules:{
                aid:[ {required: true, message: '请输入账号', trigger: 'blur'}],
                apwd:[{ required: true, message: '请输入密码', trigger: 'blur'}]
            }
        }
    },
    methods:{

        resetFields(){
            this.$refs.loginref.resetFields();
        },

        login(){
            this.$refs.loginref.validate(async valid =>{
                if(!valid) return;
                const res = await this.$http.post('/login',this.loginForm);
                console.log(res.data);
                if(res.data.code !== 200){return this.$message.error('登录失败');}
                else this.$message.success('登录成功');
                window.sessionStorage.setItem('token',res.data.data);
                this.$router.push('/home')
                });

        }

    }
}
</script>








<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width:450px;
    height: 300px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.avatar{
 position: absolute;
 left:50%;

 transform: translate(-50%,-50%);
}
.avatar img{
    height: 130px;
    width: 130px;
    border:2px solid hsl(258, 76%, 51%);
    border-radius: 50%;
}
.btns{
    display: flex;
    justify-content: flex-end;
}
.login_form{
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}
</style>