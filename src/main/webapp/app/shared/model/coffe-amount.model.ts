import { ICoffe } from 'app/shared/model/coffe.model';

export interface ICoffeAmount {
  id?: number;
  availableAmount?: number;
  sokdAmount?: number;
  coffes?: ICoffe[];
  coffe?: ICoffe;
}

export class CoffeAmount implements ICoffeAmount {
  constructor(
    public id?: number,
    public availableAmount?: number,
    public sokdAmount?: number,
    public coffes?: ICoffe[],
    public coffe?: ICoffe
  ) {}
}
