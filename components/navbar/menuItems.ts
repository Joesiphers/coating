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
    href: "/about",
    icon: ChartPieIcon,
  },
  {
    name: "Products and Services",
    description: "",
    href: "/products",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Tech behide",
    href: "/tech",
    icon: FingerPrintIcon,
  },
  {
    name: "Project Experience",
    href: "/projects",
    icon: SquaresPlusIcon,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: ArrowPathIcon,
  },
  {
    name: "Admin",
    href: "/admin",
    icon: ArrowPathIcon,
  },
];
export default menuItems;
