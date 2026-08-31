import React from "react";
import styles from "../projectFeature.module.css";
import SkillTag from "./skillTag";
import type { ResolvedSkill } from "../types";

type SkillListProps = {
    skills: ResolvedSkill[];
};

export default function SkillList({ skills }: SkillListProps) {
    return (
        <div className={styles.tags}>
            {skills.map((skill) => (
                <SkillTag key={skill.name} skill={skill} />
            ))}
        </div>
    );
}
