import { DesktopNav } from "./DesktopNav";
import { MobileNavbar } from "./MobileNavbar";
import { CategoryNav } from "@/components/organisms/CategoryNav";

function Navbar() {
  return (
    <>
      <DesktopNav />
      <MobileNavbar />
      <CategoryNav />
    </>
  );
}

export { Navbar };
