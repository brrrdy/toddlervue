console.log("Hello Vue");

const app = Vue.createApp({
  data() {
    return { count: 0,
            msg: 'hello vue',
            rawHtml: '<span style="color: red">This should be red.</span>',
            dynamicId: 'vueId',
            isButtonDisabled: true }
  },
  beforeCreate() {
    console.log('count is null (beforeCreate)');
  },
  created() {
    console.log('count is: ' + ++this.count + '(created)');
  },
  beforeMount() {
    console.log('count is: ' + ++this.count + '(beforeMount)');
  },
  mounted() {
    console.log('count is: ' + ++this.count + '(mounted)');
  },
  unmounted() {
    console.log('count is: ' + ++this.count + '(unmounted)');
  }
});
const vm = app.mount('#app');

//console.log(vm);
//console.log('count is: ' + ++vm.count);