import { useState } from "react";
import styles from "./header.module.css";
import { useAutoHideHeader } from "./utils/useAutoHideHeader";
import BurgerButton from "./views/BurgerButton";
import DesktopNav from "./views/DesktopNav";
import MobileMenu from "./views/MobileMenu";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const hidden = useAutoHideHeader();

    return (
        <header
            className={`${styles.header} ${hidden ? styles.headerHidden : ""}`}
        >
            <div className="contentContainer">
                <div className={styles.header__content}>
                    <DesktopNav />
                    <BurgerButton
                        open={menuOpen}
                        onClick={() => setMenuOpen((prev) => !prev)}
                    />
                </div>
            </div>

            <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    );
}
