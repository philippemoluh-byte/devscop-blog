import React from "react";
import Link from "@docusaurus/Link";
import styles from "../projectFeature.module.css";

type ProjectActionsProps = {
    documentationUrl: string;
    githubUrl: string;
};

export default function ProjectActions({
    documentationUrl,
    githubUrl,
}: ProjectActionsProps) {
    return (
        <div className={styles.actions}>
            <Link to={documentationUrl} className={styles.primary}>
                Documentation
            </Link>

            <a
                href={githubUrl}
                className={styles.secondary}
                target="_blank"
                rel="noopener noreferrer"
            >
                GitHub
            </a>
        </div>
    );
}
