import React, { useState } from "react";
import Link from "@docusaurus/Link";
import styles from "./projectFeature.module.css";
import { useResolvedProjects } from "@site/src/components/ProjectFeature/util/useResolvedProjects";
import ProjectNav from "./view/projectNav";
import FeaturedProjectCard from "./view/featuredProjectCard";
import MobileProjectCard from "./view/mobileProjectCard";

export default function Index() {
    const resolvedProjects = useResolvedProjects();
    const [activeProjectId, setActiveProjectId] = useState<number>(
        resolvedProjects[0].id
    );

    const activeProject =
        resolvedProjects.find((p) => p.id === activeProjectId) ??
        resolvedProjects[0];

    return (
        <section id="projects" className={styles.section}>
            <div className="contentContainer">
                <div className={styles.container}>
                    <h2 className={styles.title}>My project highlights</h2>

                    <div className={styles.content}>
                        <ProjectNav
                            projects={resolvedProjects}
                            activeProjectId={activeProjectId}
                            onSelect={setActiveProjectId}
                        />
                        <FeaturedProjectCard project={activeProject} />
                    </div>

                    <div className={styles.projectsMobile}>
                        {resolvedProjects.map((project) => (
                            <MobileProjectCard key={project.id} project={project} />
                        ))}

                        <Link to="/docs/projects/overview" className={styles.more}>
                            → see more projects
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
