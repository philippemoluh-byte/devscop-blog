import React from "react";
import styles from "../hero.module.css";

type ProfileImageProps = {
    src: string;
    alt: string;
    wrapperClassName: string;
};

export default function ProfileImage({
    src,
    alt,
    wrapperClassName,
}: ProfileImageProps) {
    return (
        <div className={wrapperClassName}>
            <img src={src} alt={alt} className={styles.hero__image} />
        </div>
    );
}
