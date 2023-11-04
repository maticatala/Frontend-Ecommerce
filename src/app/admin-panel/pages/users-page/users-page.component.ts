import { User } from './../../../auth/interfaces/user.interface';
import { Component, /*EventEmitte,*/ HostListener, OnInit, /*Output,*/ ViewChild, inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Column, SpecialKeys } from 'src/app/shared/interfaces';
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

  public dataSource = new MatTableDataSource();

  columns: Column[] = [
    {id:'id',        label:'ID',       breakpoint: 'md', width: 10},
    {id:'email',     label:'Email',    breakpoint: 'static'},
    {id:'name',      label:'Nombre',   breakpoint: 'md'},
    {id:'createdAt', label:'Creado',   breakpoint: 'lg'},
    {id:'rol',       label:'Rol',      breakpoint: 'sm'},
    {id:'action',    label:'Acciones', breakpoint: 'static'},
  ]

  ngOnInit(){

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
}
