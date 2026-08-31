import React from "react";
import styles from "../skills.module.css";
import type { Skill } from "../types";

type SkillCardProps = {
    skill: Skill;
};

export default function SkillCard({ skill }: SkillCardProps) {
    return (
        <article className={styles.skills__card}>
            <div className={styles.skills__cardInner}>
                <div className={styles.skills__cardFront}>
                    <div className={styles.skills__cardContent}>
                        <img
                            src={skill.icon}
                            alt={skill.name}
                            className={styles.skills__icon}
                        />
                        <h3 className={styles.skills__label}>{skill.name}</h3>
                    </div>
                </div>

                <div className={styles.skills__cardBack}>
                    <div className={styles.skills__cardContent}>
                        <h3 className={styles.skills__label}>{skill.name}</h3>
                        <ul className={styles.skills__description}>
                            {skill.items.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    );
}
