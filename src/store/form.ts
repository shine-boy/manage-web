import {reactive} from 'vue'

class Form{
    constructor(){
        this.data()
    }
    state={}
    private data() {
        this.state=reactive({})
    }

    get(){
        return this.state
    }
    set(state:any){
        this.state={
            ...this.state,
            ...state}
    }
}
const form =new Form()
export default form