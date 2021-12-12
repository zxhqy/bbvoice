<template>
  <div>
    <el-card>
      <el-row>
        <el-col :span="10">  <el-button type="primary" @click="adddialogVisiblenew = true">添加课程</el-button></el-col>
      </el-row>

      <el-table :data="courselist" empty-text="正在加载，请稍后!" border stripe>
        <el-table-column label="课程id(courseid)" prop="course_id"></el-table-column>
        <el-table-column label="课程id(classid)" prop="class_id"></el-table-column>
        <el-table-column label="课程名" prop="course_name"></el-table-column>
        <el-table-column label="课程星期" prop="class_day"></el-table-column>
        <el-table-column label="课程节数" prop="class_time"></el-table-column>
        <el-table-column label="课程地点" prop="location"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope" >
            <el-button type="primary" @click="change(scope.row)" icon="el-icon-edit"></el-button>
            <el-button type="danger" @click="del(scope.row)" icon="el-icon-delete"></el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-card>

      <el-dialog
      title="新增课程"
      :visible.sync="adddialogVisiblenew"
      width="30%"
    >
      <el-form
        :model="addCourse"
        :rules="changeCourseRules"
        ref="addFormRef"
        label-width="80px"
      >
        <el-form-item label="courseid"  prop="course_id">
          <el-input v-model="addCourse.course_id"></el-input>
        </el-form-item>
        <el-form-item label="课程地点"  prop="location">
          <el-input v-model="addCourse.location"></el-input>
        </el-form-item>
                <el-form-item label="课程星期" prop="class_day">
          <el-input  v-model.number="addCourse.class_day"></el-input>
        </el-form-item>
                <el-form-item label="课程节数" prop="class_time">
          <el-input v-model.number="addCourse.class_time"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisiblenew = false">取 消</el-button>
        <el-button type="primary" @click="addCourse_confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>

      <el-dialog
      title="修改课程信息"
      :visible.sync="adddialogVisible"
      width="30%"
    >
      <el-form
        :model="changeCourse"
        :rules="changeCourseRules"
        ref="changeFormRef"
        label-width="80px"
      >
        <el-form-item label="classid"  prop="class_id">
          <el-input v-model="changeCourse.class_id" disabled></el-input>
        </el-form-item>
        <el-form-item label="courseid"  prop="course_id">
          <el-input v-model="changeCourse.course_id"></el-input>
        </el-form-item>
        <el-form-item label="课程地点"  prop="location">
          <el-input v-model="changeCourse.location"></el-input>
        </el-form-item>
                <el-form-item label="课程星期" prop="class_day">
          <el-input  v-model.number="changeCourse.class_day"></el-input>
        </el-form-item>
                <el-form-item label="课程节数" prop="class_time">
          <el-input v-model.number="changeCourse.class_time"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adddialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="change_confirm"
          >确 定</el-button
        >
      </span>
    </el-dialog>



      <el-dialog
      title="确定删除该课程吗!"
      :visible.sync="adddialogVisibledel"
      width="15%"
    >
      <span slot="footer" >
        <el-button @click="adddialogVisibledel = false">取 消</el-button>
        <el-button type="primary" @click="del_confirm"
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
      int: 1,
      courselist: [],
      total: 0,
      adddialogVisible : false,
      adddialogVisibledel :false,
      adddialogVisiblenew : false,
      changeCourseRules:{
        course_id :[
          {required : true,message :'请输入课程id(course_id)', trigger : 'blur'}
        ],
        location :[
          {required : true,message :'请输入课程地点', trigger : 'blur'}
        ],
        class_day :[
          {required : true,message :'请输入课程星期', trigger : 'blur'},
          {type : 'number' ,message :'请输入数字', trigger : 'blur'},
        ],
        class_time :[
          {required : true,message :'请输入课程节数', trigger : 'blur'},
          {type:'number',message :'请输入数字', trigger : 'blur'}
        ]
      },
      changeCourse:{
        class_id : '',
        course_id :'',
        location :'',
        class_day :0,
        class_time :0
      },
      delCourse:{
        class_id : ''
      },
      addCourse:{
        course_id :'',
        location :'',
        class_day :'',
        class_time :''
      }
    };
  },
  created() {
     this.getcourselist();
  },
  methods: {
    change(a){
      this.adddialogVisible = true;
      console.log(a)
      this.changeCourse.class_id = a.class_id;
      this.changeCourse.course_id = a.course_id;
      this.changeCourse.location = a.location;
      this.changeCourse.class_day = a.class_day;
      this.changeCourse.class_time = a.class_time;
      console.log(this.changeCourse)
    },
    del(a){
      this.adddialogVisibledel = true;
      console.log(a)
      this.delCourse.class_id = a.class_id;
      console.log(this.delCourse)
    },
    async change_confirm(){
      this.$refs.changeFormRef.validate(async valid =>{
      console.log(this.changeCourse)
      const { data: res } = await this.$http.post(
        "course/modify",
        this.changeCourse,
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
        this.adddialogVisible = false;
        this.getcourselist()
      }
      });
    },
    async del_confirm(){
      const { data: res } = await this.$http.post(
        "course/del",
        this.delCourse,
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
        this.adddialogVisibledel = false
        this.getcourselist()
      }


    },
    async addCourse_confirm(){
      this.$refs.addFormRef.validate(async valid =>{
      const { data: res } = await this.$http.post(
        "course/add",
        this.addCourse,
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
        this.getcourselist()
      }      

        });
    },
    async getcourselist() {
      const { data: res } = await this.$http.get("course",{
           headers :{
             'Token':  window.sessionStorage.getItem('token'),
           }
         });
      console.log(res);
      if (res.code != 200) {
        return this.$message.error("获取失败");
      }
      // this.courselist = res.data;
      let courselist = [];
      for (let index = 0; index < res.data.length; index++) {
        for (let i = 0; i < res.data[index].length; i++) {
          if(res.data[index][i]){
            courselist.push(res.data[index][i])
          }
        }
        this.courselist = courselist;
        
      }
      console.log(this.courselist);
    },
  },
};
</script>



<style lang="less" scoped>
</style>