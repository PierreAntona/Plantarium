import Link from "next/link";
import css from "./index.module.scss";

export default function Header(props) {
  return (
    <div className={css.container}>
      <Link href="/">
        <img src="/img/logo.png" />
      </Link>
      {props.isLog === false ? (
        <div className={css.menu}>
          <span className={props.active == "about" ? css.active : null}>
            À Propos
          </span>
          <span className={props.active == "login" ? css.active : null}>
            <Link
              href={{
                pathname: "/login",
                query: { page: "login" },
              }}
            >
              Se connecter
            </Link>
          </span>
        </div>
      ) : (
        <div className={css.icons}>
          <img src="/img/icon_print.png" />
          <img src="/img/icon_share.png" />
          <img src="/img/icon_account.png" />
        </div>
      )}
    </div>
  );
}
