import _ from 'lodash';

/**
  Fetch data from components mapping "static fetchData()"
  and injecting store, router params and query.
  Used on the server-side. It returns a Promise.
 */
export function fetchData(store, props) {
  return Promise.all(props.components
    .filter(component => component && _.isFunction(component.fetchData))
    .map(component => component.fetchData({
      store,
      location: props.location,
      params: props.params,
      query: props.location.query,
      router: props.router,
      routes: props.routes,
    })));
}

/**
  Fetch data from components when the router matches the borwser location.
  It also prevent the first page to re-fetch data already fetched from the server.
  Used on the client-side.
 */
export function fetchDataOnLocationMatch(history, routes, match, store) {
  history.listen(_.after(1, route =>
    match({ routes, location: route.pathname }, (error, redirect, props) =>
      props && fetchData(store, props))));
}
