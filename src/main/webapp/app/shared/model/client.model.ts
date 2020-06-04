import { IOrder } from 'app/shared/model/order.model';

export interface IClient {
  id?: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  email?: string;
  deliveryAddress?: string;
  feedback?: string;
  orders?: IOrder[];
  order?: IOrder;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public phoneNumber?: string,
    public email?: string,
    public deliveryAddress?: string,
    public feedback?: string,
    public orders?: IOrder[],
    public order?: IOrder
  ) {}
}
