/**
 * Case study content, keyed by project slug.
 * Projects without an entry here fall back to the gallery placeholder in Showcase.js.
 *
 * Section shape:
 *   { id, label, paragraphs, riveEmbed? }
 *   - label:      displayed as the uppercase tracking label
 *   - paragraphs: array of strings, each renders as a <p>
 *   - riveEmbed:  true → inserts the Rive embed placeholder before paragraphs
 */

const caseStudies = {
  'spark-ai': {
    meta: {
      role: 'UX Animator',
      contribution: 'Motion Design, Interaction Design, Rive Prototyping',
      tools: 'Rive, Figma',
      context: 'Internship / WebMD Health Services',
    },
    summary:
      'Spark is an AI assistant built into the WebMD Health Services app, used by employees navigating their health and benefits.',
    sections: [
      {
        id: 'overview',
        label: 'Overview',
        paragraphs: [
          'Spark is an AI assistant built into the WebMD Health Services app, used by employees navigating their health and benefits. I was brought in to take a static UI redesign and build the motion system that would make Spark feel intelligent, approachable, and worth using.',
        ],
      },
      {
        id: 'problem',
        label: 'The Problem',
        paragraphs: [
          'Spark lived in the top nav as a button. Present, but easy to ignore. The goal was getting users to notice Spark when it could help them, and once they were in, making the AI feel like something more than a basic chatbot. The challenge was using motion to communicate state, build trust, and make the experience feel human without being distracting.',
        ],
      },
      {
        id: 'process',
        label: 'Process',
        paragraphs: [
          'I started by mapping out the key moments that needed motion to work. Three states emerged: an alert to draw attention, an active state to confirm engagement, and a processing state to show Spark was working. For each I built three iterations and brought them to the UX team for feedback, then narrowed to one direction per state before moving into building.',
        ],
      },
      {
        id: 'decisions',
        label: 'The Decisions',
        paragraphs: [
          'Early explorations went in a flashier direction. Shape morphs, more dramatic transitions, trying to visually signal intelligence. We pulled back and landed on gradient sweeps with a subtle initial rotation. Something that feels alive without demanding attention. The alert animation plays exactly three times. Enough to be noticed by someone open to it, not enough to frustrate someone who isn\'t.',
        ],
      },
      {
        id: 'build',
        label: 'The Build',
        riveEmbed: true,
        paragraphs: [
          'The final prototype was built entirely in Rive. I took the static designs from the team and built a fully interactive experience with a chat interface and suggested questions that show Spark thinking and responding in real time. The underlying state machine logic handles transitions, input triggers, and the alert sequence. Getting that logic to behave predictably across every interaction path was honestly the hardest part of the project.',
        ],
      },
      {
        id: 'outcome',
        label: 'Outcome',
        paragraphs: [
          'The prototype went through team critique and MVP review and was received well. My internship wrapped before the redesign moved into development, but the motion system was complete and ready when I left.',
        ],
      },
    ],
  },
};

export default caseStudies;
