import { User } from './../../../auth/interfaces/user.interface';
import { Component, /*EventEmitte,*/ HostListener, OnInit, /*Output,*/ ViewChild, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SpecialKeys } from 'src/app/shared/interfaces';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UsersPageComponent implements OnInit{

  private usersService = inject(UsersService)
  private debounceTimer?: NodeJS.Timeout; //* Sirve para esperar hasta que el usuario termine de ingresar texto en el input y asi no sobrecargarlo
  public dataSource: any;
  public displayedColumns: string[] = ["id", "email", "name", "createdAt", "action"];
  public columnsToDisplayWithExpand = ['expand', ...this.displayedColumns];
  public expandedElement: User | null = null;

  // El metodo eventData manda la info por su metodo emit, el cual sera llamado cuando se haga click en un registro de la tabla
  //@Output() eventData = new EventEmitter<any>();

  /* Invoca el metodo emit
  selectedRow(row: any): void{
    this.eventData.emit(row);
  }
  */

  @ViewChild(MatPaginator)
  paginator !: MatPaginator;

  @ViewChild(MatSort)
  sort !: MatSort;

  get users() {
    return this.usersService.users();
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1280) {
      this.displayedColumns = ["id", "email", "name", "createdAt", "action"];
      this.columnsToDisplayWithExpand = ['expand', ...this.displayedColumns];
    } else if (windowWidth >= 1024) {
      this.displayedColumns = ["id", "email", "name", "action"];
      this.columnsToDisplayWithExpand = ['expand', ...this.displayedColumns];
    } else if (windowWidth >= 768) {
      this.displayedColumns = ["email", "name", "action"];
      this.columnsToDisplayWithExpand = ['expand', ...this.displayedColumns];
    } else if (windowWidth >= 640) {
      this.displayedColumns = ["email", "action"];
      this.columnsToDisplayWithExpand = ['expand', ...this.displayedColumns];
    } else {
      // Lógica para pantallas más pequeñas que sm (por ejemplo, xs)
    }

  }

  fetchUsers(): void {
    this.usersService.getUsers()
      .subscribe( users => {
        this.dataSource = new MatTableDataSource<User>(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  FilterChange(e: KeyboardEvent): void {

    if (this.isSpecialKey(e)) return;

    if (this.debounceTimer) clearTimeout(this.debounceTimer)

    const value = (e.target as HTMLInputElement).value;

    this.debounceTimer = setTimeout(() => {
      this.dataSource.filter = value;
    }, 350);
  }

  isSpecialKey(event: KeyboardEvent): boolean {
    // Define una función para determinar si una tecla es especial
    let specialKeys: SpecialKeys[] = Object.values(SpecialKeys);

    return specialKeys.includes(event.key as SpecialKeys);
  }

  // onPaginateChange(event: PageEvent) {
  //   let page = event.pageIndex;
  //   let size = event.pageSize;

  //   page = page + 1;

  //   this.usersService.getUsers(page, size)
  //   .subscribe(({ results, meta }) => {
  //       this._users.set(results);
  //       this._meta.set(meta);
  //       this.dataSource = new MatTableDataSource<User>(this._users());
  //     });
  // }

}
