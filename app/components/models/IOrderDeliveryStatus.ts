export enum StatusEnum{
Pending = 1,
Dispatched = 2,
Delivered = 3
}

export interface DeliveryStatus {
  status: StatusEnum;
}