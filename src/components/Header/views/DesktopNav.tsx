import styles from "../header.module.css";
import { NAV_LINKS } from "../data/navLinks";

export default function DesktopNav() {
    return (
        <nav className={styles.nav}>
            {NAV_LINKS.map((link) => (
                <a key={link.id} href={link.href}>
                    {link.label}
                </a>
            ))}
        </nav>
    );
}
