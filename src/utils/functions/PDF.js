import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export async function exportToPDF(elementId, filename = 'resume.pdf') {
  const element = document.getElementById(elementId);

  
  const originalStyles = {
    overflow: element.style.overflow,
    position: element.style.position,
    width: element.style.width,
    height: element.style.height,
  };

  element.style.overflow = 'visible';
  element.style.position = 'absolute';
  element.style.width = `${element.scrollWidth}px`;
  element.style.height = `${element.scrollHeight}px`;

  await new Promise(resolve => setTimeout(resolve, 300));

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width / 10; 
    const imgHeight = (canvas.height * pageWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, pageWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
  } finally {
    Object.assign(element.style, originalStyles);
  }
}

export const handleDownloadPDF = () => {
  exportToPDF('resumeContainer');
};
