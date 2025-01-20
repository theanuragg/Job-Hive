export const offerLetterHtml = ({ candidateName, jobTitle, companyName, salary, startDate, location, recruiterName }) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; border-radius: 8px; padding: 20px;">
      <tr>
        <td style="text-align: center; padding: 20px 0;">
          <h1 style="color: #2c3e50;">Offer Letter from <span style="color: #3498db;">${companyName}</span></h1>
          <p style="font-size: 16px; color: #7f8c8d;">Dear ${candidateName},</p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px;">
          <p style="font-size: 16px; color: #34495e;">
            We are thrilled to offer you the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.
          </p>
          <p style="font-size: 16px; color: #34495e;">
            Here are the details of your offer:
          </p>
          <ul style="font-size: 16px; color: #34495e; margin-left: 20px;">
            <li><strong>Salary:</strong> ${salary} per annum</li>
            <li><strong>Start Date:</strong> ${startDate}</li>
            <li><strong>Location:</strong> ${location}</li>
          </ul>
          <p style="font-size: 16px; color: #34495e;">
            We are confident that you will make a valuable contribution to our team and are excited about the potential you bring to ${companyName}.
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding: 20px;">
          <p style="font-size: 16px; color: #34495e;">
            Please review the attached terms and conditions of your employment. If you have any questions, feel free to reach out to us.
          </p>
          <p style="font-size: 16px; color: #34495e;">
            Kindly confirm your acceptance of this offer by replying to this email or contacting us directly.
          </p>
        </td>
      </tr>
      <tr>
        <td style="text-align: center; padding: 20px 0;">
          <p style="font-size: 16px; color: #34495e;">Looking forward to welcoming you onboard!</p>
          <p style="font-size: 16px; color: #34495e;">Sincerely,</p>
          <p style="font-size: 16px; color: #34495e;">${recruiterName}</p>
          <p style="font-size: 14px; color: #7f8c8d;">Recruiter, ${companyName}</p>
        </td>
      </tr>
      <tr>
        <td style="text-align: center; padding: 20px;">
          <p style="font-size: 14px; color: #bdc3c7;">&copy; 2024 ${companyName}, All Rights Reserved.</p>
        </td>
      </tr>
    </table>
  </div>
`;
