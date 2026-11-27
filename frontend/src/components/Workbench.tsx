import React from 'react';
import { Project } from '../types';

interface WorkbenchProps {
  projects: Project[];
}

const Workbench: React.FC<WorkbenchProps> = ({ projects }) => {
  const prototype = projects.find((p) => p.type === 'prototype');
  const fieldNotes = projects.find((p) => p.type === 'field_notes');

  return (
    <section className="workbench-section">
      <div className="section-header">
        <h2>On the workbench</h2>
        <button className="btn-add-feature" type="button">+ Add feature</button>
      </div>

      <div className="workbench-grid">
        {/* Prototype Card */}
        {prototype && (
          <div className="project-card">
            {prototype.imageUrl && (
              <div className="project-card__image-wrap">
                <img
                  className="project-card__image"
                  src={prototype.imageUrl}
                  alt={prototype.title}
                />
              </div>
            )}
            <div className="project-card__body">
              <h3 className="project-card__title">{prototype.title}</h3>
              <p className="project-card__desc">{prototype.description}</p>
            </div>
          </div>
        )}

        {/* Field Notes Card */}
        {fieldNotes && (
          <div className="field-notes-card">
            <div className="field-notes-card__label">{fieldNotes.fieldNotesLabel || 'FIELD NOTES / 001'}</div>
            <h3 className="field-notes-card__title">
              Small places.<br />Shared stories.
            </h3>
            <p className="field-notes-card__subtitle">{fieldNotes.fieldNotesSubtitle || fieldNotes.description}</p>
            <p className="field-notes-card__file">{fieldNotes.fileInfo || 'PDF · 12 pages · 2.4 MB'}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Workbench;
