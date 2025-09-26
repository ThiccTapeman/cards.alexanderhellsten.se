export class Action {
  functions: Function[] = [];

  Add(func: Function) {
    this.functions.push(func);
    return this;
  }

  Call([...params] = []) {
    this.functions.forEach((func) => func(params));
  }
}
