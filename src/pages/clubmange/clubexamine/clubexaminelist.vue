<template>
    <div class="container">
        <div class="club-search">
            <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="150px" class="phone-ruleForm">
                <el-form-item class="phone-label" label="手机号" prop="phone">
                    <el-input type="number" v-model="ruleForm.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="phone-label" label="俱乐部名称" prop="name">
                    <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="phone-label" label="状态" prop="status">
                    <el-select v-model="ruleForm.status" placeholder="请选择状态">
                        <el-option label="全部" value=""></el-option>
                        <el-option label="审核中" value="0"></el-option>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="未通过" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="check-btnbox">
                    <el-button @click="submitForm('ruleForm')">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="list-box">
            <div class="tab-content">  
                <div class="user-box">  
                    <el-table class="list-table"
                        :data="tableData1"
                        :header-row-class-name="headerclass"
                        :header-cell-class-name="headerclass"
                        highlight-current-row
                        style="width: 100%">
                        <el-table-column prop="name" label="俱乐部名称"></el-table-column>
                        <el-table-column prop="id" label="俱乐部编号"></el-table-column>
                        <el-table-column prop="status" label="状态">
                            <template slot-scope="scope">
                                <span>{{scope.row.examindStatus == 0 ? "审核中" : (scope.row.examindStatus == 1 ? '已通过' : '未通过')}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作">
                            <template slot-scope="scope">
                                <el-button class="examinebtn"
                                    size="mini"
                                    @click="examine(scope.row)">审核</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="block">
            <el-pagination
            :background="true"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageNo"
            :page-sizes="[10, 20, 30]"
            :page-size="pageSize"
            :pager-count="9"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
  import { auditList } from '@/api/club/club.js'
  export default{
    name: 'clubexaminelist',
    data() {
        return {
            ruleForm: {
                name: '',
                phone: '',
                status: '',
            },
            total: 0,
            pageNo: 1,
            pageSize: 10,
            tableData1: [],
            headerclass: 'headerclass'
        }
    },
    created() {
        this.getauditList();
    },
    methods: {
            submitForm(str){
                this.$refs[str].validate((flag) => {
                    if(flag){
                        this.getauditList();
                    }
                })
            },
            handleSizeChange(val){
                console.log('切换每页信息数量')
                this.pageSize = val;
                this.getauditList();
            },
            handleCurrentChange(val){
                console.log('切换页码')
                this.pageNo = val;
                this.getauditList();
            },
            changeTab(index){
                this.currentTab = index;
            },
            examine(row){
                this.$router.push({
                    path: 'clubapply',
                    name: 'clubexamineapply',
                    query: {
                        id: row.id
                    }
                })
            },
            // 审核列表
            getauditList(){
                let data = this.ruleForm;
                data.pageNo = this.pageNo;
                data.pageSize = this.pageSize;
                auditList(data).then(res =>{
                    if(res.code == 200){
                        this.tableData1 = res.data
                        this.total = res.total;
                    }
                })
            }
    },
  }
</script>
<style lang="stylus" scoped>
    .container
        width 100%;
        background-color: #fff;
        height 100%;
    .club-search
        width 100%;
        padding-top 20px;
        padding-left 30px
    .phone-ruleForm
        text-align left;
    /deep/ .phone-ruleForm .el-form-item__label
        width 100px!important;
        font-size: 16px;
        color: #002241;
        text-align: left;
        font-weight: bold;
        line-height: 40px;
    /deep/ .phone-ruleForm .el-form-item__content
        width 220px;
        height 40px;
        line-height: 40px;
        margin-left 0!important;
    .phone-btn
        background: #7DBFBC;
        border-radius: 14px;
        width 80px;
        height 35px;
        font-size: 14px;
        color: #FFFFFF;
        text-align: center;
        // line-height .05px;
        padding 0;
    .list-table
        padding: 0 30px;
    .block
        margin-top 40px;
    .opation
        font-size: 14px;
        color: #1B8668;
        text-align center;
        > span
            text-decoration: underline;
            cursor: pointer;
    .check-btnbox button
        width 80px;
        height 40px;
        line-height 40px;
        background: #7DBFBC;
        border-radius: 4px;
        color: #fff;
        padding: 0;
    /deep/ .headerclass
        background: #F5F6FA;
</style>
