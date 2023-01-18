import Link from "next/link";
import React, { useState, useEffect } from "react";
import css from "./index.module.scss";
import axios from "axios";

export default function Header(props) {
  // const [emailInput, setEmailInput] = useState('');

  // useEffect(() => {
  //   getUser();
  // }, []);

  // const getUser = () => {
  //   axios({
  //     method: "get",
  //     withCredentials: true,
  //     url: "http://localhost:3001/getUser"
  //   }).then(res => { setEmailInput(res.data.emailInput) }).catch((err) => console.log(err));
  // }

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

        {/* <span> Logged as ..{emailInput} </span> */}
      </div>
    </div>
  );
}
