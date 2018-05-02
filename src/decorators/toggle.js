import { action } from 'mobx';
import { deprecated } from 'deprecated';

function toggleFn(...args) {
  const fnName = args[0] || 'active';
  const propKey = args[1] || 'isActive';
  return action((target) => {
    Object.assign(target.prototype, {
      [propKey]: target.prototype[propKey],
      [fnName]: action((flag = null) => {
        if (flag === true) return Object.assign(target.prototype, { [propKey]: true });
        if (flag === false) return Object.assign(target.prototype, { [propKey]: false });
        return Object.assign(target.prototype, {
          [propKey]: !target.prototype[propKey],
        });
      }),
    });
  });
}

const toggle = deprecated.method(
  'The `@toggle` decorator is incompatible with mobx 4 and has been deprecated. It will be removed in the next major version.',
  console.error, // eslint-disable-line no-console
  toggleFn,
);

export default toggle;
