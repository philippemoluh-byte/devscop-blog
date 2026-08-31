import styles from "../header.module.css";
import { NAV_LINKS } from "../data/navLinks";

type MobileMenuProps = {
    open: boolean;
    onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
    return (
        <div
            className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ""}`}
        >
            <button
                className={styles.closeButton}
                onClick={onClose}
                aria-label="Close menu"
            >
                ✕
            </button>

            <nav className={styles.mobileNav}>
                {NAV_LINKS.map((link) => (
                    <a key={link.id} href={link.href} onClick={onClose}>
                        {link.label}
                    </a>
                ))}
            </nav>
        </div>
    );
}
