import { PDFDocument, StandardFonts } from "pdf-lib";

export const generateOfferLetterPdf = async (details) => {
    const {
        candidateName,
        jobTitle,
        companyName,
        salary,
        location,
        recruiterName,
        startDate,
    } = details;

    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    const page = pdfDoc.addPage([600, 800]);
    const { height } = page.getSize();

    const fontSize = 12;

    page.drawText(`Offer Letter`, { x: 50, y: height - 50, size: 18, font: timesRomanFont });
    page.drawText(`Date: ${startDate}`, { x: 50, y: height - 80, size: fontSize, font: timesRomanFont });

    page.drawText(`Dear ${candidateName},`, { x: 50, y: height - 120, size: fontSize, font: timesRomanFont });
    page.drawText(
        `We are excited to offer you the position of ${jobTitle} at ${companyName}.`,
        { x: 50, y: height - 140, size: fontSize, font: timesRomanFont }
    );
    page.drawText(`Details of your offer are as follows:`, { x: 50, y: height - 160, size: fontSize, font: timesRomanFont });

    page.drawText(`- Job Title: ${jobTitle}`, { x: 50, y: height - 180, size: fontSize, font: timesRomanFont });
    page.drawText(`- Company Name: ${companyName}`, { x: 50, y: height - 200, size: fontSize, font: timesRomanFont });
    page.drawText(`- Salary: ${salary} LPA`, { x: 50, y: height - 220, size: fontSize, font: timesRomanFont });
    page.drawText(`- Location: ${location}`, { x: 50, y: height - 240, size: fontSize, font: timesRomanFont });

    page.drawText(`Additional Terms and Conditions:`, { x: 50, y: height - 280, size: fontSize, font: timesRomanFont });
    page.drawText(
        `- You will be required to undergo a probationary period of 6 months,`,
        { x: 50, y: height - 300, size: fontSize, font: timesRomanFont }
    );
    page.drawText(
        `  during which your performance will be evaluated.`,
        { x: 50, y: height - 320, size: fontSize, font: timesRomanFont }
    );
    page.drawText(
        `- You will be eligible for company benefits, including health insurance,`,
        { x: 50, y: height - 340, size: fontSize, font: timesRomanFont }
    );
    page.drawText(
        `  paid time off, and employee training programs, upon joining.`,
        { x: 50, y: height - 360, size: fontSize, font: timesRomanFont }
    );

    page.drawText(`We look forward to having you join our team.`, { x: 50, y: height - 400, size: fontSize, font: timesRomanFont });
    page.drawText(`If you have any questions or need further clarification,`, { x: 50, y: height - 420, size: fontSize, font: timesRomanFont });
    page.drawText(`please feel free to contact us.`, { x: 50, y: height - 440, size: fontSize, font: timesRomanFont });

    page.drawText(`Sincerely,`, { x: 50, y: height - 480, size: fontSize, font: timesRomanFont });
    page.drawText(`${recruiterName}`, { x: 50, y: height - 500, size: fontSize, font: timesRomanFont });
    page.drawText(`${companyName}`, { x: 50, y: height - 520, size: fontSize, font: timesRomanFont });

    page.drawText(
        `This offer is valid for 7 days from the date of issuance. Please confirm your acceptance by replying to this letter.`,
        { x: 50, y: height - 560, size: fontSize, font: timesRomanFont, lineHeight: 14 }
    );

    const pdfBytes = await pdfDoc.save();

    return pdfBytes;
};
