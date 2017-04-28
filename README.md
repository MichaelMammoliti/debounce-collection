# multi-debounce
Small utility for debouncing multiple callbacks.

# Getting started
1. Import the utility
```
import default
```

2. Create an instance.
```
const MultiDebounce = new MultiDebounce();
```

# Create actions
An action is an object:
```
const action = {
  name: 'sayHelloToTheWorld', // string | a string
  fn: sayHi, // function | function reference
  context: this, // object. | the context when the function run.
}
```

# Add actions
```
MultiDebounce.add(action)
```
or
```
MultiDebounce.add([action1, action2, action3])
```

# Remove actions
```
MultiDebounce.remove(actionName)
```

# Reset actions
This method remove all actions.
```
MultiDebounce.reset()
```

# Options
```
const MultiDebounce = new MultiDebounce({
  delay: 2000,
  debug: true,
  actions: [action1, action2, action3],
});
```

# Run!
```
MultiDebounce.start()
```

# Example
```
import MultiDebounce from '../utils/Multidebounce/main';

class Foo {

  constructor() {
    this.name = 'My name is MultiDebounce!';

    // Bind the event to Foo as in the interval `this` is pointing to the window object!
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleBodyClick = this.handleBodyClick.bind(this);

    // Create instance of MultiDebounce
    this.instantiateMultiDebounce();

    // add Events
    this.addEvents();
  }

  instantiateMultiDebounce() {
    const actions = [
      {
        name: 'sayHi',
        fn: this.sayHi,
        context: this,
      },
    ];

    this.MultiDebounce = new MultiDebounce({
      debug: true,
      delay: 2000,
      actions, // ES6 shorthand for "actions: actions"
    });
  }

  sayHi() {
    console.log(this.hi);
  }

  foo() {
    console.log(foo);
  }

  // On window resize we fire all actions
  handleWindowResize() {
    this.MultiDebounce.start();
  }

  // If we click the body we remove logFoo action
  handleBodyClick() {
    this.Multidebounce.remove('logFoo');
  }

  addEvents() {
    // Add a new action
    this.Multidebounce.add({
      fn: foo,
      name: 'logFoo',
    });

    // Add resize event to window
    window.addEventListener('resize', this.handleWindowResize);
    document.body.addEventListener('click', this.handleBodyClick)
  }

  removeEvents() {
    // Reset all actions
    this.Multidebounce.reset();

    // remove all events
    window.removeEventListener('resize', this.handleWindowResize);
    document.body.removeEventListener('click', this.handleBodyClick);
  }

}
```
