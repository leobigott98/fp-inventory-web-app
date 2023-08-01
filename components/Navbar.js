import Link from "next/link";
import styles from "../styles/layout.module.css";

export default function Navbar() {
  return (
    <div>
      <div className={styles.navbarContainer}>
        <ul className={styles.navbar}>
          <li className={styles.logo}>
            <Link href="/">
                <img src="/images/PuntoGo_efecto3D.png" width="180" height="40"/>
            </Link>
          </li>
          <li className={styles.option}>
            <Link href="/inventario">Inventario</Link>
          </li>
          <li className={styles.option}>
            <Link href="/">Comercios</Link>
          </li>
          <li className={styles.option}>
            <Link href="/">Configuración</Link>
          </li>
          <li className={styles.option}>
            <Link href="/login">Login</Link> / <Link href="/register">Registrarse</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
