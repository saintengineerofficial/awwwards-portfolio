"use client";
import React, { useEffect, useRef } from "react";
import styles from "./page.module.scss";
import { ArrowRight, CardSim } from "lucide-react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(CustomEase);

const countsArr = [
  { front: 0, back: 0 },
  { front: 2, back: 7 },
  { front: 6, back: 5 },
  { front: 9, back: 8 },
  { front: 9, back: 9 },
];

const Page = () => {
  const countRef = useRef<(HTMLDivElement | null)[]>([]);
  const digitRef = useRef<(HTMLDivElement | null)[][]>([]);
  
  useGSAP(() => {
    digitRef.current = countsArr.map(() => []);
    CustomEase.create("hop", "0.9,0,0.1,1");

    const tl = gsap.timeline({
      delay: 0.3,
      defaults: { ease: "hop" },
    });

    countRef.current?.forEach((count, index) => {
      const digits = digitRef.current[index];

      tl.to(digits, { y: "0%", duration: 1, stagger: 0.075 }, index * 1);

      if (index < countsArr.length) {
        tl.to(digits, { y: "-100%", duration: 1, stagger: 0.075 }, index * 1);
      }
    });
  });

  return (
    <>
      <div className={styles.loader}>
        <div className={styles.overlay}>
          <div className={styles.block}></div>
          <div className={styles.block}></div>
        </div>
        <div className={styles.introLogo}>
          <div className={`${styles.word} ${styles.wordOne}`} id="word-1">
            <h1>
              <span>Kind</span>
            </h1>
          </div>
          <div className={`${styles.word} ${styles.wordTwo}`} id="word-2">
            <h1>
              <span>Root</span>
            </h1>
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
        <div className={styles.counter}>
          {countsArr.map((count, index) => (
            <div
              ref={(el) => {countRef.current[index] = el}}
              className={styles.count}
              key={index}
            >
              <div ref={(el) => {
                if (!digitRef.current[index]) digitRef.current[index] = [];
                digitRef.current[index][0] = el;
                console.log("🚀 ~ digitRef:", digitRef)
              }} className={styles.digit}>
                <h1>{count.front}</h1>
              </div>
              <div ref={(el) => {
                if (!digitRef.current[index]) digitRef.current[index] = [];
                digitRef.current[index][1] = el;
              }} className={styles.digit}>
                <h1>{count.back}</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.heroImage}>
          <img
            className={styles.heroImage}
            src="/material/sumup-z08i3-atRqU-unsplash.jpg"
            alt="hero"
          />
        </div>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <a href="#">KindRoot</a>
          </div>
          <div className={styles.navLinks}>
            <a href="#">Rituals</a>
            <a href="#">Products</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
          <div className={styles.btn}>
            <a href="#">
              <CardSim />
            </a>
          </div>
        </div>
        <div className={styles.header}>
          <div className={styles.heroCopy}>
            <div className={styles.line}>
              <h1>
                <span>Rooted</span> in case,
              </h1>
            </div>
            <div className={styles.line}>
              <h1>
                grown with<span> kindness</span>
              </h1>
            </div>
          </div>
          <div className={styles.line}>
            <p>Skincare that stays true to nature and to you</p>
          </div>
        </div>
        <div className={styles.cta}>
          <div className={styles.ctaLabel}>
            <p>View all products</p>
          </div>
          <div className={styles.ctaIcon}>
            <ArrowRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
