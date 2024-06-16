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
  const mainElement = document.getElementById('main');
  if (!mainElement) return;

  const groupIds = ['group-a', 'group-b', 'group-c', 'group-d', 'group-e', 'group-f'];
  const extraIds = ['round', 'quarter', 'semi', 'final'];
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  let currentX = 0;
  let currentY = 0;

  // Adding groups in one row
  for (const id of groupIds) {
    const groupElement = document.getElementById(id);
    if (groupElement) {
      copyInputValuesToSpans(groupElement);

      const canvas = await html2canvas(groupElement, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
        width: groupElement.scrollWidth, // Устанавливаем ширину canvas
        height: groupElement.scrollHeight, // Устанавливаем высоту canvas
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth / groupIds.length; // Разделяем ширину на количество групп
      const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
      currentY = imgHeight

      pdf.addImage(imgData, 'JPEG', currentX, 0, imgWidth, imgHeight);
      currentX += imgWidth;

      restoreInputs(groupElement);
    }
  }

  // Adding extra elements under the groups
  let pageAdded = false;
  currentX = 0;
  for (const id of extraIds) {
    const extraElement = document.getElementById(id);
    if (extraElement) {
      copyInputValuesToSpans(extraElement);

      const canvas = await html2canvas(extraElement, {
        useCORS: true,
        backgroundColor: null,
        scale: 2,
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth / extraIds.length; // Set the width of the extra elements
      const imgHeight = (imgProps.height * imgWidth) * 0.8 / imgProps.width;

      if (currentY + imgHeight > pdfHeight && pageAdded === false) {
        pdf.addPage();
        currentY = 0;
        pageAdded = true;
      }

      pdf.addImage(imgData, 'JPEG', currentX, currentY + 1, imgWidth, imgHeight);
      currentX += imgWidth;

      restoreInputs(extraElement);
    }
  }

  pdf.save('Euro2024-mobile.pdf');
};

const PdfBtnMobile: React.FC = () => {
  return (
    <div>
      <button onClick={downloadPDF} className="hover:bg-blue-700">
        PDF (Mobile)
      </button>
    </div>
  );
};

export default PdfBtnMobile;
