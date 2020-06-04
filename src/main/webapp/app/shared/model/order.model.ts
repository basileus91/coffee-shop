import { Moment } from 'moment';
import { IClient } from 'app/shared/model/client.model';

export interface IOrder {
  id?: number;
  commandId?: string;
  paymentMethod?: boolean;
  aboutUs?: string;
  recommandation?: string;
  socialMedia?: string;
  orderDate?: Moment;
  clients?: IClient[];
  client?: IClient;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public commandId?: string,
    public paymentMethod?: boolean,
    public aboutUs?: string,
    public recommandation?: string,
    public socialMedia?: string,
    public orderDate?: Moment,
    public clients?: IClient[],
    public client?: IClient
  ) {
    this.paymentMethod = this.paymentMethod || false;
  }
}
