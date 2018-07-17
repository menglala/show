let vm = new Vue({
  el: "#app",
  data: {
    list: [
      { isSelect: false, title: "学习vue.js" },
      { isSelect: false, title: "学习ES6" },
      { isSelect: true, title: "学习http协议" },
      { isSelect: false, title: "学习移动开发" }
    ],
    title: '',
    hash: '',
    cur:'',
  },
  created() {
    //  this.getData();
    this.list = JSON.parse(localStorage.getItem("list")) || this.list;
    this.hash = window.location.hash.slice(2); //截取'#/all'后的all内容
    window.addEventListener("hashchange",() => {
        this.hash = window.location.hash.slice(2);
      },false);
  },
  computed: {
    amount() {
      var amount = this.list.filter(item => {
        if (item.isSelect) {
          return "";
        } else {
          return item;
        }
      });
      return amount.length;
    },

    filterList() {
      if (this.hash === 'all') return this.list;
      if (this.hash === 'finished') return this.list.filter(item=>item.isSelect);
      if (this.hash==='unfinished') return this.list.filter(item=>!item.isSelect);
      window.location.hash='/all';
      },
  },
  methods: {
    add() {
      this.list.unshift({
        isSelect: false,
        title: this.title
      });
      this.title = "";
    },
    remove(matter) {
      this.list = this.list.filter(item => {
        return item !== matter;
      });
    },
    tab(matter){
      this.cur=matter;
    },
    cancel(){
      this.cur='';
    }
  },
  watch: {
    list: {
      handler() {
        localStorage.setItem("list", JSON.stringify(this.list));
      },
      deep: true
    }
  },
  directives:{
    focus(el,bindings){
      el.focus();
    }
  }
});
