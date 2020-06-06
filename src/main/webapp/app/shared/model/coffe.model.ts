import { ICategory } from 'app/shared/model/category.model';
import { ICoffeAmount } from 'app/shared/model/coffe-amount.model';

export interface ICoffe {
  id?: number;
  name?: string;
  countryName?: string;
  description?: string;
  quantity?: number;
  price?: number;
  photoContentType?: string;
  photo?: any;
  region?: ICategory;
  coffeAmounts?: ICoffeAmount[];
  coffeAmount?: ICoffeAmount;
  orderedAmount?: number;
}

export class Coffe implements ICoffe {
  constructor(
    public id?: number,
    public name?: string,
    public countryName?: string,
    public description?: string,
    public quantity?: number,
    public price?: number,
    public photoContentType?: string,
    public photo?: any,
    public region?: ICategory,
    public coffeAmounts?: ICoffeAmount[],
    public coffeAmount?: ICoffeAmount,
    public orderedAmount?: number
  ) {
    this.orderedAmount = 0;
  }
}
