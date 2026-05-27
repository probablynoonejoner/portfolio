import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import NavScrollLink from '../components/NavScrollLink';
import NavBar from '../components/NavBar';
import LazyCTAWords from '../components/LazyCTAWords';
import { fadeUp, staggerContainer } from '../utils/animation';
import projects from '../data/projects';
import caseStudies from '../data/caseStudies';
import SparkAI from '../components/case-studies/SparkAI';
import ContentJourneys from '../components/case-studies/ContentJourneys';
import Challenges from '../components/case-studies/Challenges';
import EmojiReactions from '../components/case-studies/EmojiReactions';
import UIAnimations from '../components/case-studies/UIAnimations';
import WritingRevolution from '../components/case-studies/WritingRevolution';
import VUTalent from '../components/case-studies/VUTalent';
import VitalElements from '../components/case-studies/VitalElements';
import EventCalendar from '../components/case-studies/EventCalendar';
import './Showcase.css';

// Fallback metadata for projects without a case study entry yet
const defaultMeta = {
  role: 'UX Animator',
  contribution: 'Motion Design, Prototyping',
  tools: 'Rive, Figma',
  context: 'Internship / WebMD Health Services',
  summary: 'Summary of the project and my role.',
};

export default function Showcase() {
  const { projectId } = useParams();
  const currentIndex = projects.findIndex((p) => p.slug === projectId);
  const project = projects[currentIndex] ?? { name: 'Project', slug: projectId };
  const prev = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const caseStudy = caseStudies[projectId] ?? null;
  const meta = caseStudy?.meta ?? defaultMeta;
  const summary = caseStudy?.summary ?? defaultMeta.summary;

  // Custom editorial layouts — rendered inside the shared NavBar wrapper below
  const customLayout =
    projectId === 'spark-ai' ? (
      <SparkAI project={project} prev={prev} next={next} />
    ) : projectId === 'content-journeys' ? (
      <ContentJourneys project={project} prev={prev} next={next} />
    ) : projectId === 'challenges' ? (
      <Challenges project={project} prev={prev} next={next} />
    ) : projectId === 'emoji-reactions' ? (
      <EmojiReactions project={project} prev={prev} next={next} />
    ) : projectId === 'ui-animations' ? (
      <UIAnimations project={project} prev={prev} next={next} />
    ) : projectId === 'writing-revolution' ? (
      <WritingRevolution project={project} prev={prev} next={next} />
    ) : projectId === 'vu-talent' ? (
      <VUTalent project={project} prev={prev} next={next} />
    ) : projectId === 'vital-elements' ? (
      <VitalElements project={project} prev={prev} next={next} />
    ) : projectId === 'event-calendar' ? (
      <EventCalendar project={project} prev={prev} next={next} />
    ) : null;

  return (
    <div className="page">
      <NavBar />

      {customLayout}

      {!customLayout && (
      <motion.main
        key={projectId}
        className="content showcase"
        variants={staggerContainer()}
        initial="hidden"
        animate="visible"
      >
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="showcase__hero">
          <motion.h1 className="showcase__headline" variants={fadeUp}>
            {project.name}
          </motion.h1>
          <motion.p className="showcase__subhead" variants={fadeUp}>
            {summary}
          </motion.p>
        </section>

        {/* ── Metadata strip ────────────────────────────────── */}
        <motion.div className="showcase__meta" variants={fadeUp}>
          <div className="showcase__meta-item">
            <span className="showcase__meta-label">Role</span>
            <span className="showcase__meta-value">{meta.role}</span>
          </div>
          <div className="showcase__meta-item">
            <span className="showcase__meta-label">Contribution</span>
            <span className="showcase__meta-value">{meta.contribution}</span>
          </div>
          <div className="showcase__meta-item">
            <span className="showcase__meta-label">Tools</span>
            <span className="showcase__meta-value">{meta.tools}</span>
          </div>
          <div className="showcase__meta-item">
            <span className="showcase__meta-label">Context</span>
            <span className="showcase__meta-value">{meta.context}</span>
          </div>
        </motion.div>

        {/* ── Case study sections (if available) ────────────── */}
        {caseStudy ? (
          <motion.div className="showcase__case-study" variants={fadeUp}>
            {caseStudy.sections.map((section) => (
              <section key={section.id} className="showcase__section">
                <span className="showcase__section-label">{section.label}</span>

                {section.riveEmbed && (
                  <div className="showcase__rive-placeholder">
                    {/* RIVE EMBED — replace this div with the <RiveComponent /> */}
                  </div>
                )}

                <div className="showcase__section-body">
                  {section.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>
            ))}
          </motion.div>
        ) : (
          /* ── Fallback media gallery for projects without case study ── */
          <motion.section className="showcase__gallery" variants={fadeUp}>
            <div className="showcase__media-placeholder" />
            <div className="showcase__media-placeholder" />
            <div className="showcase__media-placeholder" />
          </motion.section>
        )}

        {/* ── Prev / Next navigation ────────────────────────── */}
        <motion.nav className="showcase__project-nav" variants={fadeUp}>
          <div className="showcase__project-nav-prev">
            {prev && <NavScrollLink to={`/work/${prev.slug}`} name={prev.name} direction="left" />}
          </div>
          <div className="showcase__project-nav-next">
            {next && <NavScrollLink to={`/work/${next.slug}`} name={next.name} direction="right" />}
          </div>
        </motion.nav>

        {/* ── CTA ───────────────────────────────────────────── */}
        <motion.section className="showcase__cta" variants={fadeUp}>
          <LazyCTAWords href="mailto:jonahfreedmandesigns@gmail.com" className="showcase__cta-link" text="Let's Work Together" />
        </motion.section>
      </motion.main>
      )}

      <NavBar footer />
    </div>
  );
}
