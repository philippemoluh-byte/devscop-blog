import { useMemo } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { SkillsData } from "../data/skills.data";
import type { Skill } from "../types";

/**
 * Resolves every icon path in SkillsData through Docusaurus' useBaseUrl,
 * once per mount, so components downstream just render skill.icon directly
 * instead of every card/row calling useBaseUrl itself.
 */
export function useResolvedSkills(): Skill[] {
    return SkillsData.map((skill) => ({
        ...skill,
        icon: useBaseUrl(skill.icon),
    }));
}
