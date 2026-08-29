import styles from "../header.module.css";

type BurgerButtonProps = {
    open: boolean;
    onClick: () => void;
};

export default function BurgerButton({ open, onClick }: BurgerButtonProps) {
    return (
        <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            onClick={onClick}
            aria-label="Toggle menu"
        >
            <span />
            <span />
            <span />
        </button>
    );
}
