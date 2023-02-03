import React from "react";
import { useSession } from "next-auth/react";
import css from "./index.module.scss";

export default function CenterAdmin() {
  const session = useSession();
  const svgStr = session.data.user.garden;

  return (
    <div className={css.container}>
      <div dangerouslySetInnerHTML={{ __html: svgStr }} />
    </div>
  );
}
