import React from "react";
import styles from "../projectFeature.module.css";
import SkillList from "./skillList";
import ProjectActions from "./projectActions";
import type { ResolvedProject } from "../types";

type MobileProjectCardProps = {
    project: ResolvedProject;
};

export default function MobileProjectCard({
    project,
}: MobileProjectCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.cardLeft}>
                <h3 className={styles.cardTitle}>
                    {project.id}. {project.title}
                </h3>

                <SkillList skills={project.skills} />

                <div className={styles.imageBlock}>
                    <img
                        src={project.image}
                        alt={project.title}
                        className={styles.projectImage}
                    />
                </div>

                <div className={styles.description}>
                    <p>{project.description}</p>
                </div>

                <ProjectActions
                    documentationUrl={project.documentationUrl}
                    githubUrl={project.githubUrl}
                />
            </div>
        </div>
    );
}
