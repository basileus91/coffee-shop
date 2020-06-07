import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IOrderedCoffe } from 'app/shared/model/ordered-coffe.model';

type EntityResponseType = HttpResponse<IOrderedCoffe>;
type EntityArrayResponseType = HttpResponse<IOrderedCoffe[]>;

@Injectable({ providedIn: 'root' })
export class OrderedCoffeService {
  public resourceUrl = SERVER_API_URL + 'api/ordered-coffes';

  constructor(protected http: HttpClient) {}

  create(orderedCoffe: IOrderedCoffe): Observable<EntityResponseType> {
    return this.http.post<IOrderedCoffe>(this.resourceUrl, orderedCoffe, { observe: 'response' });
  }

  sendEmail(orderId: string): Observable<EntityResponseType> {
    return this.http.post<IOrderedCoffe>(`${this.resourceUrl}/${orderId}`, orderId, { observe: 'response' });
  }

  update(orderedCoffe: IOrderedCoffe): Observable<EntityResponseType> {
    return this.http.put<IOrderedCoffe>(this.resourceUrl, orderedCoffe, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOrderedCoffe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOrderedCoffe[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
