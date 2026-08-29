import React from "react";
import styles from "../projectFeature.module.css";
import SkillList from "./skillList";
import ProjectActions from "./projectActions";
import type { ResolvedProject } from "../types";

type FeaturedProjectCardProps = {
    project: ResolvedProject;
};

export default function FeaturedProjectCard({
    project,
}: FeaturedProjectCardProps) {
    return (
        <div className={styles.card}>
            <div className={styles.cardLeft}>
                <h3 className={styles.cardTitle}>{project.title}</h3>

                <div className={styles.imageBlock}>
                    <img
                        src={project.image}
                        alt={project.title}
                        className={styles.projectImage}
                    />
                </div>
            </div>

            <div className={styles.cardRight}>
                <SkillList skills={project.skills} />

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
