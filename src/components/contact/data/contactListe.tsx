import React from "react";
import type { ContactLink } from "../types";
import LinkedInIcon from "@site/src/components/contact/icon/linkedInIcon";
import MailIcon from "@site/src/components/contact/icon/mailIcon";

export const ContactListe: ContactLink[] = [
    {
        id: "email",
        href: "mailto:philippemoluh@googlemail.com",
        label: "philippemoluh@googlemail.com",
        icon: <MailIcon />,
    },
    {
        id: "linkedin",
        href: "https://www.linkedin.com/in/philippe-bertrand-kouotou-moluh-b4653a138/",
        label: "Profile Page",
        icon: <LinkedInIcon />,
        external: true,
    },
];
