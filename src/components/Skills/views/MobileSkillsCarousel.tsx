import React from "react";
import styles from "../skills.module.css";
import MobileSkillRow from "./MobileSkillRow";
import PaginationDots from "./PaginationDots";
import type { Skill } from "../types";

type MobileSkillsCarouselProps = {
    group: Skill[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export default function MobileSkillsCarousel({
    group,
    page,
    totalPages,
    onPageChange,
}: MobileSkillsCarouselProps) {
    return (
        <div className={styles.skills__mobile}>
            <div className={styles.skills__mobileCard}>
                {group.map((skill) => (
                    <MobileSkillRow key={skill.name} skill={skill} />
                ))}
            </div>

            <PaginationDots
                totalPages={totalPages}
                activePage={page}
                onSelect={onPageChange}
            />
        </div>
    );
}
