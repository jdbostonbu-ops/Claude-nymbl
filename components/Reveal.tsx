"use client";

import { useEffect, useRef } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "article" | "figure" | "header";
}

// Adds the `.in` class when the element scrolls into view, driving the CSS
// fade-up. Written as a closure component; no `any`, no `var`.
const Reveal = ({ children, className, as = "div" }: RevealProps) => {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (node === null) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      node.classList.add("in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
    };
  }, []);

  const Tag = as;
  const classes = className === undefined ? "reveal" : `reveal ${className}`;

  return (
    <Tag ref={ref as React.Ref<never>} className={classes}>
      {children}
    </Tag>
  );
};

export default Reveal;
