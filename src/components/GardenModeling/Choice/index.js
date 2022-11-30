import css from "./index.module.scss";

export default function Choice({ typeOfModeling, setTypeOfModeling }) {
  return (
    <div className={css.container}>
      <span className={css.question}>Modelisez votre jardin</span>
      <div className={css.buttons}>
        <div className={css.button} onClick={() => setTypeOfModeling('satelite')}>
          <span>Vue satellite</span>
        </div>
        <div className={css.button} onClick={() => setTypeOfModeling('form')}>
          <span>Nos formats</span>
        </div>
      </div>
    </div>
  );
}
