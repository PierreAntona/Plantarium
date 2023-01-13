import React, { useState } from "react";
import css from "./index.module.scss";
import axios from "axios";

function SignUp({ alreadyAnAccount, setAlreadyAnAccount }) {
  const [mailInput, setMailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const register = () => {
    axios({
      method: "post",
      data: {
        mail: mailInput,
        password: passwordInput
      },
      withCredentials: true,
      url: "http://localhost:3000/login"
    }).then((res) => console.log(res)).catch((err) => console.log(err));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(mailInput, passwordInput);
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
          value={mailInput}
          placeholder="exemple@mail.fr"
          onChange={(e) => setMailInput(e.target.value)}
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
