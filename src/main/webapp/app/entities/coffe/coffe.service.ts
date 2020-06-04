import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICoffe } from 'app/shared/model/coffe.model';

type EntityResponseType = HttpResponse<ICoffe>;
type EntityArrayResponseType = HttpResponse<ICoffe[]>;

@Injectable({ providedIn: 'root' })
export class CoffeService {
  public resourceUrl = SERVER_API_URL + 'api/coffes';

  constructor(protected http: HttpClient) {}

  create(coffe: ICoffe): Observable<EntityResponseType> {
    return this.http.post<ICoffe>(this.resourceUrl, coffe, { observe: 'response' });
  }

  update(coffe: ICoffe): Observable<EntityResponseType> {
    return this.http.put<ICoffe>(this.resourceUrl, coffe, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICoffe>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAll(): Observable<HttpResponse<ICoffe[]>> {
    return this.http.get<ICoffe[]>(`${this.resourceUrl}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICoffe[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
