import React from "react";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import { Feature } from "./components/feature";
import { Hero } from "./components/hero";
import { Notice } from "./components/notice";
import { Testimonial } from "./components/testimonial";

export function Home(): React.JSX.Element {
  return (
    <React.Fragment>
      <Hero />
      <Feature />
      <About />
      <Notice />
      <Testimonial />
      <Contact />
    </React.Fragment>
  );
}
