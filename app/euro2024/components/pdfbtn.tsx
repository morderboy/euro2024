import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const copyInputValuesToSpans = (container: HTMLElement) => {
  const inputs = container.querySelectorAll<HTMLInputElement>('input');
  inputs.forEach(input => {
    const span = document.createElement('span');

    span.style.position = 'absolute';
    span.style.left = `${input.offsetLeft}px`;
    span.style.top = `${input.offsetTop}px`;
    span.style.width = `${input.offsetWidth}px`;
    span.style.height = `${input.offsetHeight}px`;

    const computedStyles = window.getComputedStyle(input);
    span.style.fontSize = computedStyles.fontSize || '';
    span.style.fontFamily = computedStyles.fontFamily || '';
    span.style.fontWeight = computedStyles.fontWeight || '';
    span.style.color = computedStyles.color || '';
    span.style.textAlign = computedStyles.textAlign || '';
    span.style.backgroundColor = '#f0f0f0'; // серый фон
    span.style.borderRadius = '5px'; // круглые углы

    span.textContent = input.value;
    span.setAttribute('data-input-copy', 'true');

    input.style.visibility = 'hidden';
    input.parentNode?.insertBefore(span, input.nextSibling);
  });
};

const restoreInputs = (container: HTMLElement) => {
  const spans = container.querySelectorAll<HTMLSpanElement>('span[data-input-copy]');
  spans.forEach(span => {
    const input = span.previousSibling as HTMLInputElement;
    if (input) {
      input.style.visibility = 'visible';
    }
    span.remove();
  });
};

const downloadPDF = async () => {
  const input = document.getElementById('main');
  if (input) {
    copyInputValuesToSpans(input);

    const canvas = await html2canvas(input, {
      useCORS: true,
      backgroundColor: null,
      scale: 2,
    });

    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'letter',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const imgWidth = pdfWidth;
    const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

    const scale = pdfHeight / imgHeight;

    if (scale < 1) {
      const newImgWidth = imgWidth;
      const newImgHeight = imgHeight * scale;
      pdf.addImage(imgData, 'JPEG', 0, 0, newImgWidth, newImgHeight);
    } else {
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    }

    pdf.save('Euro2024.pdf');

    restoreInputs(input);
  }
};

const PdfBtn: React.FC = () => {
  return (
    <div>
      <button onClick={downloadPDF} className="hover:bg-blue-700">
        PDF
      </button>
    </div>
  );
};

export default PdfBtn;
