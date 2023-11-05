import { User } from './../../../auth/interfaces/user.interface';
import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatTableDataSource } from '@angular/material/table';

import { Column } from 'src/app/shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from '../../components/user-add-edit/user-add-edit.component';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { CustomSnackbarService } from 'src/app/shared/components/custom-snackbar/custom-snackbar.service';



@Component({
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css'],
})
export class UsersPageComponent implements OnInit{
  private usersService = inject(UsersService)
  private _cusSnackbar = inject(CustomSnackbarService);
  public dataSource = new MatTableDataSource();

  columns: Column[] = [
    {id:'id',        label:'ID',       breakpoint: 'md', width: 10},
    {id:'email',     label:'Email',    breakpoint: 'static'},
    {id:'firstName', label:'Nombre',   breakpoint: 'md'},
    {id:'lastName',  label:'Apellido', breakpoint: 'md'},
    {id:'createdAt', label:'Creado',   breakpoint: 'lg'},
    {id:'rol',       label:'Rol',      breakpoint: 'sm'},
    {id:'action',    label:'Acciones', breakpoint: 'static'},
  ]

  constructor(private dialog: MatDialog){}

  ngOnInit(){

    this.setUserList();

  }

  private setUserList(): void {
    this.usersService.getUsers().subscribe( result => {

      if(result.length > 0){
        const rows: any = [];

        result.forEach((element:any,index:number)=> {
          element['recId'] = index +1;
          rows.push(element)
        });

        this.dataSource.data = rows;
      }
    })
  }

  onElementoEditado(user: User) {
    const dialogRef = this.dialog.open(UserAddEditComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) this.setUserList();
      }
    })
  }

  onElementoEliminado(elemento: any) {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        type: 'Usuario',
        object: elemento.email,
      }
    });



    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (!val) return;

        this.usersService.deleteUser(elemento.id).subscribe({
          next: (res) => {
            this.setUserList();
            this._cusSnackbar.openCustomSnackbar("done", "Delete Successfuly!", "Okay", 3000, 'success');
          },
          error: (e) => {
            console.log(e);
            let message = e.message;
            if (e.error.message) message = e.error.message

            this._cusSnackbar.openCustomSnackbar("error", message, "Okay", 3000, 'danger');
          }
        });
      }
    })
  }

  onAddElement(event: any) {
    const dialogRef = this.dialog.open(UserAddEditComponent);

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) this.setUserList();
      }
    })
  }
}
