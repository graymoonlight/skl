import styles from '../styles/modules/Header.module.css'
import { NavLink} from 'react-router-dom';

export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.headerLogo}>
            <h1 className={styles.logoPartOne}>Best</h1>
            <h1 className={styles.logoPartTwo}>Meat</h1>
        </div>
        <div className={styles.headerNavigation}>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
            >
              Главная
            </NavLink>
            <NavLink 
              to="/booking" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
            >
              Забронировать
            </NavLink>
            <NavLink 
              to="/order" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
            >
              Мои бронирования
            </NavLink>
        </div>
        <div className={styles.headerAuth}>
            <NavLink 
              to="/register" 
              className={({ isActive }) => isActive ? 'active-link' : ''}
            >
              Войти
            </NavLink>
        </div>
    </header>
  );
}