import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
/*Icons for Tabs*/
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

const menuItems = [
  {
    name: "About - us",
    description: "Along understanding ",
    href: "/pages/about",
    icon: ChartPieIcon,
  },
  {
    name: "Products and Services",
    description: "",
    href: "/pages/products",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Tech behide",
    href: "/pages/tech",
    icon: FingerPrintIcon,
  },
  {
    name: "Project Experience",
    href: "/pages/projects",
    icon: SquaresPlusIcon,
  },
  {
    name: "Contact",
    href: "/pages/contact",
    icon: ArrowPathIcon,
  },
  {
    name: "Admin",
    href: "/pages/admin",
    icon: ArrowPathIcon,
  },
];
export default menuItems;
