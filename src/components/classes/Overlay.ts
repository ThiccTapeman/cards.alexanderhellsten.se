class Overlay {
  static open: ((ui: string) => void) | null = null;
  static close: (() => void) | null = null;
}
