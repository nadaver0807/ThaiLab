import { CART_STORAGE_KEY, DELIVERY_FEE } from '@shared/consts/order.const';
import { OrderType } from '@shared/enums/order-type.enum';
import { type CartItem, type CartTotals } from '@shared/types/cart.type';

type Listener = () => void;

const listeners = new Set<Listener>();

let cachedItems: CartItem[] = [];
let isCacheLoaded = false;

export const buildLineId = (dishUuid: string, priceKey: string): string =>
  `${dishUuid}::${priceKey}`;

const isCartItem = (value: unknown): value is CartItem => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Partial<CartItem>;

  return (
    typeof item.lineId === 'string' &&
    typeof item.dishUuid === 'string' &&
    typeof item.dishName === 'string' &&
    typeof item.priceKey === 'string' &&
    typeof item.unitPrice === 'number' &&
    typeof item.quantity === 'number'
  );
};

const readStorage = (): CartItem[] => {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed.filter(isCartItem) : [];
  } catch {
    return [];
  }
};

const notify = (): void => {
  listeners.forEach((listener) => listener());
};

const persist = (items: CartItem[]): void => {
  cachedItems = items;
  isCacheLoaded = true;

  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // אחסון חסום — העגלה נשמרת בזיכרון בלבד.
  }

  notify();
};

const handleStorageEvent = (event: StorageEvent): void => {
  if (event.key === CART_STORAGE_KEY) {
    cachedItems = event.newValue ? readStorage() : [];
    notify();
  }
};

export const subscribeToCart = (listener: Listener): (() => void) => {
  listeners.add(listener);
  window.addEventListener('storage', handleStorageEvent);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', handleStorageEvent);
  };
};

export const getCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  if (!isCacheLoaded) {
    cachedItems = readStorage();
    isCacheLoaded = true;
  }

  return cachedItems;
};

const SERVER_ITEMS: CartItem[] = [];

export const getServerCartItems = (): CartItem[] => SERVER_ITEMS;

export const addToCart = (item: Omit<CartItem, 'lineId'>): void => {
  const lineId = buildLineId(item.dishUuid, item.priceKey);
  const items = getCartItems();
  const existing = items.find((current) => current.lineId === lineId);

  if (existing) {
    persist(
      items.map((current) =>
        current.lineId === lineId
          ? { ...current, quantity: current.quantity + item.quantity }
          : current,
      ),
    );

    return;
  }

  persist([...items, { ...item, lineId }]);
};

export const setCartItemQuantity = (lineId: string, quantity: number): void => {
  const items = getCartItems();

  if (quantity <= 0) {
    persist(items.filter((item) => item.lineId !== lineId));

    return;
  }

  persist(items.map((item) => (item.lineId === lineId ? { ...item, quantity } : item)));
};

export const removeFromCart = (lineId: string): void => {
  persist(getCartItems().filter((item) => item.lineId !== lineId));
};

export const clearCart = (): void => {
  persist([]);
};

export const calculateSubtotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

export const calculateTotals = (items: CartItem[], orderType: OrderType): CartTotals => {
  const subtotal = calculateSubtotal(items);
  const deliveryFee = orderType === OrderType.Delivery && items.length ? DELIVERY_FEE : 0;

  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
};
