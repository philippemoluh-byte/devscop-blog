import React, { useMemo, useState } from "react";
import styles from "./skills.module.css";
import { useResolvedSkills } from "./utils/useResolvedSkills";
import { chunk } from "./utils/chunk";
import SkillGrid from "./views/SkillGrid";
import MobileSkillsCarousel from "./views/MobileSkillsCarousel";

const MOBILE_GROUP_SIZE = 3;

export default function Skills() {
    const resolvedSkills = useResolvedSkills();

    const groupedSkills = useMemo(
        () => chunk(resolvedSkills, MOBILE_GROUP_SIZE),
        [resolvedSkills]
    );

    const [page, setPage] = useState(0);

    return (
        <section id="skills" className={styles.skills}>
            <div className="contentContainer">
                <div className={styles.skills__content}>
                    <h2 className={styles.skills__title}>My skills</h2>

                    <SkillGrid skills={resolvedSkills} />

                    <MobileSkillsCarousel
                        group={groupedSkills[page] ?? []}
                        page={page}
                        totalPages={groupedSkills.length}
                        onPageChange={setPage}
                    />
                </div>
            </div>
        </section>
    );
}
