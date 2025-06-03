type ClassMap = { [key: string]: Function };

/**
 * Decorator per associare classi al prototipo della classe target.
 * Le classi passate vengono salvate in `___extend`.
 * @param classes Oggetto con chiavi e classi associate.
 */

export function extend(classes?: ClassMap) {
  return function <T extends { new (...args: any[]): {} }>(target: T): void {
    if (!classes || typeof classes !== "object") return;

    target.prototype.___extend = {
      ...(target.prototype.___extend || {}),
      ...classes,
    };
  };
}
