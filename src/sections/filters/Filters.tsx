'use client';

import { Search } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export const Filters = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const text = textRef.current;

    if (!button || !text) return;

    // Initial state - hidden text and small button
    gsap.set(text, { opacity: 0, x: 20, display: 'none' });
    gsap.set(button, { width: 'auto' });

    // Animation timeline
    const tl = gsap.timeline({ delay: 2 });

    // Get viewport width to determine if mobile or desktop
    const isMobile = window.innerWidth < 768; // 768px is typically the breakpoint for tablets
    const expandedWidth = isMobile ? '50%' : '20%';

    // Expand button and show text
    tl.to(button, {
      width: expandedWidth,
      borderRadius: '9999px',
      padding: '0.75rem 1.5rem',
      duration: 0.5,
      ease: 'power2.out'
    })
      .set(text, { display: 'inline-block' })
      .to(text, {
        opacity: 1,
        x: 10,
        duration: 0.3,
        ease: 'power2.out'
      }, '-=0.2')
      // Keep it open for 2 seconds
      .to({}, { duration: 2 })
      // Collapse back to icon only
      .to(text, {
        opacity: 0,
        x: 20,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(text, { display: 'none' });
        }
      })
      .to(button, {
        width: 'auto',
        padding: '0.5rem',
        duration: 0.4,
        ease: 'power2.inOut'
      }, '-=0.1');

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className="fixed bottom-4 right-4 z-10 bg-black rounded-full p-2 md:p-3 drop-shadow-lg overflow-hidden flex items-center"
      aria-label="Search"
    >
      <Search className="w-6 h-6 md:w-8 md:h-8 text-white flex-shrink-0" />
      <span
        ref={textRef}
        className="text-white font-medium whitespace-nowrap overflow-hidden ml-2 hidden"
      >
        Search
      </span>
    </button>
  )
}