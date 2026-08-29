import React from "react";
import styles from "../skills.module.css";
import SkillCard from "./SkillCard";
import type { Skill } from "../types";

type SkillGridProps = {
    skills: Skill[];
};

export default function SkillGrid({ skills }: SkillGridProps) {
    return (
        <div className={styles.skills__grid}>
            {skills.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
            ))}
        </div>
    );
}
