import _ from "lodash";
type AnyObject = Record<string, any>;

function isTokenFunctionCall(token: string): boolean {
  return token === "()";
}

function isTokenArrayAccess(token: string): boolean {
  return /^\[\d+\]$/.test(token);
}

function tokenize(str: string): string[] {
  return str.split(/\.|(\(\))|(\[\d+?])/).filter((t) => !!t);
}

function helper(obj: any, tokens: string[], ctx: any, fnArgs: any[]): any {
  if (tokens.length === 0) return obj;

  const currentToken = tokens[0];

  if (
    _.isUndefined(obj) ||
    _.isNull(obj) ||
    (isTokenFunctionCall(currentToken) && !_.isFunction(obj))
  ) {
    return undefined;
  }

  if (isTokenFunctionCall(currentToken)) {
    return helper(
      obj[_.isArray(fnArgs[0]) ? "apply" : "call"](ctx, fnArgs[0]),
      tokens.slice(1),
      null,
      fnArgs.slice(1)
    );
  } else if (isTokenArrayAccess(currentToken)) {
    return helper(
      obj[parseInt(currentToken.substr(1), 10)],
      tokens.slice(1),
      isTokenFunctionCall(tokens[1]) ? obj : ctx,
      fnArgs
    );
  } else {
    return helper(
      obj[currentToken],
      tokens.slice(1),
      isTokenFunctionCall(tokens[1]) ? obj : ctx,
      fnArgs
    );
  }
}

export function safeAccess(obj: any, accessStr?: string, ...args: any[]): any {
  if (_.isUndefined(accessStr)) {
    return safeAccess.bind(null, obj);
  }
  return helper(obj, tokenize(accessStr), null, args);
}
