<template>
    <el-button type="info" @click="logout">exit</el-button>
</template>








<script>
export default {
    data:{

    },
    methods:{
        logout(){
            window.sessionStorage.clear();
            this.$router.push('/login');
        }
    }
}
</script>









<style lang="less" scoped>

</style>