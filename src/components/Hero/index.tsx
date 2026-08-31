import React from "react";
import styles from "./hero.module.css";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { HERO_CONTENT } from "./data/heroContent";
import ProfileImage from "./views/ProfileImage";
import HeroBio from "./views/HeroBio";

export default function Hero() {
    const imageSrc = useBaseUrl(HERO_CONTENT.imagePath);

    return (
        <section id="about" className={styles.hero}>
            <div className="contentContainer">
                <div className={styles.hero__container}>
                    <div className={styles.hero__content}>
                        <p className={styles.hero__intro}>{HERO_CONTENT.intro}</p>

                        <h1 className={styles.hero__title}>{HERO_CONTENT.name}</h1>

                        <h2 className={styles.hero__subtitle}>{HERO_CONTENT.role}</h2>

                        <ProfileImage
                            src={imageSrc}
                            alt={HERO_CONTENT.imageAlt}
                            wrapperClassName={styles.hero__imageWrapperMobile}
                        />

                        <HeroBio paragraphs={HERO_CONTENT.bioParagraphs} />

                        <a href={HERO_CONTENT.ctaHref} className={styles.hero__button}>
                            {HERO_CONTENT.ctaLabel}
                        </a>
                    </div>

                    <ProfileImage
                        src={imageSrc}
                        alt={HERO_CONTENT.imageAlt}
                        wrapperClassName={styles.hero__imageWrapperDesktop}
                    />
                </div>
            </div>
        </section>
    );
}
