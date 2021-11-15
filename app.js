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

const vm3 = Vue.createApp({
  data() {
    return {
      awesome: true,
      ok: true,
      show: true,
      type: 'C',
      parentMessage: 'Hi there',
      items: [
        { id: 0, message: 'foo' },
        { id: 1, message: 'bar' },
        { id: 2, message: 'buzz' },
        { id: 3, message: 'lightyear' }
      ],
      listicle: {
        title: 'Buzzfeed greatest hits',
        author: 'Dirk Funk',
        publishedAt: '2021-11-12'
      },
      numbers: [ 1, 2, 3, 4, 5, 6, 7, 8 ]
    }
  },
  computed: {
    evenNumbers() {
      return this.numbers.filter(number => number % 2 === 0)
    }
  },
  methods: {
    odd(numbers) {
      return numbers.filter(num => num % 2 !== 0)
    }
  }
}).mount('#app3');

vm3.items.push({ id:4, message: 'baz'})

Vue.createApp({
  data() {
    return {
      counter: 0,
      name: 'Vue.js',
      enterCount: 0
    }
  },
  methods: {
    greet(event) {
      alert('Hello ' + this.name + '!')
      if (event) {
        alert(event.target.tagName)
      }
    },
    say(message) {
      alert(message)
    },
    warn(message, event) {
      if (event) {
        console.log(event)
        event.preventDefault()
      }
      alert(message)
    },
    zero(event) {
      alert(event.currentTarget.tagName + ' says zero!')
    },
    one(event) {
      alert(event.currentTarget.tagName + ' says one!')
    },
    two(event) {
      alert(event.currentTarget.tagName + ' says two!')
    },
    soAlone(event) {
      alert(event.currentTarget.tagName + ' says what a lonely way to click!')
    },
    onEnter(event) {
      event.preventDefault()
      this.enterCount++
    },
    onShiftEnter(event) {
      event.preventDefault()
      if (this.enterCount > 0) {
        this.enterCount--
      }
    }
  }
}).mount('#app4')

const vm5 = Vue.createApp({
  data() {
    return {
      msg: '',
      mlMessage: '',
      isChecked: false,
      checkedNames: [],
      picked: '',
      selected: '',
      multiSelected: [],
      dynSelected: 'Apple',
      dynOptions: [
        { text: 'One', value: 'Apple' },
        { text: 'Two', value: 'Banana' },
        { text: 'Three', value: 'Carrot' }
      ],
      toggle: 'no'
    }
  }
}).mount('#app5')