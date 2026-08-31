import React from "react";
import styles from "../skills.module.css";
import type { Skill } from "../types";

const MOBILE_ITEM_LIMIT = 3;

type MobileSkillRowProps = {
    skill: Skill;
};

export default function MobileSkillRow({ skill }: MobileSkillRowProps) {
    return (
        <div className={styles.skills__mobileRow}>
            <div className={styles.skills__mobileIconCol}>
                <img
                    src={skill.icon}
                    alt={skill.name}
                    className={styles.skills__mobileIcon}
                />
                <h3 className={styles.skills__mobileLabel}>{skill.name}</h3>
            </div>

            <ul className={styles.skills__mobileText}>
                {skill.items.slice(0, MOBILE_ITEM_LIMIT).map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
