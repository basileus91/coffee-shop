import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICoffeAmount } from 'app/shared/model/coffe-amount.model';

type EntityResponseType = HttpResponse<ICoffeAmount>;
type EntityArrayResponseType = HttpResponse<ICoffeAmount[]>;

@Injectable({ providedIn: 'root' })
export class CoffeAmountService {
  public resourceUrl = SERVER_API_URL + 'api/coffe-amounts';

  constructor(protected http: HttpClient) {}

  create(coffeAmount: ICoffeAmount): Observable<EntityResponseType> {
    return this.http.post<ICoffeAmount>(this.resourceUrl, coffeAmount, { observe: 'response' });
  }

  update(coffeAmount: ICoffeAmount): Observable<EntityResponseType> {
    return this.http.put<ICoffeAmount>(this.resourceUrl, coffeAmount, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICoffeAmount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICoffeAmount[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
