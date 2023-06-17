import React, { useEffect } from "react";
import { Back, gsap } from "gsap";

const Cursor = () => {
  useEffect(() => {
    const cursor = document.querySelector("#custom-cursor");
    const links = document.querySelectorAll(".cursorBig");
    const cursorText = document.querySelector("#cursor-text");

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
      });
    };

    const onMouseEnterLink = (e) => {
      const link = e.target;
      if (link.classList.contains("view")) {
        gsap.to(cursor, {
          scale: 4,
          // mixBlendMode: "normal",
        });
        gsap.fromTo(cursorText, { opacity: 0 }, { opacity: 1 });
      } else {
        gsap.to(cursor, { scale: 4, ease: Back.easeOut.config(4) });
      }
    };

    const onMouseLeaveLink = (e) => {
      gsap.to(cursor, {
        scale: 1,
        mixBlendMode: "difference",
        background: "white",
        ease: Back.easeOut.config(4),
      });
      gsap.to(cursorText, { opacity: 0 });
    };

    document.addEventListener("mousemove", onMouseMove);

    links.forEach((link) => {
      link.addEventListener("mouseenter", onMouseEnterLink);
      link.addEventListener("mouseleave", onMouseLeaveLink);
    });
  }, []);

  return (
    <div
      id="custom-cursor"
      className="custom-cursor fixed top-0 left-0 w-[20px] h-[20px] rounded-[50%] pointer-events-none z-[9999] mix-blend-difference p-[10px] flex justify-center items-center bg-white"
    >
      <span className="opacity-0 text-[3px]" id="cursor-text">
        Visit
      </span>
    </div>
  );
};

export default Cursor;
