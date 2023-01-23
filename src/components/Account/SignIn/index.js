import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import css from "./index.module.scss";

function SignIn({ alreadyAnAccount, setAlreadyAnAccount }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setLoginError("");

    signIn("credentials", {
      emailInput,
      passwordInput,
      callbackUrl: `/dashboard`,
      redirect: false,
    }).then(function (result) {
      if (result.error !== null) {
        if (result.status === 401) {
          setLoginError("Adresse ou mot de passe incorrect.");
        } else {
          setLoginError(result.error);
        }
      } else {
        router.push(result.url);
      }
    });
  };

  return (
    <div className={css.container}>
      <span className={css.title}>Se connecter</span>
      <div className={css.signInWith}>
        <div className={css.signInWithButton}>
          <img src="/img/googleIcon.svg" />
          <span>Se connecter avec Google</span>
        </div>
        <div className={css.signInWithButton}>
          <img className={css.icons} src="/img/facebookIcon.svg" />
          <span>Se connecter avec Facebook</span>
        </div>
      </div>
      <div className={css.signInWithPlantarium}>
        <span>Utiliser son compte Plantarium</span>
      </div>
      <form onSubmit={handleSubmit}>
        <label>Adresse e-mail</label>
        <input
          type="email"
          required
          value={emailInput}
          placeholder="exemple@mail.fr"
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <label>Mot de passe</label>
        <input
          type="password"
          required
          value={passwordInput}
          autoComplete="off"
          placeholder="••••••••••••"
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button type="submit">Continuer</button>
      </form>
      <span className={css.error}>{loginError}</span>
      <span
        onClick={() => setAlreadyAnAccount(!alreadyAnAccount)}
        className={css.signUp}
      >
        Créer un compte
      </span>
    </div>
  );
}

export default SignIn;
