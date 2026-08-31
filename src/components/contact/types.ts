import type { ReactNode } from "react";

export type ContactLink = {
    id: string;
    href: string;
    label: string;
    icon: ReactNode;
    external?: boolean;
};
