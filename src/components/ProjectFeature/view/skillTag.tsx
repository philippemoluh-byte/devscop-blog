import React from "react";
import styles from "../projectFeature.module.css";
import type { ResolvedSkill } from "../types";

type SkillTagProps = {
    skill: ResolvedSkill;
};

export default function SkillTag({ skill }: SkillTagProps) {
    return (
        <span className={styles.skillTag}>
            <img src={skill.icon} className={styles.skillIcon} alt={skill.name} />
            <span className={styles.skillText}>{skill.name}</span>
        </span>
    );
}
