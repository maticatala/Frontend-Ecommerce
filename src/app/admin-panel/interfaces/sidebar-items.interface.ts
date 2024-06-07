import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface SideBarItems {
  title: string;
  icon?: IconDefinition;
  route?: string;
  submenu?: boolean;
  dropState?: boolean;
  submenuItems?: SideBarItems[];
}
