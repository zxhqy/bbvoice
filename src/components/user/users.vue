<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="10"
          ><el-input v-model="input" placeholder="Please input">
            <template #prepend> </template>
            <template #append>
              <el-button icon="el-icon-search"></el-button>
            </template> </el-input
        ></el-col>
        <el-col :span="4"></el-col>
      </el-row>

      <el-table :data="userlist" border stripe >
        <el-table-column label="序号" type="index" width="60" ></el-table-column>
        <el-table-column label="用户id" prop="user_id" ></el-table-column>
        <el-table-column label="用户open-id" prop="open_id" ></el-table-column>
      </el-table>


    </el-card>
  </div>
</template>


<script>
export default {
  data(){
      return{
          int : 1,
          userlist : [],
          total : 0
      }
  },
  created(){
      this.getUserlist()
  },
  methods: {
      async getUserlist(){
         const {data:res} = await this.$http.get('schedule/users',{
           headers :{
             'Token':  window.sessionStorage.getItem('token'),
           }
         });
         if(res.code != 200){
           return this.$message.error('获取失败');
         }
         console.log(res)
          this.userlist = res.data;
           console.log(this.userlist)
          
         
      }
  }
};
</script>



<style lang="less" scoped>
</style>