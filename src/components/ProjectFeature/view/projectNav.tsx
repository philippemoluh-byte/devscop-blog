import React from "react";
import Link from "@docusaurus/Link";
import styles from "../projectFeature.module.css";
import type { ResolvedProject } from "../types";

type ProjectNavProps = {
    projects: ResolvedProject[];
    activeProjectId: number;
    onSelect: (id: number) => void;
};

export default function ProjectNav({
    projects,
    activeProjectId,
    onSelect,
}: ProjectNavProps) {
    return (
        <nav className={styles.nav}>
            {projects.map((project) => (
                <button
                    key={project.id}
                    type="button"
                    className={`${styles.navItem} ${
                        project.id === activeProjectId ? styles.active : ""
                    }`}
                    onClick={() => onSelect(project.id)}
                >
                    {project.id}. {project.title}
                </button>
            ))}

            <Link to="/docs/projects/overview" className={styles.more}>
                → see more projects
            </Link>
        </nav>
    );
}
