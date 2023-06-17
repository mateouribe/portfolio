import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useHelper } from "@react-three/drei";
import { PointLightHelper, SpotLightHelper } from "three";

//TODO: Animate the light when hovering menu
//TODO: Animate face rotation when mouse is moving

const Face = ({ device, isMenuHovered, isSectionVisible }) => {
  const face = useGLTF("./mask/brain.glb");
  const [intensity, setIntensity] = useState(0.2);
  const [brainIntensity, setBrainIntensity] = useState(3);

  //*HELPERS */
  //Refrs
  const rightLight = useRef();
  const frontLight = useRef();
  const handsLight = useRef();
  const keyLight = useRef();
  const lockLight = useRef();
  const faceRef = useRef();
  const brainLight = useRef();

  //Helpers
  // useHelper(rightLight, SpotLightHelper, "#940DFF");
  // useHelper(frontLight, SpotLightHelper, "#ffffff");
  // useHelper(handsLight, PointLightHelper, 0.5, "#ffffff");
  // useHelper(keyLight, PointLightHelper, 0.5, "#ffffff");
  // useHelper(lockLight, PointLightHelper, 0.5, "#ffffff");

  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [targetX, setTargetX] = useState(0);
  const [targetY, setTargetY] = useState(0);

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  const onDocumentMouseMove = (event) => {
    setMouseX(event.clientX - windowHalfX);
    setMouseY(event.clientY - windowHalfY);
  };

  useEffect(() => {
    document.addEventListener("mousemove", onDocumentMouseMove);
    return () => {
      document.removeEventListener("mousemove", onDocumentMouseMove);
    };
  }, []);

  useFrame(() => {
    if (isSectionVisible) {
      setTargetX(mouseX * 0.001);
      setTargetY(mouseY * 0.001);

      if (faceRef.current) {
        faceRef.current.rotation.y +=
          0.5 * (targetX - faceRef.current.rotation.y);
        faceRef.current.rotation.x +=
          0.5 * (targetY - faceRef.current.rotation.x);
      }
      if (lockLight.current) {
        const targetIntensity = isMenuHovered ? -1.2 : 0.2;
        const increment = 0.5;
        lockLight.current.intensity +=
          increment * (targetIntensity - lockLight.current.intensity);
      }
    }
  });

  return (
    <mesh>
      <ambientLight intensity={0.1} />
      <primitive
        object={face.scene}
        scale={device === "mobile" ? 3 : device === "tablet" ? 4 : 5}
        position={device === "mobile" ? [0.534, 4, 5.674] : [0.534, 5, 5.674]}
        rotation={[0, 0, 0]}
        ref={faceRef}
      />
      {/* Front light */}
      <spotLight
        color={"#FFFFFF"}
        intensity={0.5}
        position={[0.6, 1.655, 20.0]}
        ref={frontLight}
      />
      {/* Right light */}
      <spotLight
        color={"#FF730D"}
        intensity={0.5}
        ref={rightLight}
        position={[13.379, 1.439, 6.048]}
      />
      {/* Hands light */}
      <pointLight
        intensity={4}
        position={[0.517, 1, 7]}
        color={"#FF730D"}
        ref={handsLight}
      />
      {/* Lock light */}
      <pointLight
        intensity={0.1}
        position={[0.524, 8.19, 10.528]}
        color={"#FFFFFF"}
        ref={lockLight}
      />
    </mesh>
  );
};
const FaceCanvas = ({ isMenuHovered, isSectionVisible }) => {
  const [device, setDevice] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQueryMobile = window.matchMedia("(max-width: 500px)");
    const mediaQueryTablet = window.matchMedia(
      "(min-width: 500px) and (max-width: 1023px)"
    );

    // Set the initial value of the `device` state variable
    if (mediaQueryMobile.matches) {
      setDevice("mobile");
    } else if (mediaQueryTablet.matches) {
      setDevice("tablet");
    } else {
      setDevice("desktop");
    }

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = () => {
      if (mediaQueryMobile.matches) {
        setDevice("mobile");
      } else if (mediaQueryTablet.matches) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    // Add the callback function as a listener for changes to the media queries
    mediaQueryMobile.addEventListener("change", handleMediaQueryChange);
    mediaQueryTablet.addEventListener("change", handleMediaQueryChange);

    // Remove the listeners when the component is unmounted
    return () => {
      mediaQueryMobile.removeEventListener("change", handleMediaQueryChange);
      mediaQueryTablet.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      shadows
      camera={{
        position: [0.55, 3.908, 50],
        fov: 25,
        rotation: [0, 0, 0],
      }}
      gl={{ preserveDrwaingBuffer: true }}
    >
      <Suspense>
        <Face
          device={device}
          isMenuHovered={isMenuHovered}
          isSectionVisible={isSectionVisible}
        />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};
export default FaceCanvas;
