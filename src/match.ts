export default {
  env(env: string) {
    const ENV = process.env.NODE_ENV;
    return ENV === env;
  },
  type(type: any) {
    const { TYPE } = global as NodeJS.Global;
    return TYPE === type;
  },
  script(target: any, env = null) {
    const ENV = process.env.NODE_ENV;
    const TARGET = process.env.npm_lifecycle_event;
    if (env) return TARGET === target && ENV === env;
    return TARGET === target;
  },
};
