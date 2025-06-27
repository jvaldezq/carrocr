'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const CardAnimations = () => {
  useGSAP(() => {
    const boxes = gsap.utils.toArray('.card');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    boxes.forEach((box: any) => {
      // Entrance animation
      gsap.fromTo(
        box,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: box,
            start: 'top 90%',
            end: 'bottom 10%', // defines end of viewport visibility
            toggleActions: 'play none none none',
            onLeave: () => {
              // Animate out when leaving the screen (scrolling down)
              gsap.to(box, { opacity: 0, y: 50, duration: 0.5 });
            },
            onLeaveBack: () => {
              // Animate out when scrolling back up
              gsap.to(box, { opacity: 0, y: -50, duration: 0.5 });
            },
            onEnterBack: () => {
              // Animate back in when re-entering from bottom
              gsap.to(box, { opacity: 1, y: 0, duration: 0.5 });
            },
            onEnter: () => {
              // Animate back in when entering from top
              gsap.to(box, { opacity: 1, y: 0, duration: 0.5 });
            },
            markers: false,
          },
        }
      );
    });
  });

  return null;
};
