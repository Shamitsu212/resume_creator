import './resume.css'; 

import HResume from '../../UI/HResume/HResume.jsx'; 
import TextResume from '../../UI/TextResume/TextResume.jsx'; 

import { useDragAndDrop } from '../../../utils/hooks/useDragAndDrop.js'; 

const SECTION_TITLES = {
  about: 'О себе',
  skills: 'Навыки',
  certificates: 'Сертификаты',
  education: 'Образование',
  experience: 'Опыт работы'
};

const Resume = ({ sections, onReorder }) => {
  const { handleDragStart, handleDragOver, handleDragLeave, handleDrop, draggedIndex } = useDragAndDrop(sections, onReorder);

  const renderAboutSection = (data) => (
    <div>
      <TextResume text={data.initials} /> 
      <TextResume text={data.description} /> 
    </div>
  );

  const renderSkillsSection = (skill) => (
    <TextResume key={skill} text={skill} />
  );

  const renderCertificatesSection = (certificate) => (
    <TextResume key={certificate} text={certificate} />
  );

  const renderEducationSection = (eduItem, idx) => (
    <div key={`edu-${idx}`}>
      <TextResume text={eduItem.institution} />
      <TextResume text={eduItem.specialty} />
      <TextResume text={eduItem.period} />
    </div>
  );

  const renderExperienceSection = (expItem, idx) => (
    <div key={`exp-${idx}`}>
      <TextResume text={`${expItem.position} at ${expItem.company}`} />
      <TextResume text={expItem.period} />
      <TextResume text={expItem.description} />
    </div>
  );

  const renderSectionContent = (section) => {
    if (!section.data || section.data.length === 0) return null;
    return (
      <div>
        <HResume text={SECTION_TITLES[section.type]} />
        {section.type === 'about' ? (
          renderAboutSection(section.data[0])
        ) : (
          section.data.map((item, idx) => {
            switch (section.type) {
              case 'skills':
                return renderSkillsSection(item.skill);
              case 'certificates':
                return renderCertificatesSection(item.certificate);
              case 'education':
                return renderEducationSection(item, idx);
              case 'experience':
                return renderExperienceSection(item, idx);
              default:
                return null;
            }
          })
        )}
      </div>
    );
  };

  return (
    <div className='resume' id='resumeContainer'>
      <h1 className='resume__h1'>Резюме</h1>
      {sections.map((section, index) => (
        section.data && section.data.length > 0 && (
          <div
            key={`${section.type}-${index}`} 
            draggable 
            onDragStart={() => handleDragStart(index)} 
            onDragOver={(e) => handleDragOver(e, index)} 
            onDragLeave={handleDragLeave} 
            onDrop={(e) => handleDrop(e, index)} 
            className={`resume__section ${draggedIndex === index ? 'dragging' : ''}`} 
            style={{
              opacity: draggedIndex === index ? 0.5 : 1, 
              cursor: 'grab' 
            }}
          >
            {renderSectionContent(section)}
          </div>
        )
      ))}
    </div>
  );
};

export default Resume;
