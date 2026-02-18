import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import './TiltedCard.css';

const springValues = { damping: 25, stiffness: 120, mass: 1.5 };

export default function TiltedCard({
  children,
  cardHeight = '500px',
  cardWidth = '360px',
  scaleOnHover = 1.05,
  rotateAmplitude = 14,
  style = {},
  className = '',
}) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);
  const gyroActive = useRef(false);

  // Gyro — try to enable silently, no blocking prompt
  useEffect(() => {
    const handler = (e) => {
      const beta = e.beta ?? 0;
      const gamma = e.gamma ?? 0;
      // Only activate if we get real values
      if (beta === 0 && gamma === 0) return;
      gyroActive.current = true;
      const nb = beta - 45;
      rotateX.set(-Math.max(-rotateAmplitude, Math.min(rotateAmplitude, nb * 0.8)));
      rotateY.set(Math.max(-rotateAmplitude, Math.min(rotateAmplitude, gamma * 0.8)));
      shineX.set(50 + gamma * 2);
      shineY.set(50 + nb * 2);
    };

    if (typeof DeviceOrientationEvent !== 'undefined') {
      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ — try requesting on first touch anywhere
        const tryPermission = async () => {
          try {
            const state = await DeviceOrientationEvent.requestPermission();
            if (state === 'granted') window.addEventListener('deviceorientation', handler);
          } catch (_) {}
        };
        window.addEventListener('touchstart', tryPermission, { once: true });
      } else {
        window.addEventListener('deviceorientation', handler);
      }
    }
    return () => window.removeEventListener('deviceorientation', handler);
  }, [rotateAmplitude]);

  // Mouse tilt (desktop)
  function handleMouse(e) {
    if (gyroActive.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const ox = e.clientX - rect.left - rect.width / 2;
    const oy = e.clientY - rect.top - rect.height / 2;
    rotateX.set((oy / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((ox / (rect.width / 2)) * rotateAmplitude);
    shineX.set(((e.clientX - rect.left) / rect.width) * 100);
    shineY.set(((e.clientY - rect.top) / rect.height) * 100);
  }
  function handleEnter() { if (!gyroActive.current) scale.set(scaleOnHover); }
  function handleLeave() {
    if (gyroActive.current) return;
    scale.set(1); rotateX.set(0); rotateY.set(0);
    shineX.set(50); shineY.set(50);
  }

  return (
    <figure
      ref={ref}
      className={'tilted-card-figure ' + className}
      onMouseMove={handleMouse}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <motion.div
        className="tilted-card-inner"
        style={{ width: cardWidth, height: cardHeight, rotateX, rotateY, scale, ...style }}
      >
        {children}
        <motion.div className="tilted-card-shine" style={{ background: useMotionBg(shineX, shineY) }} />
      </motion.div>
    </figure>
  );
}

function useMotionBg(x, y) {
  const bg = useMotionValue('');
  useEffect(() => {
    function update() {
      bg.set(`radial-gradient(circle at ${x.get()}% ${y.get()}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.06) 35%, transparent 65%)`);
    }
    const u1 = x.on('change', update);
    const u2 = y.on('change', update);
    update();
    return () => { u1(); u2(); };
  }, [x, y, bg]);
  return bg;
}
