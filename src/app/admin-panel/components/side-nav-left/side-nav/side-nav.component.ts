import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Output } from '@angular/core';
import { AppRoute, childRoutes } from 'src/app/admin-panel/layouts/layout-page/child-routes';

@Component({
  selector: 'admin-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  @Output() buttonClick = new EventEmitter<void>();
  treeControl = new NestedTreeControl<AppRoute>(node => node.children);

  // create data source object
  dataSource = new ArrayDataSource(childRoutes);
  hasChild = (_: number, node: AppRoute) => !!node.children && node.children.length > 0;

  constructor() { }

  OnButtonClick(): void {
    this.buttonClick.emit();
  }
}
