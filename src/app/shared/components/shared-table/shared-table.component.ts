import { Component, Input, ChangeDetectionStrategy, AfterContentInit, OnDestroy, ViewChild, ChangeDetectorRef, NgZone, OnInit, HostListener, Output, EventEmitter } from "@angular/core";
import { FormControl } from '@angular/forms';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { Column, SpecialKeys } from "../../interfaces";


@Component({
  selector: 'shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
  trigger('detailExpand', [
    state(
      'collapsed',
      style({ height: '0', minHeight: '0', visibility: 'hidden' })
    ),
    state('expanded', style({ maxHeight: 'min-content', visibility: 'visible' })),
    transition('expanded <=> collapsed', [
      animate('250ms ease-in-out'),
    ]),
  ]),
],
})

export class SharedTableComponent implements AfterContentInit  {

  private debounceTimer?: NodeJS.Timeout; //* Sirve para esperar hasta que el usuario termine de ingresar texto en el input y asi no sobrecargarlo

  // Filter Fields
  generalFilter = new FormControl

  // Visible Hidden Columns
  visibleColumns?: Column[];
  hiddenColumns?: Column[];
  expandedElement:any = {}

  // MatPaginator Inputs
  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // MatPaginator Output
  pageEvent?: PageEvent;

  // Shared Variables
  @Input() dataSource!: MatTableDataSource<any>;
  @Input() columnsdef!: Column[];

  // MatTable
  @ViewChild(MatTable, { static: true })  dataTable!: MatTable<Element>;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator!: MatPaginator;


  get visibleColumnsIds() {
    if (!this.visibleColumns) return;

    const visibleColumnsIds = this.visibleColumns.map(column => column.id)

    return this.hiddenColumns!.length ? ['trigger', ...visibleColumnsIds] : visibleColumnsIds
  }

  get hiddenColumnsIds() {
    if (!this.hiddenColumns) return
    return this.hiddenColumns.map(column => column.id)
  }

  // isExpansionDetailRow = (index: any, item: any) => item.hasOwnProperty('detailRow');

  constructor(private _changeDetectorRef: ChangeDetectorRef){}

  ngAfterContentInit() {
    this.toggleColumns();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    this.dataSource.sortingDataAccessor = (data: any, sortHeaderId: string) => {
      const value: any = data[sortHeaderId];
      return typeof value === "string" ? value.toLowerCase() : value;
    };

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.toggleColumns();
  }

  toggleColumns() {
    const tableWidth = window.innerWidth; // Obtén el ancho de la ventana
    const breakpoints = {
      static: 0,
      sm: 640, // Define tus breakpoints de acuerdo a Tailwind
      md: 768,
      lg: 1024,
      xl: 1280,
    };

    this.columnsdef.forEach((column) => {
      const breakpoint = column.breakpoint; // Supongamos que cada columna tiene una propiedad "breakpoint"

      if (breakpoints[breakpoint] && tableWidth < breakpoints[breakpoint]) {
        column.visible = false;
      } else {
        column.visible = true;
      }
    });

    this.visibleColumns = this.columnsdef.filter((column) => column.visible);
    this.hiddenColumns = this.columnsdef.filter((column) => !column.visible);

    this._changeDetectorRef.detectChanges();
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

  @Output() elementoEditado = new EventEmitter<any>();
  @Output() elementoEliminado = new EventEmitter<any>();
  @Output() elementoAgregado = new EventEmitter<any>();

  // Lógica para editar y eliminar elementos
  editarElemento(elemento: any) {
    // Realiza la edición
    this.elementoEditado.emit(elemento);
  }

  eliminarElemento(elemento: any) {
    // Realiza la eliminación
    this.elementoEliminado.emit(elemento);
  }

  agregarElemento(evento: any) {
    this.elementoAgregado.emit(evento);
  }
}
