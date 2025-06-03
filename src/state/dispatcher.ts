import _ from "lodash";
import $store from "./store";
import { isAction } from "mobx";
import { safeAccess as access } from "../utils/safeAccess";

function getNSClassNamespace(str: string) {
  const lastIndex = str.lastIndexOf(".");
  return str.substring(0, lastIndex);
}

function getNSMethodName(str: string) {
  const lastIndex = str.lastIndexOf(".");
  return str.substring(lastIndex + 1, str.length);
}

function getRealClassName(ns: string, store: any) {
  const className = getNSClassNamespace(ns);
  const $class = access(store, className);
  if (_.isUndefined($class))
    throw new Error(`The Store ${className} does not exist!`);
  return $class.constructor.name;
}

export function dispatch(namespace: string, ...args: any[]) {
  const store = $store.get();
  const fn = access(store, namespace);
  const className = getRealClassName(namespace, store);
  const methodName = getNSMethodName(namespace);

  if (_.isFunction(fn) && isAction(fn)) {
    return access(store, [namespace, "()"].join(""), args);
  }

  throw new Error(`${methodName} is not an action of ${className}`);
}
