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
          userlist : [{
            user_id:'1',
            open_id:'1'
          },
          {
            user_id:'2',
            open_id:'2'
          },
          {
            user_id:'3',
            open_id:'4'
          },
          {
            user_id:'5',
            open_id:'6'
          }
          ],
          total : 0
      }
  },
  created(){
      this.getUserlist()
  },
  methods: {
      async getUserlist(){
         const {data:res} = await this.$http.get('schedule/users');
         console.log(res);
         if(res.data.code != 200){
           return this.$message.error('获取失败');
         }
          this.userlist = res.data.list;
          
         
      }
  }
};
</script>



<style lang="less" scoped>
</style>