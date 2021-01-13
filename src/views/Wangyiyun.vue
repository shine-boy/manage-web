<template>
  <div class="wangyiyun">
    <div>网易云热门评论</div>
    <a-list item-layout="vertical" :data-source="data" :pagination="{...page}">
      <template #renderItem="{item={}}">
        <a-list-item class="item">
          <a-list-item-meta>
            <template #description>
              <div class="description">{{ item.comments[0].content }}</div>
              <a-button v-on:click="deleteone(item)"> 删除</a-button>
            </template>
            <template #title>
              <div class="title">
                <a target="_blank" :href="item.url">{{ item.name }}</a>
              </div>
            </template>
            <template #avatar>
              <a-avatar
                :src="
                  item.comments[0].pendantData
                    ? item.comments[0].pendantData.imageUrl
                    : 'https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                "
              />
            </template>
          </a-list-item-meta>
          <div>{{ item.type }}</div>
        </a-list-item>
      </template>
    </a-list>
   
  </div>
</template>

<script>
import { Button, List, Avatar } from "ant-design-vue";
import axios from "axios";
// import { reactive } from 'vue'
export default {
  name: "Wangyiyun",
  props: {
    msg: String
  },
  
  data() {
    return {
      data: [],
      query:{sort:'time'},
      page: {
        current: 1,
        pageSize: 10,
        total:0,
        onChange:this.nextPage
      }
    };
  },
  created: function() {
    console.log(Button,Avatar)
    // var t=new Date()
    // var res=""+t.getFullYear()
    // if(t.getMonth()<10){
    //   res+="0"+t.getMonth()
    // }
    // else{
    //   res+=t.getMonth()
    // }
    // if(t.getDay()<10){
    //   res+="0"+t.getDay()
    // }
    // else{
    //   res+=t.getDay()
    // }
// const _this=this
    axios
      .post("http://192.168.142.1:5000/wangyiyun", 
        { page: 
          {current:this.page.current,
          pageSize:this.page.pageSize} ,
          ...this.query
        })
      .then(res => {
        if(res.data){
          this.data = res.data.data;
          this.page.total=res.data.total
        }
        
        console.log(res, this);
      });
  },
  methods: {
    nextPage: function(current,pageSize) {
      this.page.current++;
      axios
        .post("http://192.168.142.1:5000/wangyiyun", { page: 
        {current,pageSize} ,...this.query}
          )
        .then(res => {
          if(res.data){
            this.data = res.data.data;
            this.page.total=res.data.total
          }
        });
    },
    deleteone: function(item) {
      const _this = this;
      axios
        .post("http://192.168.142.1:5000/deleteWangyiyun", { id: item.id })
        .then(res => {
          _this.page.current--;
          _this.nextPage();
        });
    }
  },
  components: {
    AButton: Button,
    AList: List,
    AAvatar: Avatar,
    AListItem: List.Item,
    AListItemMeta: List.Item.Meta
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.description {
  text-align: start;
}
.title{
  text-align: start;
}
.item {
  display: flex;
}
.wangyiyun{
  margin: 0 30px;
}
a {
  color: #42b983;
}
</style>
