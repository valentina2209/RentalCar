import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import Logo from "../../assets/logo.svg"

export default function Header() {
    return (
        <header className={css.header}>
            <div className={css.logo}>
                <NavLink to='/'>
                    <Logo className={css.logoSvg} />
                </NavLink>
            </div>
            <nav className={css.nav}>
                <NavLink
                    to="/"
                    className={({ isActive }) => (isActive ? css.activeLink : css.link)}
                >
                    Home
                </NavLink>
                <NavLink
                    to="/catalog"
                    className={({ isActive }) => (isActive ? css.activeLink : css.link)}
                >
                    Catalog
                </NavLink>
            </nav>
        </header>
    );
}
