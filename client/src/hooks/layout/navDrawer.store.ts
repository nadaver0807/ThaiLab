type Listener = () => void;

const listeners = new Set<Listener>();

let isOpen = false;

const notify = (): void => {
  listeners.forEach((listener) => listener());
};

export const subscribeToNavDrawer = (listener: Listener): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const getIsNavDrawerOpen = (): boolean => isOpen;

export const getServerIsNavDrawerOpen = (): boolean => false;

export const openNavDrawer = (): void => {
  isOpen = true;
  notify();
};

export const closeNavDrawer = (): void => {
  isOpen = false;
  notify();
};
