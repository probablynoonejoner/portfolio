import { Link } from 'react-router-dom';
import './ProjectCard.css';

/**
 * ProjectCard
 *
 * Props:
 *   name      {string}  — project title
 *   tags      {string}  — dot-separated category tags, e.g. "Motion Systems · Rive"
 *   showMeta  {bool}    — show name + tags below the card (Work page style)
 *   link      {string}  — router path to navigate to on click
 *   className {string}  — extra class for sizing variants
 */
export default function ProjectCard({ name, description, tags, showMeta = false, link, className = '', media, wrapperStyle }) {
  const Tag = link ? Link : 'div';
  const tagProps = link ? { to: link } : {};

  return (
    <Tag {...tagProps} className={`project-card${className ? ` ${className}` : ''}${link ? ' project-card--linked' : ''}`}>
      <div className="project-card__media-wrapper" style={wrapperStyle}>
        {media ? (
          <div style={{ position: 'absolute', inset: 0 }}>{media}</div>
        ) : (
          <div className="project-card__thumbnail" />
        )}
        <div className="project-card__overlay">
          <span className="project-card__overlay-name">{name}</span>
          <div className="project-card__overlay-bottom">
            {tags && <span className="project-card__overlay-role">{tags}</span>}
          </div>
        </div>
      </div>

      {showMeta && (
        <div className="project-card__meta">
          <span className="project-card__meta-name">{name}</span>
          {tags && <span className="project-card__meta-detail">{tags}</span>}
        </div>
      )}
    </Tag>
  );
}
