export class Playtime {
  constructor() {
    this.active = 0;
    this.passive = 0;
    this.lastTick = Date.now();
    this.interval = null;
  }

  start() {
    if (this.interval) return;
    this.lastTick = Date.now();
    this.interval = setInterval(() => this.tick(), 1000);
  }

  stop() {
    if (!this.interval) return;
    clearInterval(this.interval);
    this.interval = null;
  }

  tick() {
    const now = Date.now();
    const delta = (now - this.lastTick) / 1000;
    this.passive += delta;
    if (document.hasFocus()) {
      this.active += delta;
    }
    this.lastTick = now;
  }

  getActive() {
    return Math.floor(this.active);
  }

  getPassive() {
    return Math.floor(this.passive);
  }
}
