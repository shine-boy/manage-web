<template>
  <div>
    
     <div @change.stop.prevent="onChange">
         <slot >
          
      
        </slot> 
     </div>
  </div>
</template>

<script>

import MyFormItem from './MyFormItem'
import form from '../store/form'

export {MyFormItem}
export default {
  name: "MyForm",
  props: {
    msg: String
  },
  data() {
    return {
        data:{}
    }
  },
  created: function() {
   console.log("fsdfs",this.$slots.default())
   for(const i of ["sd",'fs']){
       console.log('fs',i)
   }
  },
  methods: {

    onChange:function(e){
        this.$emit("change",form.state)
        
    }
  },
  components: {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.manage{
  margin: 0 30px;
}
.select{
  width: 100%;
}
.content{
  text-align: start;
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
