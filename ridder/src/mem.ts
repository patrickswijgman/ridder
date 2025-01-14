/**
 * Zero out all values in an object, recursively.
 */
export function zero(obj: Record<string, any>) {
  for (const key in obj) {
    const value = obj[key];
    const type = typeof value;

    switch (type) {
      case "object":
        zero(obj[key]);
        break;
      case "string":
        obj[key] = "";
        break;
      case "number":
        obj[key] = 0;
        break;
      case "boolean":
        obj[key] = false;
        break;
      default:
        throw new Error(`Cannot zero property of type '${type}' with value '${value}'`);
    }
  }
}
