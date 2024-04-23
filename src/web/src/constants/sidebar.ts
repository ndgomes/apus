import { Home, AreaChart, Settings, Trophy, Info } from "lucide-react";

const sideBarMenu = [
  { name: "Dashboard", link: "#", icon: Home },
  { name: "How works", link: "#", icon: Info },
  { name: "Analytics", link: "#", icon: AreaChart },
  {
    name: "Achievements",
    link: "#",
    icon: Trophy,
    margin: true,
    disable: true,
  },
  // { name: "User", link: "#", icon: User },
  { name: "Settings", link: "#", icon: Settings },
];

export { sideBarMenu };
