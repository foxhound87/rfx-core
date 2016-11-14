# Documentation
---

# Utils


#### `match.env('environment')`

> Match `process.env.NODE_ENV`

#### `match.type('type')`

> Match `global.TYPE` (client / server)

#### `match.script('scriptname', 'environment')`

> Match `process.env.npm_lifecycle_event` and `process.env.NODE_ENV`

---

# Server Side Rendering

#### `dehydrate()`

> Dehydrate stores. To be used on server side.

[Example](https://github.com/foxhound87/rfx-stack/blob/c2e5e1a1c2f02bbc27e5391a377d4f46857ca08c/src/web/ssr.js#L33)

#### `rehydrate()`

> Rehydrate stores. To be used on client side.

[Example](https://github.com/foxhound87/rfx-stack/blob/c2e5e1a1c2f02bbc27e5391a377d4f46857ca08c/src/web/client.jsx#L16)

#### `hotRehydrate()`

> Rehydrate stores. To be used on client side.

[Example](https://github.com/foxhound87/rfx-stack/blob/c2e5e1a1c2f02bbc27e5391a377d4f46857ca08c/src/web/client.jsx#L16)

#### `fetchData(store, props)`

> Calls `static fetchData()` on containers and returns a promise

> This is intended to be used with `react-router v.3`

[Example](https://github.com/foxhound87/rfx-stack/blob/c2e5e1a1c2f02bbc27e5391a377d4f46857ca08c/src/web/client.jsx#L26)


#### `fetchDataOnLocationMatch(history, routes, match, store)`

> Calls static fetchData() on containers

> This is intended to be used with `react-router v.3`

[Example](https://github.com/foxhound87/rfx-stack/blob/686acba7a130ff87ae5381cab3b90f169ecf341b/src/web/client.jsx#L19)

#### `static fetchData()`

```javascript
import React, { Component } from 'react';

export default class Test extends Component {

  static fetchData({ store, location, params, query, router, routes }) {

    // return a promise here
  }

  render() {
    ...
  }
}
```
[Example](https://github.com/foxhound87/rfx-stack/blob/686acba7a130ff87ae5381cab3b90f169ecf341b/src/shared/containers/Messages.jsx#L17)

---

# State Management

### Stores Initializer

Create your stores files as Classes with `export default class` and then assigns them a key in the store.setup() method.

```javascript
import { store } from 'rfx-core';

import UIStore from './stores/ui';

/**
  Stores
*/
export default store
  .setup({
    ui: UIStore,
  });
```

### State Injection

```javascript
const store = stores.inject({
  app: { ssrLocation: req.url },
  // put here the inital state of other stores...
});
```

[Example](https://github.com/foxhound87/rfx-stack/blob/686acba7a130ff87ae5381cab3b90f169ecf341b/src/web/ssr.js#L14)

### Actions Dispatcher

The dispatch() function is handy to call an action when handle component events. It can also be called from another Store too.
 Use the dot notation to select a store key and the name of the method/action:

```javascript
import { dispatch } from 'rfx-core';

...

const handleOnSubmitFormRegister = (e) => {
  e.preventDefault();
  dispatch('auth.login', { email, password }).then( ... );
};
```
Also params can be passed if needed.


### Stores Decorators

#### `@extend`

> Compose the class with an object of extra sub-classes.

> It handles automatic state injection.

[Example](https://github.com/foxhound87/rfx-stack/blob/c2e5e1a1c2f02bbc27e5391a377d4f46857ca08c/src/shared/stores/ui.js#L17)

#### `@toggle`

> Creates a toggle method and assigns a boolean property. The first argument is the toggle method name, the second argument is the boolean property name to implement in the class.

[Example](https://github.com/foxhound87/rfx-stack/blob/c2e5e1a1c2f02bbc27e5391a377d4f46857ca08c/src/shared/stores/ui.js#L24)


