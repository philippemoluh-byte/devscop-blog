import React from "react";
import styles from "../contact.module.css";
import { highlights } from "../data/highlights";

export default function ContactHighlights() {
    return (
        <div className={styles.left}>
            <h2>Contact me</h2>
            <ul>
                {highlights.map((text) => (
                    <li key={text}>{text}</li>
                ))}
            </ul>
        </div>
    );
}
