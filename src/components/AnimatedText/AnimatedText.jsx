import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const WORD_VARIANTS = {
  hidden: { y: '115%' },
  visible: (i) => ({
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.045,
    },
  }),
};

const BLOCK_VARIANTS = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: i * 0.08,
    },
  }),
};

// Word-by-word reveal — ideal for headings
export function AnimatedHeading({ children, as: Tag = 'h2', className, baseDelay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });

  const words = String(children).split(' ');
  // Use motion[Tag] so the Tag itself has no injected styles
  const MotionTag = motion[Tag] ?? motion.h2;

  return (
    <MotionTag ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom', marginRight: i < words.length - 1 ? '0.28em' : 0 }}>
          <motion.span
            custom={i + baseDelay}
            variants={WORD_VARIANTS}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

// Fade-up — animates the Tag itself so no extra wrapper breaks flex/grid layouts
export function AnimatedBlock({ children, as: Tag = 'div', className, index = 0, style }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' });

  const MotionTag = motion[Tag] ?? motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      style={style}
      custom={index}
      variants={BLOCK_VARIANTS}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {children}
    </MotionTag>
  );
}
