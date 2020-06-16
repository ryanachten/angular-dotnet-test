import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user";
import { ActivatedRoute } from "@angular/router";
import { Pagination, PaginationResult } from "src/app/models/Pagination";
import { UserService } from "src/app/services/user.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-member-list",
  templateUrl: "./member-list.component.html",
  styleUrls: ["./member-list.component.css"],
})
export class MemberListComponent implements OnInit {
  pagination: Pagination;
  users: User[];

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.users = data["users"].result;
      this.pagination = data["users"].pagination;
    });
  }

  pageChanged(event) {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    const { currentPage, itemsPerPage } = this.pagination;
    this.userService.getUsers(currentPage, itemsPerPage).subscribe(
      ({ pagination, result }: PaginationResult<User[]>) => {
        this.pagination = pagination;
        this.users = result;
      },
      (error) => {
        this.alertService.error(error);
      }
    );
  }
}
