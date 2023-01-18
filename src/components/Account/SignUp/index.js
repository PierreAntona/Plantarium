import React, { useState } from "react";
import css from "./index.module.scss";
import axios from "axios";

import { useRouter } from "next/router";

function SignUp({ alreadyAnAccount, setAlreadyAnAccount }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const router = useRouter();

  const register = () => {
    axios({
      method: "post",
      data: {
        mail: emailInput,
        password: passwordInput
      },
      withCredentials: true,
      url: "http://localhost:3001/register"
    }).then((res) => console.log(res)).catch((err) => console.log(err));

    router.push('/login')

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className={css.container}>
      <span className={css.title}>Créer un compte</span>
      <div className={css.signUpWith}>
        <div className={css.signUpWithButton}>
          <img src="/img/googleIcon.svg" />
          <span>S'inscrire avec Google</span>
        </div>
        <div className={css.signUpWithButton}>
          <img className={css.icons} src="/img/facebookIcon.svg" />
          <span>S'inscrire avec Facebook</span>
        </div>
      </div>
      <div className={css.or}>
        <span>Ou</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Adresse e-mail<span>*</span></label>
        <input
          type="text"
          required
          name="mail"
          value={emailInput}
          placeholder="exemple@mail.fr"
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <label>Mot de passe<span>*</span></label>
        <input
          type="password"
          required
          name="password"
          valut={passwordInput}
          placeholder="••••••••••••"
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <label>Confirmer le mot de passe<span>*</span></label>
        <input
          type="password"
          required
          valut={passwordInput}
          placeholder="••••••••••••"
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button onClick={register} type="submit">Continuer</button>
      </form>
      <span
        onClick={() => setAlreadyAnAccount(!alreadyAnAccount)}
        className={css.signIn}
      >
        Se connecter
      </span>
    </div>
  );
}

export default SignUp;
