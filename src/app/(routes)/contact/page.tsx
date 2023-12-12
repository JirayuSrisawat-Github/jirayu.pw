import { Link } from "@nextui-org/link";
import NextLink from "next/link";

export default () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="shadow w-full m-2 p-6 rounded-xl bg-white/5">
        <p>Facebook</p>
        <Link
          isExternal
          showAnchorIcon
          as={NextLink}
          href={"https://facebook.com/@j1rayu.pw"}
          className="font-bold"
        >
          @j1rayu.pw
        </Link>
      </div>
      <div className="shadow w-full m-2 p-6 rounded-xl bg-white/5">
        <p>Email</p>
        <Link
          isExternal
          showAnchorIcon
          as={NextLink}
          href={"mailto:jirayu@jirayu.pw"}
          className="font-bold"
        >
          jirayu@jirayu.pw
        </Link>
      </div>
      <div className="shadow w-full m-2 p-6 rounded-xl bg-white/5">
        <p>Discord</p>
        <Link
          isExternal
          showAnchorIcon
          as={NextLink}
          href={"https://discord.com/users/1089356674764120125"}
          className="font-bold"
        >
          @jirayu_pw
        </Link>
      </div>
      <div className="shadow w-full m-2 p-6 rounded-xl bg-white/5">
        <p>Instragram</p>
        <Link
          isExternal
          showAnchorIcon
          as={NextLink}
          href={"https://www.instagram.com/jirayu_pw/"}
          className="font-bold"
        >
          @jirayu_pw
        </Link>
      </div>
    </div>
  </>
);

