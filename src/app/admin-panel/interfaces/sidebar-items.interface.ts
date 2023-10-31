
export interface SideBarItems {

  title: string;
  icon?: string;
  route?: string;
  submenu?: boolean;
  dropState?: boolean;
  submenuItems?: SideBarItems[];
}
