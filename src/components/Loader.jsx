import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { useLoadingContext } from "../context/LoadingProvider";
import { useProgress } from "@react-three/drei";
import { gsap } from "gsap";
import { Back } from "gsap";

function Loader() {
  const { progress } = useProgress();
  const [isScrollingAllowed, setIsScrollingAllowed] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [animateRadiusSquare, setAnimateRadiusSquare] = useState(true);
  const { isLoadingFinished, setIsLoadingFinished } = useLoadingContext();
  const words = ["Welcome", "to", "my", "portfolio"];
  const [index, setIndex] = useState(0);

  const loaderWrapper = useRef();
  const squareRef = useRef();
  const eLetter = useRef();
  const spaceLetter = useRef();
  const path = useRef();
  const textWrapper = useRef();

  useEffect(() => {
    const wordWillChange = () => {
      setIndex((index + 1) % words.length);
    };

    const intervalo = setInterval(wordWillChange, 500);
    return () => {
      clearInterval(intervalo);
    };
  }, [index]);
  useEffect(() => {
    if (isScrollingAllowed) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  }, [isScrollingAllowed]);
  //**Animations
  //Square
  useLayoutEffect(() => {
    let intervalId;
    if (animateRadiusSquare) {
      intervalId = setInterval(() => {
        const topLeft = Math.floor(Math.random() * 100); // Generate a random number between 0 and 100
        const topRight = Math.floor(Math.random() * 100); // Generate a random number between 0 and 100
        const bottomRight = Math.floor(Math.random() * 100); // Generate a random number between 0 and 100
        const bottomLeft = Math.floor(Math.random() * 100); // Generate a random number between 0 and 100

        gsap.to(squareRef.current, {
          borderTopLeftRadius: `${topLeft}%`,
          borderTopRightRadius: `${topRight}%`,
          borderBottomRightRadius: `${bottomLeft}%`,
          borderBottomLeftRadius: `${bottomRight}%`,
          duration: 0.5,
          ease: "Bounce.easeOut",
        });
      }, 500);
    } else {
      return;
    }
    return () => clearInterval(intervalId);
  }, [animateRadiusSquare]);

  useEffect(() => {
    if (progress === 100) {
      setAnimationStarted(true);
      handleFinishLoading();
    }
  }, [progress]);

  const handleFinishLoading = () => {
    setAnimateRadiusSquare(false);
    gsap.killTweensOf(squareRef.current);
    const tl = gsap.timeline();
    const easeText = "Back.easeIn";

    //Inmidiate animations
    gsap.to(eLetter.current, {
      duration: 0,
      backgroundColor: "#F1F1F0",
    });
    gsap.to(spaceLetter.current, {
      duration: 0,
      backgroundColor: "#F1F1F0",
    });

    //timeLine animations

    tl.to(squareRef.current, {
      duration: 0.7,
      borderRadius: "5%",
      ease: "Bounce.easeOut",
    });

    //Letters
    tl.to(eLetter.current, {
      duration: 1,
      width: "55%",
      ease: easeText,
    });
    tl.to(
      spaceLetter.current,
      {
        duration: 1,
        right: "-55%",
        ease: easeText,
      },
      "-=1"
    );

    //Path
    tl.to(path.current, {
      duration: 0.7,
      clipPath: "circle(120% at 50% 50%)",
      delay: 0.2,
      ease: "Power2.easeOut",
    });
    tl.to(
      textWrapper.current,
      {
        duration: 0,
        opacity: 0,
      },
      "-=0.3"
    );

    tl.to(
      squareRef.current,
      {
        duration: 0.7,
        scale: 15,
        overflow: "hidden",
        ease: Back.easeIn.config(0.5),
      },
      "-=0.3"
    );

    //Hide
    tl.to(loaderWrapper.current, {
      duration: 0,
      display: "none",
      onComplete: () => {
        setIsLoadingFinished(true);
        setIsScrollingAllowed(true);
      },
    });
  };

  return (
    <div
      className="fixed w-full h-screen bg-white z-[3000] top-0 flex flex-col place-content-center items-center"
      ref={loaderWrapper}
      data-scroll-container
    >
      <div
        className={`w-[70%] md:w-1/2 lg:w-[25%] h-1/2 border-[5px] border-black absolute inset-0 mx-auto my-auto flex place-content-center overflow-hidden ${
          animationStarted && "z-[100]"
        }`}
        ref={squareRef}
      >
        <div
          className="w-full bg-black h-full path"
          ref={path}
          style={{
            clipPath: `circle(0% at 78% 89%)`,
          }}
        />
      </div>

      {progress === 100 ? (
        <div
          className={`text-[150px] md:text-[250px] lg:text-[400px] text-center flex relative text-cabinet ${
            animationStarted ? "text-black" : "text-white"
          }`}
          ref={textWrapper}
        >
          <span ref={eLetter} className="absolute mix-blend-normal text-right ">
            E
          </span>
          <div className="ml-[86px] md:ml-[143px] lg:ml-[229px]">
            <span>n</span>
            <span>j</span>
            <span className="z-[2000]">o</span>
            <span>y</span>
            <span
              className="absolute mix-blend-normal right-[-100%] w-full text-left "
              ref={spaceLetter}
            >
              .
            </span>
          </div>
        </div>
      ) : (
        <div
          className={`text-[150px] md:text-[250px] lg:text-[400px] text-center flex relative ${
            animationStarted ? "text-black" : "text-white"
          }`}
          style={{
            mixBlendMode: animationStarted ? "normal" : "difference",
          }}
        >
          <h2>{words[index]}</h2>
        </div>
      )}
      {/* <div
        className={`text-[150px] md:text-[250px] lg:text-[400px] text-center flex relative text-cabinet ${
          animationStarted ? "text-black" : "text-white"
        }`}
        ref={textWrapper}
      >
        <span ref={eLetter} className="absolute mix-blend-normal text-right ">
          E
        </span>
        <div className="ml-[86px] md:ml-[143px] lg:ml-[229px]">
          <span>n</span>
          <span>j</span>
          <span className="z-[2000]">o</span>
          <span>y</span>
          <span
            className="absolute mix-blend-normal right-[-100%] w-full text-left "
            ref={spaceLetter}
          >
            .
          </span>
        </div>
      </div>
      <button className="absolute bottom-0" onClick={handleFinishLoading}>
        Start
      </button> */}
    </div>
  );
}

export default Loader;
