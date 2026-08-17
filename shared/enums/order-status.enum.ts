export enum OrderStatus {
  Pending = "PENDING",
  Confirmed = "CONFIRMED",
  Preparing = "PREPARING",
  Ready = "READY",
  Delivered = "DELIVERED",
  Cancelled = "CANCELLED",
}

export const OrderStatusLabel: Record<OrderStatus, string> = {
  [OrderStatus.Pending]: "ממתין",
  [OrderStatus.Confirmed]: "אושר",
  [OrderStatus.Preparing]: "בהכנה",
  [OrderStatus.Ready]: "מוכן",
  [OrderStatus.Delivered]: "נמסר",
  [OrderStatus.Cancelled]: "בוטל",
};
