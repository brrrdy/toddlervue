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
      },
      firstName: 'Jane',
      lastName: 'Doh',
      question: '',
      answer: 'Questions usually contain a question mark. :)',
      isHealthy: true,
      error: {
        on: false,
        msg: 'Error!',
        type: 'benign'
      },
      activeClass: 'healthy',
      errorClass: 'text-danger',
      styledText: {
        fontFamily: 'sans-serif',
        color: 'purple',
        fontSize: '30px',
        margin: '40px'
      }
    }
  },
  watch: {
    // whenever question changes, this function will run
    question(newQuestion) {
      if (newQuestion.indexOf('?') > -1) {
        this.getAnswer()
      }
    }
  },
  computed: {
    // a computed getter
    publishedBooksMessage() {
      // `this` points to the vm instance
      return `${this.author.name} - ${this.author.books.length > 0 ? 'Yes' : 'No'}`;
    },
    // this will never update on re-render, because Date is not a reactive dependency
    now() {
      return Date();
    },
    // a computed getter and setter
    fullName: {
      get() {
        return this.firstName + ' ' + this.lastName;
      },
      set(newName) {
        const names = newName.split(' ');
        this.firstName = names[0];
        this.lastName = names[names.length - 1];
      }
    },
    checkersClass() {
      return {
        healthy: this.isHealthy && !this.error.on,
        'text-danger': this.error.on && this.error.type === 'fatal'  
      }
    }
  },
  methods: {
    // force this component to re-render to illustrate difference between computed prop and method
    updateMe() {
      this.$forceUpdate();
    },
    // this will always update on re-render, because it is a component instance method
    getDateNow() {
      return Date();
    },
    getAnswer() {
      this.answer = 'Thinking...'
      axios
        .get('https://yesno.wtf/api')
        .then(response => {
          this.answer = response.data.answer
        })
        .catch(error => {
          this.answer = 'Error! Could not reach the API. ' + error;
        })
    }
  }
}).mount('#app2');

Vue.createApp({
  // new app who dis
}).mount('#app3');