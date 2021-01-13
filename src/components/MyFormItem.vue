
<template>
  <div @change="change" @onchange="change">
   
     <slot @change="change">
   
     </slot>
 
  </div>
</template>
<script>

import form from '../store/form'
export default{
    name:"MyFormItem",
    props:{
        name:String,
    },
    data(){
        return{
            value:""
        }
    },
    created: function() {
        console.log("fsdfs",this)
        
    },
    methods: {
        change:function(e){
            const values={}
            let value=""
            if (typeof e ==='string'){
                value=e
            }
            else{
                // e=e||window.event
                // if ( e && e.stopPropagation ) 
                // //因此它支持W3C的stopPropagation()方法 
                //     e.stopPropagation(); 
                // else {
                //     //否则，我们需要使用IE的方式来取消事件冒泡 
                //     window.event.cancelBubble = true; 
                // }
                    
                value=e.target.value
                  
            }
            this.value=value
            if(this.name){
                values[this.name]=value
            }
            else{
                values['default']=value
            }
            form.set(values)
            
        }
    },
}
</script>