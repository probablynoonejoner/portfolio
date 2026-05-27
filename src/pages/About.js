import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';
import SplitText from '../components/SplitText';
import LazyCTAWords from '../components/LazyCTAWords';
import { scrollFadeUp } from '../utils/animation';
import './About.css';

export default function About() {
  return (
    <div className="page">
      <NavBar />

      <motion.main className="content about">

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="about__hero">
          <motion.div initial="hidden" animate="visible">
            <SplitText text="About me." tag="h1" className="about__headline" />
          </motion.div>
        </section>

        {/* ── Bio ───────────────────────────────────────────── */}
        <motion.section className="about__bio" {...scrollFadeUp}>
          <div className="about__bio-text">
            <p>
              I'm a Product and Motion designer with a background in motion graphics and a focus on product and interface animation. I care about the details that make products feel considered: the transitions, feedback states, and interactions that most people notice only when they're missing.
            </p>
            <p>
              Most recently I interned as a UX Animator at WebMD Health Services, where I used Rive to design and prototype motion systems across their consumer app. I worked closely with product and engineering teams to bring interaction design to life, from motion specs and state machines to final implementation support.
            </p>
            <p>
              I'm currently open to product design roles where motion is part of the conversation. If you're building something where the details matter, I'd love to connect.
            </p>
          </div>
          {/* <AboutMeRive /> */}
        </motion.section>

        {/* ── Details ───────────────────────────────────────── */}
        <motion.section className="about__details" {...scrollFadeUp}>
          <div className="about__detail-row">
            <span className="about__detail-label">Currently</span>
            <span className="about__detail-value">Open to full-time, part-time, and contract roles</span>
          </div>
          <div className="about__detail-row">
            <span className="about__detail-label">Based in</span>
            <span className="about__detail-value">Portland, Oregon</span>
          </div>
          <div className="about__detail-row">
            <span className="about__detail-label">Tools</span>
            <span className="about__detail-value">Rive, Figma, After Effects, React</span>
          </div>
          <div className="about__detail-row">
            <span className="about__detail-label">Focus</span>
            <span className="about__detail-value">Product design · UX · Motion</span>
          </div>
        </motion.section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="about__cta">
          <LazyCTAWords href="mailto:jonahfreedmandesigns@gmail.com" className="about__cta-link" text="Let's Work Together" />
        </section>

      </motion.main>

      <NavBar footer />
    </div>
  );
}
