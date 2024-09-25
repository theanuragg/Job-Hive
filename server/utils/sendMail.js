import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "vedanshjainvj1008@gmail.com",
    pass: "reroljmnklwcdcpu",
  },
});

async function sendMail(to,subject,text,html) {
  const info = await transporter.sendMail({
    from: 'vedanshjainvj1008@gmail.com', // sender address
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);
  
}

const welcomeEmailHtml = (fullname) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #f4f4f4; border-radius: 8px; padding: 20px;">
      <tr>
        <td style="text-align: center; padding: 20px 0;">
          <h1 style="color: #2c3e50;">Welcome to <span style="color: #3498db;">JobHive</span>, ${fullname}!</h1>
          <p style="font-size: 16px; color: #7f8c8d;">We're excited to have you on board.</p>
        </td>
      </tr>

      <tr>
        <td style="padding: 20px;">
          <p style="font-size: 16px; color: #34495e;">
            JobHive is your gateway to exploring the best job opportunities. 
            We’re here to make your job search experience easier and faster.
          </p>
          <p style="font-size: 16px; color: #34495e;">
            To get started, explore our wide range of job listings, connect with recruiters, and apply for jobs that suit your profile.
          </p>
          <p style="font-size: 16px; color: #34495e;">Click below to begin your journey!</p>
        </td>
      </tr>

      <tr>
        <td style="text-align: center; padding: 20px 0;">
          <a href="https://jobhive.com" style="background-color: #3498db; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 16px;">
            Explore Jobs
          </a>
        </td>
      </tr>

      <tr>
        <td style="text-align: center; padding: 20px;">
          <p style="font-size: 14px; color: #7f8c8d;">Thank you for registering on JobHive. If you have any questions, feel free to contact our support team.</p>
          <p style="font-size: 14px; color: #7f8c8d;">Happy job hunting!</p>
        </td>
      </tr>

      <tr>
        <td style="text-align: center; padding: 20px;">
          <p style="font-size: 12px; color: #bdc3c7;">&copy; 2024 JobHive, All Rights Reserved.</p>
        </td>
      </tr>
    </table>
  </div>
`;

export { sendMail, welcomeEmailHtml };


