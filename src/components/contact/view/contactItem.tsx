import React from "react";
import styles from "../contact.module.css";
import type { ContactLink } from "../types";

type ContactItemProps = {
    link: ContactLink;
};

export default function ContactItem({ link }: ContactItemProps) {
    return (
        <div className={styles.contactItem}>
            <span className={styles.icon}>{link.icon}</span>
            <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
            >
                {link.label}
            </a>
        </div>
    );
}
