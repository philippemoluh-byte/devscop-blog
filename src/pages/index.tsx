
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Header from "@site/src/components/Header/index";
import Footer from "@site/src/components/Footer";
import Hero from "@site/src/components/Hero/index";

import styles from './index.module.css';
import {JSX} from "react";
import Contact from "@site/src/components/contact/index";
import Skills from "@site/src/components/Skills";
import Index from "@site/src/components/ProjectFeature";


export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <Header />
      <Hero />
      <Skills />
      <Index />
      <Contact />
      <Footer />
    </Layout>
  );
}
