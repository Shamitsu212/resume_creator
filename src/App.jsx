import { useState } from 'react';

import './App.css';

import Form from './components/form.jsx';
import Resume from './components/resume.jsx';

import { exportToPDF, handleDownloadPDF } from './utils/functions/PDF';
import { addItemToSections, deleteLastItemFromSections } from './utils/functions/resumeUtils';

function App() {
  const [resumeSections, setResumeSections] = useState([
    { type: 'about', data: [] },
    { type: 'skills', data: [] },
    { type: 'certificates', data: [] },
    { type: 'education', data: [] },
    { type: 'experience', data: [] }
  ]);

  const [fontFamily, setFontFamily] = useState('Arial, sans-serif');

  const addResumeItem = (type, item) => {
    setResumeSections(prev => addItemToSections(prev, type, item));
  };

  const deleteLastResumeItem = (type) => {
    setResumeSections(prev => deleteLastItemFromSections(prev, type));
  };

  const reorderSections = (newSectionsOrder) => {
    setResumeSections(newSectionsOrder);
  };

  return (
    <div className='App'>
      <div className='App__half'>
        <Form 
          onAdd={addResumeItem} 
          onDelete={deleteLastResumeItem} 
          sections={resumeSections} 
          onDownload={handleDownloadPDF}
          onFontChange={setFontFamily}
          currentFont={fontFamily}
        />
      </div>
      <div className='App__half' style={{ fontFamily }}>
        <Resume sections={resumeSections} onReorder={reorderSections} />
      </div>
    </div>
  );
}

export default App;