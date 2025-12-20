import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatDateNumeric } from '~/utils/dateUtils';
import type { Cv } from 'cv-graphql';

export interface SkillItemDisplay {
  name: string;
  experience: number | string;
  lastUsed: number | string;
}

export interface SkillGroupDisplay {
  category: string;
  items: SkillItemDisplay[];
}

export const generateCvPdf = (
  cvData: Cv,
  userPosition: string | undefined,
  projectDomains: string,
  skillsData: SkillGroupDisplay[] = []
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

  const colorSecondaryRGB = [197, 48, 49] as [number, number, number];
  const colorPrimaryRGB = [53, 53, 53] as [number, number, number];
  const colorBorderRGB = [200, 200, 200] as [number, number, number];

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

  if (skillsData && skillsData.length > 0) {
    doc.addPage();

    doc.setFont(fontName, 'normal');
    doc.setFontSize(sizeSection);
    doc.setTextColor(colorPrimary);
    doc.text('Professional skills', margin, 20);

    const tableBody: (string | number)[][] = [];

    skillsData.forEach(group => {
      group.items.forEach(skill => {
        tableBody.push([group.category, skill.name, skill.experience, skill.lastUsed]);
      });
    });

    autoTable(doc, {
      startY: 30,
      margin: { left: margin, right: margin },
      head: [
        [
          { content: 'SKILLS', colSpan: 2, styles: { halign: 'left' } },
          'EXPERIENCE\nIN YEARS',
          'LAST USED',
        ],
      ],
      body: tableBody,
      theme: 'plain',
      styles: {
        font: fontName,
        fontSize: 10,
        cellPadding: 3,
        valign: 'middle',
        textColor: colorPrimaryRGB,
        lineWidth: 0,
      },
      headStyles: {
        fontStyle: 'bold',
        textColor: colorPrimaryRGB,
        valign: 'bottom',
        lineWidth: 0,
      },
      columnStyles: {
        0: { textColor: colorSecondaryRGB, fontStyle: 'normal', cellWidth: 50 },
        1: { textColor: colorPrimaryRGB, fontStyle: 'normal' },
        2: { halign: 'center', cellWidth: 30 },
        3: { halign: 'center', cellWidth: 30 },
      },
      didParseCell: function (data) {
        if (data.section === 'head') {
          data.cell.styles.lineWidth = { bottom: 0.5 };
          data.cell.styles.lineColor = colorSecondaryRGB;
        }
        if (data.section === 'body') {
          data.cell.styles.lineWidth = { bottom: 0.1 };
          data.cell.styles.lineColor = colorBorderRGB;
        }
      },
      willDrawCell: function (data) {
        if (
          data.section === 'body' &&
          data.row.index === tableBody.length - 1 &&
          data.cell.styles.lineWidth
        ) {
          data.cell.styles.lineWidth = 0;
        }
      },
    });
  }

  const fileName = `${cvData.name.replace(/\s+/g, '_')}.pdf`;
  doc.save(fileName);
};
