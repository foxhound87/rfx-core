/* eslint no-underscore-dangle: 0 */
import { action } from "mobx";
import _ from "lodash";

class Store {
  $stores: Record<string, any> = {};

  $imports: Record<string, any> = {};

  setup(imports: any) {
    this.$imports = imports;
    return this;
  }

  inject(state = {}) {
    this.initializeStores(state);
    return this.$stores;
  }

  // alias of inject
  init(state = {}) {
    return this.inject(state);
  }

  // alias of inject
  set(state = {}) {
    return this.inject(state);
  }

  get() {
    return this.$stores;
  }

  @action
  initializeStores(state: any) {
    const _state = _.isString(state) ? JSON.parse(state) : state;

    Object.keys(this.$imports).forEach((key) => {
      const StoreClass = this.$imports[key];
      const $state = _state[key] || {};
      const $obj = new StoreClass(this.$stores, $state);
      const $extend = $obj.___extend || null;
      Object.assign($obj, $state);
      this.extendWithNestedClass($obj, $state, $extend);
      this.$stores[key] = $obj;
      if (_.isFunction($obj.init)) {
        $obj.init(this.$stores, $state);
      }
    });
  }

  @action
  extendWithNestedClass(obj: any, state: any, extend: any) {
    if (_.isUndefined(extend) || _.isEmpty(extend)) return;

    Object.keys(extend || {}).forEach((subkey) => {
      const SubClass = extend[subkey];
      const $substate = state[subkey] || {};
      const $subobj = new SubClass(this.$stores, $substate);
      const $subextend = $subobj.___extend || null;
      Object.assign($subobj, $substate);
      Object.assign(obj, { [subkey]: $subobj });
      // recursion for deep nested classes
      this.extendWithNestedClass($subobj, $substate, $subextend);
      if (_.isFunction($subobj.init)) {
        $subobj.init(this.$stores, $substate);
      }
    });
  }
}

export default new Store();
