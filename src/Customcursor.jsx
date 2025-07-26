import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      gsap.to(cursorRef.current, {
        duration: 0.3,
        x,
        y,
        ease: "power3.out",
      });

      // Create a smoke puff
      const smoke = document.createElement("div");
      smoke.className = "smoke-trail";
      smoke.style.left = `${x}px`;
      smoke.style.top = `${y}px`;
      document.body.appendChild(smoke);

      // Animate and remove smoke puff
      gsap.to(smoke, {
        duration: 1,
        opacity: 0,
        y: -20,
        scale: 0.5,
        ease: "power2.out",
        onComplete: () => smoke.remove(),
      });
    };

    document.addEventListener("mousemove", moveCursor);
    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef}>
      <img src="/capsule.cur" alt="cursor" className="w-full h-full object-contain" />
    </div>
  );
};

export default CustomCursor;
