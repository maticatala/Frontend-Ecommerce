import { User } from './../../../auth/interfaces/user.interface';
import { Component, HostListener, OnInit, ViewChild, computed, inject, signal } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Meta } from '../../interfaces/get-users.response';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map } from 'jquery';
import { MatSort } from '@angular/material/sort';


@Component({
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit{

  private usersService = inject(UsersService)
  public dataSource: any;
  private _users = signal<User[]>([]);
  private _meta = signal<Meta | null>(null);

  pageEvent?: PageEvent;

  public meta = computed(() => this._meta());
  public users = computed(() => this._users());
  public displayedColumns: string[] = ["id", "email", "name", "createdAt", "rol", "action"];

  ngOnInit(): void {
    this.fetchUsers();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const windowWidth = window.innerWidth;

      if (windowWidth >= 1280) {
        this.displayedColumns = ["id", "email", "name", "createdAt", "rol", "action"];
      } else if (windowWidth >= 1024) {
        this.displayedColumns = ["id", "email", "name", "rol", "action"];
      } else if (windowWidth >= 768) {
        this.displayedColumns = ["email", "name", "action"];
      } else if (windowWidth >= 640) {
        this.displayedColumns = ["email", "action"];
      } else {
        // Lógica para pantallas más pequeñas que sm (por ejemplo, xs)
      }

  }

  fetchUsers() {
    this.usersService.getUsers()
      .subscribe(({ results, meta }) => {
        this._users.set(results);
        this._meta.set(meta);
        this.dataSource = new MatTableDataSource<User>(this._users());
      });
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    page = page + 1;

    this.usersService.getUsers(page, size)
    .subscribe(({ results, meta }) => {
        this._users.set(results);
        this._meta.set(meta);
        this.dataSource = new MatTableDataSource<User>(this._users());
      });
  }

}
