import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component } from '@angular/core';
import { AppRoute, childRoutes } from 'src/app/admin-panel/layouts/layout-page/child-routes';

@Component({
  selector: 'admin-side-nav-closed',
  templateUrl: './side-nav-closed.component.html',
  styleUrls: ['./side-nav-closed.component.css']
})
export class SideNavClosedComponent {
  treeControl = new NestedTreeControl<AppRoute>(node => node.children);
  dataSource = new ArrayDataSource(childRoutes);
  hasChild = (_: number, node: AppRoute) => !!node.children && node.children.length > 0;
  constructor() { }
}
