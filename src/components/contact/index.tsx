import React from "react";
import styles from "./contact.module.css";
import ContactHighlights from "./view/contactHighlights";
import ContactLinks from "./view/contactLinks";

export default function Contact() {
    return (
        <section id="contact" className={styles.contactSection}>
            <div className="contentContainer">
                <div className={styles.contactSection__content}>
                    <ContactHighlights />
                    <ContactLinks />
                </div>
            </div>
        </section>
    );
}
