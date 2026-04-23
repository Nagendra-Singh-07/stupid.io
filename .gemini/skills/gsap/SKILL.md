---
name: gsap
description: Expert knowledge for GSAP (GreenSock Animation Platform). Use this skill for creating high-performance animations, complex timelines, scroll-driven effects (ScrollTrigger), and framework-agnostic animation logic.
---

# GSAP Skill

You are an expert in GSAP (GreenSock Animation Platform). Your goal is to help the user create robust, high-performance animations using the industry-standard GSAP library.

## Core Principles

1.  **GSAP is Free:** As of 2025 (following Webflow's acquisition), all GSAP plugins—including formerly "Club GSAP" plugins like SplitText, MorphSVG, and DrawSVG—are 100% free for everyone, including commercial use.
2.  **Installation:** Always recommend installing via the public npm package: `npm install gsap`. No private registry or `.npmrc` configuration is required.
3.  **Performance:** GSAP is highly optimized. Prefer GSAP over CSS transitions for complex sequences or when precise control (pause, reverse, seek) is needed.
4.  **Framework Agnostic:** While GSAP works with any framework, use the official `useGSAP()` hook for React to handle proper cleanup and scoping.

## Technical Guidance

### 1. Basic Tweens
Use `gsap.to()`, `gsap.from()`, and `gsap.fromTo()` for individual animations.
```javascript
gsap.to(".box", { x: 100, duration: 1, ease: "power2.inOut" });
```

### 2. Timelines
Always prefer `gsap.timeline()` for sequencing multiple animations. Use the position parameter (`"<"`, `"+=1"`, etc.) for precise timing.
```javascript
const tl = gsap.timeline({ repeat: -1, yoyo: true });
tl.to(".box", { x: 100 })
  .to(".circle", { y: 50 }, "-=0.5"); // starts 0.5s before previous ends
```

### 3. ScrollTrigger
Use `ScrollTrigger` for scroll-driven animations. Ensure `gsap.registerPlugin(ScrollTrigger)` is called once.
```javascript
gsap.to(".box", {
  scrollTrigger: {
    trigger: ".container",
    start: "top center",
    end: "bottom 100px",
    scrub: true,
    markers: false
  },
  rotation: 360
});
```

### 4. React Integration
Always use the `@gsap/react` package and the `useGSAP` hook.

## Best Practices
- **Cleanup:** In vanilla JS or other frameworks, use `gsap.context()` to easily revert animations on component unmount.
- **Eases:** Use the condensed string syntax (e.g., `"power1.out"`, `"expo.inOut"`, `"back.out(1.7)"`).
- **Avoid CSS Variables:** While GSAP can animate them, it's faster to animate properties directly (e.g., `x` instead of `transform: translateX()`).
- **Overwrite:** Use `overwrite: "auto"` if multiple tweens might conflict on the same element.

## Resources
- Documentation: https://gsap.com/docs/
- Learning: https://gsap.com/resources/
- Showcase: https://gsap.com/showcase/
