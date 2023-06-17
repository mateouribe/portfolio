import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { gsap, Back, Bounce, Power3 } from "gsap";
import { FaceCanvas } from "./canvas";
import Loader from "./Loader";
import { styles } from "../styles";
import { useLoadingContext } from "../context/LoadingProvider";
import { navLinks } from "../constants";
import menu from "../assets/images/menu.svg";
import SplitText from "../utils/Split3.min.js";
import heroBg from "../assets/images/heroBg.png";

const Hero = () => {
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const { isLoadingFinished } = useLoadingContext();

  const sectionRef = useRef();
  const rotatingImg = useRef();
  const menuRef = useRef();
  const splitH1 = useRef();
  const splitParentH1 = useRef();
  const splitBottomText = useRef();
  const splitParentBottomText = useRef();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust the threshold as needed (0.5 means 50% visibility)
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        } else {
          setIsSectionVisible(false);
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  //*ANIMATIONS*/
  //Rotating Image
  useLayoutEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    tl.to(rotatingImg.current, {
      duration: 5,
      rotation: 360,
      ease: "none",
      yoyo: true,
    });
  }, []);

  useEffect(() => {
    if (!isLoadingFinished) return;
    handleHomeAnimation();
  }, [isLoadingFinished]);

  const handleHomeAnimation = () => {
    let ctx = gsap.context(() => {
      const splitH1 = new SplitText("#heroTitle", {
        type: "words",
        linesClass: "animatedText",
      });
      splitH1.words.forEach((word) => {
        word.style.marginRight = "10px";
      });

      const splitParentH1 = new SplitText("#heroTitle", {
        type: "lines",
        linesClass: "lineParent",
      });

      const splitBottomText = new SplitText("#bottomText", {
        type: "words",
        wordsClass: "animatedText",
      });
      splitBottomText.words.forEach((word) => {
        word.style.marginRight = "2px";
      });

      const splitParentBottomText = new SplitText("#bottomText", {
        type: "lines",
        linesClass: "lineParent",
      });

      const durationText = 1;

      const tl = gsap.timeline();
      //BlurSphere

      // Face Canvas
      tl.fromTo(
        ".faceCanvas",
        {
          width: "100%",
          height: "100vh",
          opacity: 0,
          scale: 0,
        },
        {
          width: "100%",
          height: "100vh",
          opacity: 1,
          scale: 1,
          duration: 0.5,
        },
        "-=0.1"
      );

      //Title
      tl.fromTo(
        [splitH1.words, "#heroTitle"],
        {
          opacity: 0,
          y: 100,
        },
        {
          duration: durationText,
          opacity: 1,
          y: 0,
          ease: "Power2.easeOut",
          stagger: 0.2,
        }
      );

      //Menu
      tl.fromTo(
        rotatingImg.current,
        {
          width: "120px",
          height: "120px",
          opacity: 0,
          scale: 0,
        },
        {
          width: "120px",
          height: "120px",
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "Power2.easeOut",
        }
      );

      // Bottom
      tl.fromTo(
        ".bottomRef",
        {
          opacity: 0,
          y: 50,
        },
        {
          duration: 0.5,
          opacity: 1,
          y: 0,
          ease: "Power2.easeOut",
        },
        `-=${durationText}/2`
      );

      //Bottom text
      tl.fromTo(
        [splitBottomText.words, "#bottomText"],
        {
          opacity: 0,
          y: 30,
        },
        {
          duration: durationText,
          opacity: 1,
          y: 0,
          ease: "Power2.easeOut",
          stagger: 0.1,
        },
        "-=0.3"
      );

      // Bottom underline
      tl.fromTo(
        ".bottomUnderline",
        {
          width: 0,
        },
        {
          width: "20px",
          duration: 0.5,
          ease: "Power2.EaseOut",
        },
        "-=0.3"
      );
    }, sectionRef);

    return () => ctx.revert();
  };
  const handleMenuHover = () => {
    let ctx = gsap.context(() => {
      const listItems = gsap.utils.toArray(".listItemRef");
      const tl = gsap.timeline();
      const ease = "power3.easeOut";

      tl.to(menuRef.current, {
        duration: 0.5,
        top: 0,
        right: 0,
        ease: ease,
      });
      tl.to(".listWrapper", {
        duration: 0,
        height: "auto",
        overflow: "visible",
        ease: ease,
      });
      tl.fromTo(
        listItems,
        { opacity: 0, y: -10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.2,
          ease: Back.easeOut.config(2),
          stagger: 0.1,
        }
      );
    }, menuRef);

    setIsMenuHovered(true);
  };
  const handleMenuExit = () => {
    let ctx = gsap.context(() => {
      const listItems = gsap.utils.toArray(".listItemRef");
      const tl = gsap.timeline();
      const ease = "power3.easeOut";

      tl.fromTo(
        listItems.reverse(),
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: Back.easeIn.config(2),
          stagger: 0.1,
        }
      );
      tl.to(".listWrapper", {
        duration: 0,
        height: 0,
        overflow: "hidden",
        ease: ease,
      });

      tl.to(menuRef.current, {
        duration: 0.5,
        top: "-4%",
        right: "-4%",
        ease: ease,
      });
    }, menuRef);

    setIsMenuHovered(false);
  };

  /*
  *Z index:
  Menu always has to be on top of everything: 3000
  Title: 2000
  Bottom: 2000
  Blur: -1 (behnid everything)
   */

  return (
    <section
      className={`relative w-full h-screen mx-auto bg-black z-[10] overflow-hidden`}
      id="home"
      ref={sectionRef}
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      data-scroll-section
    >
      {/* Menu */}
      <div
        className="absolute top-[-4%] right-[-4%] z-[3000] flex-col place-content-center hidden lg:flex"
        ref={menuRef}
        onMouseEnter={() => handleMenuHover()}
        onMouseLeave={() => handleMenuExit()}
      >
        <img
          src={menu}
          alt="Circle rotating with 'menu' word"
          className="w-0 h-0 self-center"
          ref={rotatingImg}
        />
        <div className="w-full h-0 overflow-hidden listWrapper">
          <ul className="text-main text-satoshi text-center">
            {navLinks.map((link, index) => (
              <motion.li
                className="font-regular listItemRef cursorBig"
                key={index}
                whileHover={{ scale: 1.1, color: "#ff730d" }}
              >
                <a href={link.id} data-scroll-to>
                  {link.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Title */}
      <div className="absolute inset-0 max-w-7xl mx-auto flex justify-center items-start z-[2000]">
        <h1
          className={`${styles.headText} font-black text-center text-white opacity-0 z-[100] relative`}
          id="heroTitle"
          style={{ mixBlendMode: "difference" }}
        >
          Mateo Arismendy
        </h1>
      </div>

      {/* Bottom */}
      <div className="absolute bottom-[3%] w-full flex flex-col left-1/2 transform -translate-x-1/2 z-[2000]">
        <div className="relative max-w-fit self-center">
          <p
            className="font-satoshi text-white font-medium text-center mb-[10px] relative z-[100] opacity-0"
            id="bottomText"
          >
            From ideas to pixeles
          </p>
          <div className="absolute bottom-[30%] left-[90%] flex justify-center items-center w-0 h-[10px] bg-main z-10 bottomUnderline" />
        </div>
        <a
          href="#about"
          className="flex place-content-center max-w-fit self-center bottomRef opacity-0 cursorBig"
          data-scroll-to
        >
          <div className="w-[30px] h-[50px] rounded-full border-[4px] border-darkGray flex justify-center items-start p-[5px]">
            <motion.div
              className="w-[10px] h-[10px] rounded-full bg-darkGray mb-1"
              animate={{ y: [0, 20, 0] }}
              transition={{
                duration: 3,
                repeat: "Infinity",
                repeatType: "loop",
              }}
            ></motion.div>
          </div>
        </a>
      </div>

      {/* <div className="w-full h-[100vh] relative opacity-0 faceCanvas">
        <FaceCanvas
          isMenuHovered={isMenuHovered}
          isSectionVisible={isSectionVisible}
        />
      </div> */}

      {/* <Loader /> */}
    </section>
  );
};

export default Hero;
