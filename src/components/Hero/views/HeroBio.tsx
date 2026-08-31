import React from "react";
import styles from "../hero.module.css";

type HeroBioProps = {
    paragraphs: string[];
};

export default function HeroBio({ paragraphs }: HeroBioProps) {
    return (
        <div className={styles.hero__text}>
            {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
            ))}
        </div>
    );
}
