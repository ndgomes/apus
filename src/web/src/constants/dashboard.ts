import { Home, User, AreaChart, Settings } from "lucide-react";

const sideBarMenu = [
  { name: "Dashboard", link: "/", icon: Home },
  { name: "User", link: "/", icon: User },
  { name: "Analytics", link: "/", icon: AreaChart, margin: true },
  { name: "Settings", link: "/", icon: Settings },
];

export { sideBarMenu };
