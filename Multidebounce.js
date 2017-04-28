class MultiDebounce {
  constructor(options) {
    this.timeout = undefined;
    this.delay = options.delay || 10;
    this.debug = options.debug || false;

    // collection of callbacks
    this.actions = options.actions || [];
  }

  // Set delay
  // ========================
  setDuration(delay) {
    this.delay = delay;
  }

  // Utility for loggin errors
  // ========================
  logErrors(errors) {
    errors.forEach(error => console.error(error));
  }

  // Validate Actions
  // ========================
  validate(action) {
    const errors = [];

    if (!action) {
      errors.push('action not set');
    }

    if (Array.isArray(action) || typeof action === 'string') {
      errors.push('action is not an object');
    }

    if (!action.fn) {
      errors.push('Action.fn not set, add a callback.');
    }

    if (!action.name) {
      errors.push('Action.name is not set for this action. A name reference is required.');
    }

    if (errors.length) {
      this.logErrors(errors);

      return false;
    }

    return true;
  }

  // Get this.actions.
  // ========================
  getActions() {
    return this.actions;
  }

  // Get 'actionName' or this.actions.
  // ========================
  get(actionName) {
    if (actionName) {
      return this.actions.filter(action => action.name === actionName)[0];
    }

    return this.actions;
  }

  // Add multiple actions.
  // this is an helper for add();
  // use add() and pass an array, it will do everything automatically.
  // ========================
  setActions(collection) {
    collection.forEach(action => this.add(action));
  }

  // Add an action
  // ========================
  add(action) {

    // if multiple actions then run setActions();
    if (Array.isArray(action)) {
      this.setActions(action);
      return false;
    }

    // validation
    const isValidAction = this.validate(action);
    if (!isValidAction) return false;

    // add actions
    this.actions.push(action);
  }

  // Remove all actions
  // ========================
  reset() {
    this.actions = [];
  }

  // Remove a sincle action.
  // - name: reference name.
  // ========================
  remove(name) {
    let index;
    const actions = this.actions.slice(0); // clone action array.

    actions.forEach((cb, i) => {
      if (cb.name === name) index = i;
    });

    this.actions = actions.splice(i, 1);

    return actions;
  }

  // Run action.
  // - name: if name specified run that action only.
  // ========================
  run(actionName) {
    let actionsToRun = [];

    // if a name is specified run that particular action only
    // otherwise push all actions
    if (actionName) {
      actionsToRun.push(this.get(actionName));
    } else {
      actionsToRun = this.actions;
    }

    // run actions
    return this.start(actionsToRun);
  }

  // Run actions.
  // - name: if name specified run that action only.
  // ========================
  start(actions) {
    const { delay, debug } = this;

    // Prevent executing actions
    window.clearTimeout(this.timeout);

    if (!actions.length || !actions) {
      if (debug) console.log('No actions to run.');
      return null;
    }

    // return actions
    this.timeout = window.setTimeout(() => {
      actions.forEach(action => {
        // if the action has a context apply it.
        const fn = (action.context) ? action.fn.bind(action.context) : action.fn;

        fn();
      });
    }, delay);

    // return actions
    return actions;
  }
};

export default MultiDebounce;
