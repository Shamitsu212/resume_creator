import { useState } from 'react'; 

import './form.css'; 

import List from '../../UI/List/List.jsx'; 
import Button from '../../UI/Button/Button.jsx'; 
import SmallButton from '../../UI/SmallButton/SmallButton.jsx';
import TextArea from '../../UI/TextArea/TextArea.jsx'; 
import InputWithLabel from '../../UI/InputWithLabel/InputWithLabel.jsx'; 

import FontSelector from '../../UI/FontSelector/FontSelector.jsx'; 

import deleteIcon from '../../../assets/icons/x.svg'; 
import downloadIcon from '../../../assets/icons/download.svg'; 
import exampleIcon from '../../../assets/icons/example.svg'; 


const FORM_INITIAL_STATE = {
  about: { initials: '', description: '' },
  skills: { skill: '' },
  certificates: { certificate: '' },
  education: { institution: '', specialty: '', period: '' },
  experience: { position: '', company: '', period: '', description: '' }
};


const SECTION_TYPES = {
  SECTION: 'section', 
  ABOUT: 'about',
  SKILLS: 'skills',
  CERTIFICATES: 'certificates',
  EDUCATION: 'education',
  EXPERIENCE: 'experience'
};

function Form({ onAdd, onDelete, sections, onDownload, onFontChange, currentFont }) {

  const [selectedOption, setSelectedOption] = useState(SECTION_TYPES.SECTION);
  const [formData, setFormData] = useState(FORM_INITIAL_STATE);

  
  const handleSelectChange = (e) => {
    const newOption = e.target.value; 
    setSelectedOption(newOption); 

    setFormData(prev => ({
      ...prev,
      [newOption]: FORM_INITIAL_STATE[newOption] || {}
    }));
  };

  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [selectedOption]: { 
        ...prev[selectedOption],
        [field]: value 
      }
    }));
  };

 
  const handleAddClick = () => {
    if (selectedOption === SECTION_TYPES.SECTION) return; 
    if (selectedOption === SECTION_TYPES.ABOUT && 
        sections.find(s => s.type === SECTION_TYPES.ABOUT)?.data.length >= 1) {
      alert('В секции "О себе" можно добавить только один элемент.');
      return;
    }

    if (Object.values(formData[selectedOption]).some(value => !value)) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    onAdd(selectedOption, formData[selectedOption]);

    setFormData(prev => ({
      ...prev,
      [selectedOption]: FORM_INITIAL_STATE[selectedOption]
    }));
  };

  const handleDeleteClick = () => {
    if (selectedOption !== SECTION_TYPES.SECTION) {
      onDelete(selectedOption);
    }
  };

  const handleFillExample = () => {
    if (selectedOption === SECTION_TYPES.SECTION) return;

    setFormData(prev => ({
      ...prev,
      [selectedOption]: {
        about: { initials: 'Иванов И.И.', description: 'Опытный специалист в области разработки сайтов и веб-приложений' },
        skills: { skill: 'React' },
        certificates: { certificate: 'Сертификат Stepik "Основы React, React Router и Redux Toolkit"' },
        education: { institution: 'МГУ', specialty: 'Компьютерные науки', period: '2018-2022' },
        experience: { position: 'Фронтенд разработчик', company: 'IT Компания', period: '2019-2023', description: 'Верста сайтов и разработка логики компонентов' }
      }[selectedOption]
    }));
  };

  const renderAboutFields = () => (
    <>
      <InputWithLabel 
        label='Введите ваши инициалы'
        value={formData.about.initials}
        onChange={(e) => handleInputChange('initials', e.target.value)}
      />
      <TextArea 
        value={formData.about.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
      />
    </>
  );

  const renderSkillsField = () => (
    <InputWithLabel 
      label='Введите ваш навык'
      value={formData.skills.skill}
      onChange={(e) => handleInputChange('skill', e.target.value)}
    />
  );

  const renderCertificatesField = () => (
    <InputWithLabel 
      label='Введите сертификат'
      value={formData.certificates.certificate}
      onChange={(e) => handleInputChange('certificate', e.target.value)}
    />
  );

  const renderEducationFields = () => (
    <>
      <InputWithLabel 
        label='Учебное заведение'
        value={formData.education.institution}
        onChange={(e) => handleInputChange('institution', e.target.value)}
      />
      <InputWithLabel 
        label='Специальность'
        value={formData.education.specialty}
        onChange={(e) => handleInputChange('specialty', e.target.value)}
      />
      <InputWithLabel 
        label='Период обучения'
        value={formData.education.period}
        onChange={(e) => handleInputChange('period', e.target.value)}
      />
    </>
  );

  const renderExperienceFields = () => (
    <>
      <InputWithLabel 
        label='Должность'
        value={formData.experience.position}
        onChange={(e) => handleInputChange('position', e.target.value)}
      />
      <InputWithLabel 
        label='Компания'
        value={formData.experience.company}
        onChange={(e) => handleInputChange('company', e.target.value)}
      />
      <InputWithLabel 
        label='Период'
        value={formData.experience.period}
        onChange={(e) => handleInputChange('period', e.target.value)}
      />
      <InputWithLabel 
        label='Описание'
        value={formData.experience.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
      />
    </>
  );

  const renderFormFields = () => {
    switch(selectedOption) {
      case SECTION_TYPES.ABOUT: return renderAboutFields();
      case SECTION_TYPES.SKILLS: return renderSkillsField();
      case SECTION_TYPES.CERTIFICATES: return renderCertificatesField();
      case SECTION_TYPES.EDUCATION: return renderEducationFields();
      case SECTION_TYPES.EXPERIENCE: return renderExperienceFields();
      default: return <span>Выберите секцию</span>;
    }
  };

  return (
    <div className='form'>
      <div className='form__small'>
        <List 
          value={selectedOption} 
          onChange={handleSelectChange} 
          options={Object.values(SECTION_TYPES)} 
        />
        <Button 
          text='Добавить' 
          color='#5CB85C' 
          onClick={handleAddClick}
          disabled={selectedOption === SECTION_TYPES.SECTION} 
        />
      </div>
      <div className='form__midle'>
        {renderFormFields()}
      </div>
      <div className='form__small'>
        <FontSelector 
          selectedFont={currentFont} 
          onChange={onFontChange} 
        />
        <SmallButton 
          icon={deleteIcon} 
          color='#D9534F' 
          onClick={handleDeleteClick}
          disabled={selectedOption === SECTION_TYPES.SECTION}
          tooltip="Удалить последнее"
        />
        <SmallButton 
          icon={exampleIcon} 
          color='#FFA500' 
          onClick={handleFillExample}
          disabled={selectedOption === SECTION_TYPES.SECTION}
          tooltip="Заполнить примером"
        />
        <SmallButton 
          icon={downloadIcon} 
          color='#4A90E2' 
          onClick={() => onDownload('resumeContainer')}
          tooltip="Скачать PDF"
        />
      </div>
    </div>
  );
}

export default Form;
