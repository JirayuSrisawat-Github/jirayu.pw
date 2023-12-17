import { Link } from "@nextui-org/link";
import NextLink from "next/link";

export default () => (
  <footer className="flex flex-col items-center space-y-1 pb-24">
    <p>
      จัดทำโดย{" "}
      <Link
        isExternal
        showAnchorIcon
        as={NextLink}
        href={"https://jirayu.pw"}
        className="font-bold"
      >
        จิรายุ ศรีสวัสดิ์
      </Link>
    </p>
    <p>รังสิต ธัญบุรี ปทุมธานี ประเทศไทย 12110</p>
  </footer>
);
