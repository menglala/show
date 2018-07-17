let vm = new Vue({
    el: '#app',
    computed:{
        //双向绑定每个产品的选中框和全选框
        checkAll:{
            //每当products.isSelected变化时,自动监测,不需要监听
            get(){
                return this.products.every(item => item.isSelected === true);
            },
            set(val){
                this.products.forEach(item=>item.isSelected=val);
            }
        },
        //计算属性如果写成函数默认调用的是get方法,在{{}}中不需要加括号.
        //计算总价
        sum() {
            //过滤没有选中的商品
            var selectedArr = this.products.filter(item => item.isSelected === true);
            //将每个选中商品的数量乘以单价
            var amount = selectedArr.reduce((pre, cur) => {
                return pre + cur.productPrice * cur.productCount;
            }, 0);
            return amount;
        },
    },
    filters:{
        //改变价钱在页面中的显示效果
        toFixed(input,param1){
            return '¥'+input.toFixed(param1);
        }
    },
    created() {
        this.getData();
    },
    data:{
        products:[],
    },
    methods: {
        remove(i){
            this.products=this.products.filter((item,index)=>index!==i)
        },
        getData() {
            axios.get('cart.json').then(response => {
               this.products=response.data;
            },err=>{
                console.log(err);
            })
        }
    }
})