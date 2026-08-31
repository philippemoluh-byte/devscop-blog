import React from "react";
import styles from "../skills.module.css";

type PaginationDotsProps = {
    totalPages: number;
    activePage: number;
    onSelect: (page: number) => void;
};

export default function PaginationDots({
    totalPages,
    activePage,
    onSelect,
}: PaginationDotsProps) {
    return (
        <div className={styles.skills__pagination}>
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    type="button"
                    className={`${styles.skills__dot} ${
                        i === activePage ? styles.skills__dotActive : ""
                    }`}
                    onClick={() => onSelect(i)}
                    aria-label={`Go to slide ${i + 1}`}
                />
            ))}
        </div>
    );
}
