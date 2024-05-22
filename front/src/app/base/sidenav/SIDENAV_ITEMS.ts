import { SidenavItem } from "app/base/sidenav/sidenav.model";

export const SIDENAV_ITEMS: SidenavItem[] = [
  {
    id: 'Products',
    icon: 'pi pi-shopping-cart',
    labels: {
      en: "Products",
      fr: "Produits"
    },
    link: 'products'

  },
  {
    id: 'Admin',
    icon: 'pi pi-users',
    labels: {
      en: "Admin",
      fr: "Admin"
    },
    link: 'admin/products'

  }

];