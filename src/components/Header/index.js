import Link from "next/link";
import css from "./index.module.scss";

export default function Header(props) {
  return (
    <div className={css.container}>
      <Link href="/">
        <img src="/img/logo.png" />
      </Link>
      <div className={css.menu}>
        <span className={props.active == "about" ? css.active : null}>
          À Propos
        </span>
        <span className={props.active == "login" ? css.active : null}>
          <Link href="/login">Se connecter</Link>
        </span>
      </div>
    </div>
  );
}
