import React, { useLayoutEffect, useEffect, useRef, useState } from "react";
import { Back, gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "../utils/Split3.min.js";
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef();
  const squareRef = useRef();
  const [animateRadiusSquare, setAnimateRadiusSquare] = useState(true);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const mainTextSplit = new SplitText("#wannaWork", {
        type: "lines",
      });
      const mainTextSplitParent = new SplitText("#wannaWork", {
        type: "lines",
        linesClass: "lineParent",
      });

      gsap.fromTo(
        "#mainContainer",
        {
          scale: 0.5,
        },
        {
          scale: 1,
          scrollTrigger: {
            trigger: "#mainContainer",
            start: "top 90%",
            end: "top 50%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        mainTextSplit.lines,
        { y: 100, opacity: 0 },
        {
          scrollTrigger: {
            trigger: "#wannaWork",
            start: "top 30%",
            markers: true,
          },
          opacity: 1,
          duration: 1,
          y: 0,
          ease: "Power2.easeOut",
          stagger: 0.1,
          onComplete: animateLines,
        }
      );
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const animateLines = () => {
    const lineTop = document.querySelector(".lineTop");
    const lineRight = document.querySelector(".lineRight");
    const contactBtn = document.querySelector("#contactBtn");

    const tl = gsap.timeline();
    tl.to(lineTop, {
      width: "calc(100% - 20px)",
      duration: 0.5,
      ease: "Power2.easeOut",
    });
    tl.to(lineRight, {
      height: "100%",
      duration: 0.5,
      ease: "Power2.easeOut",
    });
    tl.fromTo(
      contactBtn,
      {
        scale: 0,
      },
      {
        scale: 1,
        duration: 1,
        ease: Back.easeOut.config(1.7),
      }
    );
  };
  const handleEmailClick = () => {
    const emailAddress = "arismendyuribemateo@gmail.com";
    const subject = "Let's work together!";
    const body = "Hi Mateo, I wanna hire you.";

    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };
  return (
    <section
      id="contact"
      className="w-full h-[100vh] bg-white"
      ref={containerRef}
      data-scroll-section
    >
      <div
        className="min-w-[100vw] h-[100vh] bg-black container flex flex-col lg:flex-row overflow-hidden"
        id="mainContainer"
        data-scroll-container
      >
        {/* Left */}
        <div className="w-full lg:w-[50%] h-full flex flex-col justify-center  items-center lg:items-start relative">
          {/* Text */}
          <p
            className="text-[20vw] lg:text-[10vw] leading-[90%] text-satoshi italic text-white relative text-center lg:text-left "
            id="wannaWork"
          >
            Up
            <br />
            for
            <br />
            making
            <br />
            cool
            <br />
            stuff?
          </p>

          <button
            className="lg:absolute top-1/2 transform -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-main -right-[12%]  text-white text-[3vw] leading-[60%] cursorBig cursor-none z-[99] scale-0"
            id="contactBtn"
          >
            Email
            <br />
            me
          </button>

          {/* Animated lines */}
          <span
            className="absolute top-[20px] left-0 h-[2px] bg-white lineTop opacity-0 lg:opacity-100"
            // style={{ width: "calc(100% - 20px)" }}
          ></span>
          <span className="absolute right-[20px] top-[20px] w-[2px] bg-white lineRight opacity-0 lg:opacity-100"></span>

          {/* Button */}
        </div>

        {/* Right */}
        <div className="w-full lg:w-[50%] h-full"></div>
      </div>
    </section>
  );
};

export default Contact;
