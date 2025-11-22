import { jsPDF } from 'jspdf';
import { formatDateNumeric } from '~/utils/dateUtils';
import type { Cv } from 'cv-graphql';

export const generateCvPdf = (
  cvData: Cv,
  userPosition: string | undefined,
  projectDomains: string
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;

  const colorPrimary = 'rgb(53, 53, 53)';
  const colorSecondary = 'rgb(197, 48, 49)';

  const fontName = 'helvetica';

  const sizeBase = 12;
  const sizeName = 27;
  const sizeRole = 13;
  const sizeSection = 24;
  const lineHeightFactor = 1.2;

  const leftColWidth = 55;
  const gap = 8;
  const lineX = margin + leftColWidth + gap / 2;

  const leftTextX = margin;
  const rightTextX = lineX + gap / 2;
  const rightColWidth = pageWidth - rightTextX - margin;

  const drawText = (
    text: string,
    x: number,
    y: number,
    size: number,
    isBold: boolean,
    color: string = colorPrimary,
    maxWidth?: number
  ) => {
    doc.setFont(fontName, isBold ? 'bold' : 'normal');
    doc.setFontSize(size);
    doc.setTextColor(color);

    const lineHeightMm = size * 0.3527 * lineHeightFactor;

    if (maxWidth) {
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return lines.length * lineHeightMm;
    } else {
      doc.text(text, x, y);
      return lineHeightMm;
    }
  };

  let cursorY = 20;

  let userName = '';
  if (cvData.user?.profile) {
    userName = `${cvData.user.profile.first_name || ''} ${cvData.user.profile.last_name || ''}`;
  }

  cursorY += drawText(userName, margin, cursorY, sizeName, false);

  if (userPosition) {
    cursorY += 2;
    cursorY += drawText(userPosition.toUpperCase(), margin, cursorY, sizeRole, false);
  }

  cursorY += 10;
  const contentStartY = cursorY;

  let pLeftY = cursorY;

  pLeftY += drawText('Education', leftTextX, pLeftY, sizeBase, true);
  pLeftY += 2;
  const eduText = cvData.education || 'No education';
  pLeftY += drawText(eduText, leftTextX, pLeftY, sizeBase, false, colorPrimary, leftColWidth) + 6;

  pLeftY += drawText('Language proficiency', leftTextX, pLeftY, sizeBase, true);
  pLeftY += 8;

  if (projectDomains) {
    pLeftY += drawText('Domains', leftTextX, pLeftY, sizeBase, true);
    pLeftY += 2;
    pLeftY +=
      drawText(projectDomains, leftTextX, pLeftY, sizeBase, false, colorPrimary, leftColWidth) + 6;
  }

  let pRightY = cursorY;

  if (cvData.name) {
    pRightY += drawText(cvData.name, rightTextX, pRightY, sizeBase, true) + 2;
  }

  if (cvData.description) {
    pRightY +=
      drawText(
        cvData.description,
        rightTextX,
        pRightY,
        sizeBase,
        false,
        colorPrimary,
        rightColWidth
      ) + 6;
  }

  const maxPage1Y = Math.max(pLeftY, pRightY);
  doc.setDrawColor(colorSecondary);
  doc.setLineWidth(0.3);
  doc.line(lineX, contentStartY - 2, lineX, maxPage1Y);

  if (cvData.projects && cvData.projects.length > 0) {
    const projLeftWidth = leftColWidth;
    const projRightWidth = rightColWidth;

    cvData.projects.forEach((project, index) => {
      doc.addPage();

      let projY = 20;

      if (index === 0) {
        doc.setFont(fontName, 'normal');
        doc.setFontSize(sizeSection);
        doc.setTextColor(colorPrimary);
        doc.text('Projects', margin, projY);
        projY += 15;
      } else {
        projY = 20;
      }

      const projectContentStart = projY;

      let projLeftY = projY;

      const projName = (project.name || 'Project Name').toUpperCase();
      projLeftY +=
        drawText(projName, leftTextX, projLeftY, sizeBase, true, colorSecondary, projLeftWidth) + 3;

      if (project.description) {
        projLeftY +=
          drawText(
            project.description,
            leftTextX,
            projLeftY,
            sizeBase,
            false,
            colorPrimary,
            projLeftWidth
          ) + 5;
      }

      let projRightY = projY;

      projRightY += drawText('Project roles', rightTextX, projRightY, sizeBase, true) + 2;
      const role = userPosition || 'Network Engineer';
      projRightY +=
        drawText(role, rightTextX, projRightY, sizeBase, false, colorPrimary, projRightWidth) + 5;

      projRightY += drawText('Period', rightTextX, projRightY, sizeBase, true) + 2;
      const startDate = formatDateNumeric(project.start_date);
      const endDate = project.end_date ? formatDateNumeric(project.end_date) : 'Till now';
      projRightY +=
        drawText(`${startDate} – ${endDate}`, rightTextX, projRightY, sizeBase, false) + 5;

      if (project.responsibilities && project.responsibilities.length > 0) {
        projRightY += drawText('Responsibilities', rightTextX, projRightY, sizeBase, true) + 2;

        project.responsibilities.forEach(resp => {
          const bulletText = `• ${resp}`;
          doc.setTextColor(colorSecondary);
          projRightY += drawText(
            bulletText,
            rightTextX,
            projRightY,
            sizeBase,
            false,
            colorPrimary,
            projRightWidth
          );
        });
        projRightY += 5;
      }

      if (project.environment && project.environment.length > 0) {
        projRightY += drawText('Environment', rightTextX, projRightY, sizeBase, true) + 2;
        const envText = project.environment.join(', ') + '.';
        projRightY +=
          drawText(envText, rightTextX, projRightY, sizeBase, false, colorPrimary, projRightWidth) +
          5;
      }

      const maxProjY = Math.max(projLeftY, projRightY);
      doc.setDrawColor(colorSecondary);
      doc.setLineWidth(0.3);
      doc.line(lineX, projectContentStart - 2, lineX, maxProjY);
    });
  }

  const fileName = `${cvData.name.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};
