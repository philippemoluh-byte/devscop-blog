import type { Project, Skill } from "../types";

export const skillConfig: Record<Skill, string> = {
    YAML: "/img/portfolio/icons/propYaml.png",
    "Shell scripting": "/img/portfolio/icons/propShell.png",
    "IT Security": "/img/portfolio/icons/propITSec.png",
    Container: "/img/portfolio/icons/propContainer.png",
    Python: "/img/portfolio/icons/python.png",
    "CI/CD": "/img/portfolio/icons/cicd.png",
};

export const projects: Project[] = [
    {
        id: 1,
        title: "Conduit",
        description:
            "This project demonstrates a containerized fullstack web application with a Python backend and an Angular frontend, orchestrated using Docker Compose.",
        image: "/img/portfolio/icons/conduit_fullstack.png",
        skills: ["Container", "Python", "CI/CD"],
        documentationUrl: "/docs/projects/conduit-container",
        githubUrl: "https://github.com/philippemoluh-byte/conduit-container",
    },
    {
        id: 2,
        title: "Truck Signs API",
        description:
            "This project demonstrates deploying a Django REST API together with a PostgreSQL database using Docker.",
        image: "/img/portfolio/icons/truckSigns.png",
        skills: ["Container", "Python"],
        documentationUrl: "/docs/projects/truck-signs-api",
        githubUrl: "https://github.com/philippemoluh-byte/truck_signs_api",
    },
    {
        id: 3,
        title: "Juice Shop Meister",
        description:
            "This project documents selected OWASP Juice Shop challenges performed in a local test environment.",
        image: "/img/portfolio/icons/juiceShop.png",
        skills: ["IT Security"],
        documentationUrl: "/docs/projects/juice-shop-master",
        githubUrl:
            "https://github.com/philippemoluh-byte/devsecops-blog/blob/main/docs/projects/juice-shop-master/README.md",
    },
    {
        id: 4,
        title: "Minecraft",
        description:
            "This project demonstrates deploying a Minecraft Java Edition server using Docker and Docker Compose.",
        image: "/img/portfolio/icons/minecraft.png",
        skills: ["YAML", "Shell scripting", "Container"],
        documentationUrl: "/docs/projects/minecraft-server",
        githubUrl: "https://github.com/philippemoluh-byte/minecraft",
    },
    {
        id: 5,
        title: "Baby Tools",
        description:
            "This project provides a Dockerized setup for a Django-based Baby Tools Shop, enabling easy deployment and a reproducible development environment.",
        image: "/img/portfolio/icons/babyTools.png",
        skills: ["Shell scripting", "Container", "Python"],
        documentationUrl: "/docs/projects/baby-tools-world",
        githubUrl: "https://github.com/philippemoluh-byte/baby-tools-world",
    },
];
