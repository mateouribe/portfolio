import React, { useEffect, useRef, useState } from "react";
import { styles } from "../styles";
import { technologies } from "../constants";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import SplitText from "../utils/Split3.min.js";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      //Split words title
      const splitTitle = new SplitText("#aboutTitle", {
        type: "words",
        wordsClass: "animatedText",
      });
      const splitTitleParent = new SplitText("#aboutTitle", {
        type: "lines",
        linesClass: "lineParent",
      });
      splitTitle.words.forEach((word) => {
        word.style.marginRight = "10px";
      });

      //Split lines text
      const aboutText = new SplitText("#aboutText", {
        type: "lines",
      });
      const aboutTextParent = new SplitText("#aboutText", {
        type: "lines",
        linesClass: "lineParent",
      });

      //Separete tech stack
      const techStack = gsap.utils.toArray(".tStack");

      //Animations

      //Title
      const tl = gsap.timeline();

      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "top 75%",
          scrub: 1,
        },
        backgroundColor: "#F1F1F0",
        ease: "Power2.easeOut",
      });

      gsap.fromTo(
        splitTitle.words,
        {
          opacity: 0,
          y: 30,
        },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          duration: 1,
          opacity: 1,
          y: 0,
          ease: "Power2.easeOut",
          stagger: 0.2,
        }
      );

      //Text
      gsap.fromTo(
        aboutText.lines,
        {
          opacity: 0,
          y: 20,
        },
        {
          scrollTrigger: {
            trigger: "#aboutText",
            start: "top 90%",
          },
          duration: 1,
          y: 0,
          opacity: 1,
          ease: "Power2.easeOut",
          stagger: 0.2,
        }
      );

      //Tech Stack
      gsap.fromTo(
        techStack,
        {
          opacity: 0,
          y: 20,
        },
        {
          duration: 1,
          y: 0,
          opacity: 1,
          ease: "Power2.easeOut",
          stagger: 0.2,
          scrollTrigger: { trigger: ".technologiesContainer" },
        }
      );

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      className={`h-auto w-full lg:min-h-[100vh] flex place-content-center ${styles.padding} bg-black`}
      ref={sectionRef}
      data-scroll-section
    >
      <div className="w-[100%] md:w-[80%] lg:w-[60%] flex flex-col justify-between items-center gap-[80px] lg:gap-0">
        <h2
          className={`${styles.headText} text-black text-center mix-blend-normal`}
          id="aboutTitle"
          data-scroll
          data-scroll-speed="1"
          data-scroll-delay="0.1"
        >
          About me
        </h2>
        <p
          className={`${styles.paragraphText} relative -top-[8%]`}
          id="aboutText"
          data-scroll-delay="0.1"
          data-scroll
          data-scroll-speed="0.8"
        >
          I'm a passionate Colombian computer programming student based in
          Canada 📍, dedicated to crafting exceptional digital experiences. I
          specialize in web development, with a focus on creating responsive and
          engaging websites using cutting-edge technologies.
          <br />
          With a keen eye for detail and dedication to delivering top-quality
          work, I'm always eager to learn and incorporate new techniques into my
          projects.{" "}
          <a
            className="cursorBig text-main"
            href="../assets/cv/Front end Developer.pdf"
            download
          >
            Dowload my cv.
          </a>
        </p>
        <div
          className="flex flex-col md:flex-row w-full justify-between items-center gap-[20px] technologiesContainer"
          data-scroll
          data-scroll-speed="0.5"
        >
          <p className={`${styles.paragraphText} min-w-min`}>Tech Stack |</p>
          <div className="grid grid-cols-6 md:grid-cols-6 lg:grid-cols-9 gap-[20px] place-content-center">
            {technologies.map((tech, index) => (
              <img
                src={tech.icon}
                alt={tech.name}
                className="min-w-[50px] max-w-[50px] min-h-[50px] max-h-[50px] tStack"
                data-scroll
                data-scroll-delay={`${index * 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
