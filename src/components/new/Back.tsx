'use client';

import { ArrowLeft, Home } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import gsap from "gsap";

// Custom hook to track navigation history
const useNavigationHistory = () => {
  const pathname = usePathname();
  const previousPathRef = useRef<string | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      // On first render, check if we have a stored previous path
      if (typeof window !== 'undefined') {
        const stored = sessionStorage.getItem('nav-previous-path');
        if (stored && stored !== pathname) {
          previousPathRef.current = stored;
        }
      }
      isFirstRender.current = false;
    } else {
      // On subsequent renders, update previous path
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('nav-previous-path', previousPathRef.current || '/');
      }
      previousPathRef.current = pathname;
    }
  }, [pathname]);

  return {
    previousPath: previousPathRef.current,
    hasPreviousPath: previousPathRef.current !== null
  };
};

export const Back = () => {
  const pathname = usePathname();
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isRoot = pathname === '/';

  const { previousPath, hasPreviousPath } = useNavigationHistory();

  // Determine if we should show home or back icon
  // Show home icon if: no previous path OR previous path was root
  // Show arrow if: has previous path AND previous path was not root
  const showHome = !hasPreviousPath || previousPath === '/';

  // Animation on mount and path change
  useEffect(() => {
    if (!buttonRef.current) return;

    const button = buttonRef.current;

    // Ensure button is completely hidden initially
    gsap.set(button, {
      opacity: 0,
      x: -100,
      display: 'none',
      scale: 1
    });

    // Only animate if not on root
    if (!isRoot) {
      // Set display: flex without animation
      gsap.set(button, { display: 'flex' });

      // Animate in from left to right with delay
      gsap.to(button, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        delay: 1.5,
        ease: 'expo.out',
        onStart: () => {
          // Only show the button when the animation starts
          gsap.set(button, { display: 'flex' });
        }
      });
    }

    // Cleanup
    return () => {
      gsap.killTweensOf(button);
    };
  }, [isRoot]);

  const handleClick = () => {
    if (pathname === '/') return; // Already on home

    if (hasPreviousPath && previousPath !== '/') {
      // If we have a previous path and it wasn't root, go back
      router.back();
    } else {
      // Otherwise, navigate to home
      router.push('/');
    }
  };

  if (isRoot) return null;

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className="fixed top-6 left-6 bg-black/90 hover:bg-black text-white rounded-full p-3 backdrop-blur-sm transition-all duration-200 flex items-center justify-center shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/50 opacity-0"
      aria-label={showHome ? 'Go to home' : 'Go back'}
    >
      {showHome ? (
        <Home className="w-5 h-5" aria-hidden="true" />
      ) : (
        <ArrowLeft className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  )
}