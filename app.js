console.log("Hello Vue");

const app = Vue.createApp({
  // Data
  data() {
    return { count: 0,
            msg: 'hello vue',
            rawHtml: '<span style="color: red">This should be red.</span>',
            dynamicId: 'vueId',
            isButtonDisabled: true,
            linkUrl: null  
          }
  },
  // Methods
  methods: {
    doSomething() { (e) => console.log(`EVENT: click, opening new tab to ${e.target.href} ${e.ctrlKey ? 'in background' : 'in foreground'}.`) }
  },
  // Hooks
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

console.log('count is: ' + ++vm.$data.count);