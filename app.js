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
  // Avoid using arrow functions, which prevents Vue from binding the appropriate "this"
  methods: {
    doSomething(event) { console.log(`EVENT: click, opening new tab to ${this.linkUrl} ${event.ctrlKey ? ' in background' : 'in foreground'}.`); },
    increment() {
      return ++this.count;
    }
  },
  // Hooks
  beforeCreate() {
    console.log('count is null (beforeCreate)');
  },
  created() {
    console.log('count is: ' + this.increment() + '(created)');
  },
  beforeMount() {
    console.log('count is: ' + this.increment() + '(beforeMount)');
  },
  mounted() {
    console.log('count is: ' + this.increment() + '(mounted)');
  },
  unmounted() {
    console.log('count is: ' + this.increment() + '(unmounted)');
  }
});
const vm = app.mount('#app');

console.log('count is: ' + vm.increment());