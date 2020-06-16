import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";
import { PaginationResult } from "../models/Pagination";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(
    page?: number,
    itemsPerPage?: number
  ): Observable<PaginationResult<User[]>> {
    const paginatedResult: PaginationResult<User[]> = new PaginationResult<
      User[]
    >();

    let params = new HttpParams();
    if (page !== null && itemsPerPage !== null) {
      params = params.append("pageNumber", page.toString());
      params = params.append("pageSize", itemsPerPage.toString());
    }

    return this.http
      .get<User[]>(`${this.baseUrl}users`, { observe: "response", params })
      .pipe(
        map((res) => {
          paginatedResult.result = res.body;
          if (res.headers.get("Pagination") !== null) {
            paginatedResult.pagination = JSON.parse(
              res.headers.get("Pagination")
            );
          }
          return paginatedResult;
        })
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}users/${id}`);
  }

  updateUser(id: number, user: User) {
    return this.http.put(`${this.baseUrl}users/${id}`, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      `${this.baseUrl}users/${userId}/photos/${id}/setMain`,
      {}
    );
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(`${this.baseUrl}users/${userId}/photos/${id}`);
  }
}
