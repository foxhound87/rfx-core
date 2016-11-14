import match from './match';

/* state */
import store from './state/store';
import { dispatch } from './state/dispatcher';
import { dehydrate, rehydrate, hotRehydrate } from './state/hydrate';
import { fetchData, fetchDataOnLocationMatch } from './state/fetch';

/* decorators */
import { extend } from './decorators/extend';
import { toggle } from './decorators/toggle';

export {
  match,

  /* decorators */
  extend,
  toggle,

  /* state */
  store,
  dispatch,
  dehydrate,
  rehydrate,
  hotRehydrate,
  fetchData,
  fetchDataOnLocationMatch,
};
