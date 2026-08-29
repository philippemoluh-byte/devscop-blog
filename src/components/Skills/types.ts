export type Skill = {
    name: string;
    /**
     * Raw value in ./data/skills.data.ts is a site-relative path; useResolvedSkills
     * rewrites it to the resolved (useBaseUrl) URL before components see it.
     */
    icon: string;
    items: string[];
};
