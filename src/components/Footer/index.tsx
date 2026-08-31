import React from 'react';
import Link from '@docusaurus/Link';
import styles from './footer.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';

const Footer: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const impressumUrl = useBaseUrl('/docs/impressum');

    return (
        <footer className={styles.siteFooter}>
            <div className="contentContainer">
                <button
                    className={styles.toTopBtn}
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                />

                <div className={styles.footerInfo}>
                    <p className={styles.footerCopy}>© Philippe 2025</p>

                    <Link to="/docs/impressum" className={styles.footerLegal}>
                        Legal notice
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
