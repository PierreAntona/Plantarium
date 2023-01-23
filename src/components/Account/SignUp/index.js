import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import css from "./index.module.scss";

function SignUp({ alreadyAnAccount, setAlreadyAnAccount }) {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  const [registerError, setRegisterError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterError("");

    if (passwordInput === confirmPasswordInput) {
      const data = {
        email: emailInput,
        password: passwordInput,
      };

      await axios.post("/api/register", data);

      signIn("credentials", {
        emailInput,
        passwordInput,
        callbackUrl: `/dashboard`,
        redirect: false,
      })
        .then(function (result) {
          router.push(result.url);
        })
        .catch((err) => {
          alert("Erreur: " + err.toString());
        });
    } else {
      setRegisterError("Les mots de passe sont différents.");
    }
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
        <label>
          Adresse e-mail<span>*</span>
        </label>
        <input
          type="text"
          required
          value={emailInput}
          placeholder="exemple@mail.fr"
          onChange={(e) => setEmailInput(e.target.value)}
        />
        <label>
          Mot de passe<span>*</span>
        </label>
        <input
          type="password"
          required
          value={passwordInput}
          autoComplete="off"
          placeholder="••••••••••••"
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <label>
          Confirmer le mot de passe<span>*</span>
        </label>
        <input
          type="password"
          required
          autoComplete="off"
          value={confirmPasswordInput}
          placeholder="••••••••••••"
          onChange={(e) => setConfirmPasswordInput(e.target.value)}
        />
        <button type="submit">Continuer</button>
      </form>
      <span className={css.error}>{registerError}</span>
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
