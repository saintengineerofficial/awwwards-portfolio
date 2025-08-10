gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9,0,0.1,1");

document.addEventListener("DOMContentLoaded", () => {
  const tl = gsap.timeline({
    delay: 0.3,
    defaults: { ease: "hop" },
  });

  const counts = document.querySelectorAll(".count");

  counts.forEach((count, index) => {
    const digits = count.querySelectorAll(".digit h1");
    console.log("🚀 ~ digits:", digits);
    tl.to(digits, { y: "0%", duration: 1, stagger: 0.075 }, index * 1);

    if (index < counts.length) {
      // index * 1 + 1 比上一个动画多一个延迟1s
      tl.to(digits, { y: "-100%", duration: 1, stagger: 0.075 }, index * 1 + 1);
    }
  });

  tl.to(".spinner", { opacity: 0, duration: 0.3 });

  tl.to(".word h1", { y: 0, duration: 1 }, "<");

  tl.to(".divider", {
    scaleY: "100%",
    duration: 1,
    onComplete: () => {
      gsap.to(".divider", { opacity: 0, duration: 0.4, delay: 0.3 });
    },
  });

  tl.to("#word-1 h1", { y: "100%", duration: 1, delay: 0.3 });
  tl.to("#word-2 h1", { y: "-100%", duration: 1, delay: 0.3 }, "<");

  tl.to(".block", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 1,
    stagger: 0.1,
    delay: 0.75, // 动画会在调用 tl.to() 后等待 0.75 秒才开始播放。
    onStart: () => {
      gsap.to(".heroImage", {
        scale: 1,
        duration: 2,
        ease: "hop", // 动画的缓动曲线
      });
    },
  });

  tl.to(
    [".nav", ".line h1", ".line p"],
    { y: 0, duration: 1.5, stagger: 0.2 },
    "<"
  );

  tl.to(
    [".cta", ".ctaIcon"],
    { scale: 1, duration: 1.5, stagger: 0.75, delay: 0.75 },
    "<"
  );

  tl.to(".ctaLabel p", { y: 0, duration: 1.5, delay: 0.5 }, "<");
});
