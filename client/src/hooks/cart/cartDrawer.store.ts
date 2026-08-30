type Listener = () => void;

const listeners = new Set<Listener>();

let isOpen = false;

const notify = (): void => {
  listeners.forEach((listener) => listener());
};

export const subscribeToCartDrawer = (listener: Listener) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const getIsCartDrawerOpen = (): boolean => isOpen;

/** בשרת המגירה תמיד סגורה — מונע אי-התאמת hydration. */
export const getServerIsCartDrawerOpen = (): boolean => false;

export const openCartDrawer = (): void => {
  isOpen = true;
  notify();
};

export const closeCartDrawer = (): void => {
  isOpen = false;
  notify();
};
