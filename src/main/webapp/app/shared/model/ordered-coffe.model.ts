export interface IOrderedCoffe {
  id?: number;
  coffe?: string;
  client?: string;
  orderId?: string;
  amount?: string;
}

export class OrderedCoffe implements IOrderedCoffe {
  constructor(public id?: number, public coffe?: string, public client?: string, public orderId?: string, public amount?: string) {}
}
