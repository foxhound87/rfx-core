import match from './match';
import seeder from './seeder.runner';

/* server */
import { log, logInit, logServerConfig } from './logger';
import { setupServer, startServer } from './server.start';
import { setupServices, initServices } from './services.autoload';

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
  seeder,

  /* logger */
  log,
  logInit,
  logServerConfig,

  /* server */
  setupServer,
  startServer,

  /* services */
  setupServices,
  initServices,

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
