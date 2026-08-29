import React from "react";
import styles from "../contact.module.css";
import ContactItem from "./contactItem";
import { ContactListe } from "../data/contactListe";
export default function ContactLinks() {
    return (
        <div className={styles.right}>
            <p>Looking forward to hearing from you!</p>

            {ContactListe.map((link) => (
                <ContactItem key={link.id} link={link} />
            ))}
        </div>
    );
}