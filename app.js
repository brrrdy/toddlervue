console.log("Hello Vue");

const app = Vue.createApp({
  // Data
  data() {
    return { count: 0,
            msg: 'hello vue',
            rawHtml: '<span style="color: red">This should be red.</span>',
            dynamicId: 'vueId',
            isButtonDisabled: true,
            linkUrl: null,
            date: Date()
          }
  },
  // Methods
  // Avoid using arrow functions, which prevents Vue from binding the appropriate "this"
  methods: {
    doSomething(event) { console.log(`EVENT: click, opening new tab to ${this.linkUrl} ${event.ctrlKey ? ' in background' : 'in foreground'}.`); },
    increment() {
      return ++this.count;
    },
    toTitleDate(date) {
      return date;
    },
    formatDate(date) {
      let formattedDate = new Date(date).toDateString();
      return formattedDate;
    }
  },
  // Hooks
  beforeCreate() {
    console.log('count is null (beforeCreate)');
  },
  created() {
    console.log('count is: ' + this.increment() + '(created)');
    // debounce click event with lodash
    this.debouncedClick = _.debounce(this.increment, 500);
  },
  beforeMount() {
    console.log('count is: ' + this.increment() + '(beforeMount)');
  },
  mounted() {
    console.log('count is: ' + this.increment() + '(mounted)');
  },
  unmounted() {
    console.log('count is: ' + this.increment() + '(unmounted)');
    // cancel debounce timer when component is removed
    this.debouncedClick.cancel();
  }
});
const vm = app.mount('#app1');

console.log('count is: ' + vm.increment());

Vue.createApp({
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Adv Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the vm instance
      return `${this.author.name}: ${this.author.books.length > 0 ? 'Yes' : 'No'}`;
    },
    // this will never update, because Date is not a reactive dependency:
    now() {
      return Date();
    }
  },
  methods: {
    updateMe() {
      this.$forceUpdate();
    },
    getDateNow() {
      return Date();
    }
  }
}).mount('#app2');