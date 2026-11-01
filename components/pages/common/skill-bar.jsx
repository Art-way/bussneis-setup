'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import CountUp from 'react-countup';
import styles from './skill-bar.module.css';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';
const getServerSnapshot = () => false;
const subscribeToBrowserCapabilities = () => () => {};
const getObserverUnavailable = () => !('IntersectionObserver' in window);
const getReducedMotion = () => window.matchMedia(reducedMotionQuery).matches;
const subscribeToReducedMotion = (callback) => {
  const motion = window.matchMedia(reducedMotionQuery);
  motion.addEventListener('change', callback);
  return () => motion.removeEventListener('change', callback);
};

export default function SkillBarItem({ countUp, label = 'Professional skill level' }) {
  const barRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeToReducedMotion, getReducedMotion, getServerSnapshot);
  const observerUnavailable = useSyncExternalStore(subscribeToBrowserCapabilities, getObserverUnavailable, getServerSnapshot);
  const visible = hasEntered || reducedMotion || observerUnavailable;
  const progress = Math.min(100, Math.max(0, Number(countUp) || 0));

  useEffect(() => {
    if (reducedMotion || observerUnavailable || hasEntered || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [reducedMotion, observerUnavailable, hasEntered]);

  return <div ref={barRef} className={styles.bar} role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
    <div className={styles.fill} style={{ transform: `scaleX(${visible ? progress / 100 : 0})` }} />
    <span className="skill__area-item-count text-two" aria-hidden="true"><span className="counter text-two">{reducedMotion ? progress : visible ? <CountUp start={0} end={progress} duration={2} /> : 0}</span>%</span>
  </div>;
}
