<template>
  <div class="manage">
    <div>项目经理考试</div>
    
    <my-form @change="formChange">
      <div>
          <my-form-item class="content" name="content">
            <a-input placeholder="题目"></a-input>
          </my-form-item>
          <my-form-item class="select" name="questionType">
            <a-select @change="typeSelect" :value="query.questionType" class="select" :options="options"></a-select>
        
          </my-form-item>
      </div>
    </my-form>
    
    
    <a-list item-layout="vertical" :data-source="data" :pagination="{...page}">
      <template #renderItem="{item,index}">
        <a-list-item class="item">
          <a-row>
            <a-col :span="18">
              <a-list-item-meta>
                <template #title>
                  <div class="content">{{index+1+(page.current-1)*page.pageSize}}、{{ item.content }}</div>
                </template>
                <template #description>
                  <template v-for="(type,i) in ansType" :key="i">
                    <div v-if="item[type]" class="description">{{type}}、{{ item[type] }}</div>
                  </template>
                </template>
              </a-list-item-meta>
            </a-col>
            <a-col :span="6">
              <div class="type">{{ item.type }}</div>
            </a-col>
          </a-row>
          
          <div class="ans">答案：{{item.ans}}</div>
        </a-list-item>
      </template>
      
    </a-list>
    <a-button v-on:click="nextPage">下一页</a-button>
  </div>
</template>

<script>
import { Button, List,Row,Col,Select,Input } from "ant-design-vue";
import axios from "axios";
import MyForm,{MyFormItem} from '@/components/my_form'
export default {
  name: "ManageTest",
  props: {
    msg: String
  },
  data() {
    return {
      ansType:["A","B","C","D","E","F","G","H"],
      query:{
        questionType:"choice",
      },
      options:[{
        value:"choice",
        label:"单选"
      },
      {
        value:"multiSelect",
        label:"多选"
      }],
      data: [],
      page: {
        current: 1,
        pageSize: 10,
        total:0,
        onChange:this.nextPage
      },
     
    }
  },
  created: function() {
   
    axios
      .post("http://192.168.142.1:5000/projectExam", { page: 
          {current:this.page.current,
          pageSize:this.page.pageSize} ,
          ...this.query
        })
      .then(res => {
        if(res.data){
          this.data = res.data.data;
          this.page.total=res.data.total
        }
      });
  },
  methods: {
    test:function(value){
      console.log(value,'dsdsf',this.$options)

    },
    formChange:function(values){
      this.query={
        ...this.query,
        ...values
      }
      this.nextPage(1,this.page.pageSize)
    },
    typeSelect:function(value,i){
      
      this.query.questionType=value
      this.nextPage(1,this.page.pageSize)
    },
    nextPage: function(current,pageSize) {
      this.page.current=current;
      axios
        .post("http://192.168.142.1:5000/projectExam", { page: {current,pageSize},...this.query })
        .then(res => {
          if(res.data){
            this.data = res.data.data;
            this.page.total=res.data.total
          }
        });
    }
  },
  components: {
    AButton: Button,
    AList: List,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta,
    ARow:Row,
    ACol:Col,
    ASelect:Select,
    AInput:Input,
    MyForm,
    MyFormItem
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manage{
  margin: 0 30px;
}
.select{
  width: 100px;

}
.content{
  text-align: start;
  width: 300px;
  margin-bottom: 15px;
}
.description {
  text-align: start;
}
.item {
  width: 100%;
}
.type{
  text-align: end;
}
.ans{
  text-align: start;
}
a {
  color: #42b983;
}
</style>
