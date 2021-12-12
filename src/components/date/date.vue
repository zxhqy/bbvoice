<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="5"
          ><el-input v-model="uidForm.uid" placeholder="输入用户id进行查询">
              <el-button slot="append" icon="el-icon-search" @click="getUserdatalist"></el-button>
            </el-input
        ></el-col>
        <el-col :span="4"><el-button type="primary" @click="add">添加日程</el-button></el-col>
      </el-row>

      <el-table :data="userdatalist" border stripe>
        <el-table-column label="日程id" prop="tt_id"></el-table-column>
        <el-table-column label="日程内容" prop="tt_item"></el-table-column>
        <el-table-column label="开始时间" prop="tt_start"></el-table-column>
        <el-table-column label="结束时间" prop="tt_end"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope1">
            <el-button type="primary" icon="el-icon-edit" @click="changedate(scope1.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="deldate(scope1.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

      <el-dialog
      title="新增日程"
      :visible.sync="adddialogVisiblenew"
      width="30%"
    >
      <el-form
        :model="addForm"
        :rules="changeFormRules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-form-item label="用户id"  prop="uid">
          <el-input v-model="addForm.uid"></el-input>
        </el-form-item>
        <el-form-item label="日程内容"  prop="tt_item">
          <el-input v-model="addForm.tt_item"></el-input>
        </el-form-item>
                <el-form-item label="开始时间" prop="tt_start">
          <!-- <el-input  v-model.number="addForm.tt_start"></el-input> -->
            <div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="addForm.tt_start"
      type="datetime"
      placeholder="选择起始日期时间"
      value-format="yyyy-MM-dd HH:mm:ss"
      >
    </el-date-picker>
  </div>
        </el-form-item>
                <el-form-item label="结束时间" prop="tt_end">
          <!-- <el-input v-model.number="addForm.tt_end"></el-input> -->
                      <div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="addForm.tt_end"
      type="datetime"
      placeholder="选择结束日期时间"
      value-format="yyyy-MM-dd HH:mm:ss"
      >
    </el-date-picker>
  </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisiblenew = false">取 消</el-button>
        <el-button type="primary" @click="addDate_confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>


      <el-dialog
      title="确定删除日程吗!"
      :visible.sync="dialogVisibledel"
      width="15%"
    >
      <span slot="footer" >
        <el-button @click="dialogVisibledel = false">取 消</el-button>
        <el-button type="primary" @click="deldate_confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>

    <el-dialog
      title="修改日程信息"
      :visible.sync="changedialogVisible"
      width="30%"
    >
      <el-form
        :model="changeForm"
        :rules="changeFormRules"
        ref="changeFormRef"
        label-width="80px"
      >
        <el-form-item label="日程id"  prop="tt_id">
          <el-input v-model="changeForm.tt_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="日程内容"  prop="tt_item">
          <el-input v-model="changeForm.tt_item"></el-input>
        </el-form-item>
                <el-form-item label="开始时间" prop="tt_start">
          <!-- <el-input v-model="changeForm.tt_start"></el-input> -->
  <div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="changeForm.tt_start"
      type="datetime"
      placeholder="选择起始日期时间"
      value-format="yyyy-MM-dd HH:mm:ss"
      >
    </el-date-picker>
  </div>
        </el-form-item>
                <el-form-item label="结束时间" prop="tt_end">
          <!-- <el-input v-model="changeForm.tt_end"></el-input> -->
            <div class="block">
    <span class="demonstration"></span>
    <el-date-picker
      v-model="changeForm.tt_end"
      type="datetime"
      placeholder="选择结束日期时间"
      value-format="yyyy-MM-dd HH:mm:ss"
    
    >
    </el-date-picker>
  </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changedate_confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      addForm:{
        uid :'',
        tt_item : '',
        tt_start : '',
        tt_end : ''
      },
      uidForm: {
        uid: "",
      },
      delForm: {
        tt_id: '',
      },
      userdatalist: [],
      changedialogVisible: false,
      dialogVisibledel : false,
      adddialogVisiblenew : false,
      changeForm:{
        tt_id :'',
        tt_item : '',
        tt_start : '',
        tt_end : ''
      },
      changeFormRules:{
        tt_item :[
          {required : true,message :'请输入日程内容', trigger : 'blur'}
        ],
        uid :[
          {required : true,message :'请输入用户id', trigger : 'blur'}
        ],
        tt_start :[
          {required : true,message :'请输入起始日期时间', trigger : 'blur'}
        ],
        tt_end :[
          {required : true,message :'请输入结束日期时间', trigger : 'blur'}
        ],
      }
    };
  },

  methods: {
    add(){
      this.adddialogVisiblenew = true;
      if(this.uidForm.uid){this.addForm.uid = this.uidForm.uid}
    },
    async addDate_confirm(){
      this.$refs.addFormRef.validate(async valid =>{
      const { data: res } = await this.$http.post(
        "schedule/add",
        this.addForm,
        {
          headers: {
            Token: window.sessionStorage.getItem("token"),
          },
        }
      );
      if(res.code = !200){
        return this.$message.error("添加失败");        
      }else{
        this.$message.success("添加成功");
        this.adddialogVisiblenew = false
        if(this.uidForm.uid){this.getUserdatalist()}
      }
      });
    },
    deldate(a){
      this.dialogVisibledel = true;
      this.delForm.tt_id = a.tt_id
    },
    async deldate_confirm(){
      const { data: res } = await this.$http.post(
        "schedule/del",
        this.delForm,
        {
          headers: {
            Token: window.sessionStorage.getItem("token"),
          },
        }
      );
      if(res.code = !200){
        return this.$message.error("删除失败");        
      }else{
        this.$message.success("删除成功");
        this.dialogVisibledel = false
        this.getUserdatalist()
      }
    },
    changedate(a){
      this.changedialogVisible = true;
      this.changeForm.tt_id = a.tt_id;
      this.changeForm.tt_item = a.tt_item;
      this.changeForm.tt_start = a.tt_start;
      this.changeForm.tt_end = a.tt_end;
      console.log("changeForm")
      console.log(changeForm)
    },
    async changedate_confirm(){
      this.$refs.changeFormRef.validate(async valid =>{
      const { data: res } = await this.$http.post(
        "schedule/modify",
        this.changeForm,
        {
          headers: {
            Token: window.sessionStorage.getItem("token"),
          },
        }
      );
            if(res.code = !200){
        return this.$message.error("修改失败");        
      }else{
        this.$message.success("修改成功");
        this.changedialogVisible = false
        this.getUserdatalist()
      }
      });

      
    },

    async getUserdatalist() {
      const { data: res } = await this.$http.post(
        "schedule/timetable",
        this.uidForm,
        {
          headers: {
            Token: window.sessionStorage.getItem("token"),
          },
        }
      );
      if (res.code != 200) {
        return this.$message.error("获取失败");
      }
      // console.log(res.data);
       this.userdatalist = res.data;
      // console.log(this.userdatalist);
      this.addForm.uid = this.uidForm.uid;
    },
  },
};
</script>



<style lang="less" scoped>
</style>