import { useMemo } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { projects, skillConfig } from "../data/projects.data";
import type { ResolvedProject } from "../types";

/**
 * Resolves every image/icon path in the static project data through
 * Docusaurus' useBaseUrl, so the raw data file stays framework-agnostic.
 */
export function useResolvedProjects(): ResolvedProject[] {
    return projects.map((project) => ({
        ...project,
        image: useBaseUrl(project.image),
        skills: project.skills.map((skill) => ({
            name: skill,
            icon: useBaseUrl(skillConfig[skill]),
        })),
    }));
}
