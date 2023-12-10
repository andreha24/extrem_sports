import React from "react";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Services from "./Services";
import Intro from "../../components/Intro";
import skydiving from "../../assets/skydiving.jpeg";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Intro
        paragraph={t("aboutUsPage.intro_paragraph")}
        text={t("aboutUsPage.intro_sentence")}
        backgroundImage={skydiving}
      />
      <Services />
      <Footer />
    </>
  );
};

export default AboutUs;
