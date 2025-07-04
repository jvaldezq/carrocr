'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const HeaderAnimations = () => {
  useGSAP(() => {
    // Create a matchMedia for responsive animations
    const mm = gsap.matchMedia();
    
    // Desktop animations
    mm.add("(min-width: 768px)", () => {
      gsap.fromTo('#logo', 
        { 
          scale: 0,
          opacity: 0
        },
        { 
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)",
        }
      );
    });
    
    // Mobile animations (less aggressive)
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo('#logo', 
        { 
          scale: 0.8,
          opacity: 0
        },
        { 
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.7)",
        }
      );
    });
    
    // Cleanup function
    return () => {
      mm.revert();
    };
  }, []);

  return null;
};