export type Skill =
    | "YAML"
    | "Shell scripting"
    | "IT Security"
    | "Container"
    | "Python"
    | "CI/CD";

export type Project = {
    id: number;
    title: string;
    description: string;
    image: string;
    skills: Skill[];
    documentationUrl: string;
    githubUrl: string;
};

export type ResolvedSkill = {
    name: Skill;
    icon: string;
};

export type ResolvedProject = Omit<Project, "skills" | "image"> & {
    image: string;
    skills: ResolvedSkill[];
};
