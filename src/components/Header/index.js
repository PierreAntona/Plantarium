import css from './index.module.scss'

export default function Header() {
    return (
        <div className={css.container}>
            <img src="/img/logo.png"/>
            <div className={css.menu}>
                <span>À Propos</span>
                <span>Se connecter</span>
            </div>
        </div>
    )
}