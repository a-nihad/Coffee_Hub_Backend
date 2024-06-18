import transporter from "../config/nodemailer.js";

export const sendEmail = async (email, userName, otp) => {
  return await transporter.sendMail({
    from: '"Blog App 🧑🏼‍💻" <nihad.tech111@gmail.com>',
    to: email,
    subject: "Email verification",
    html: `
        <div>
          <p> Dear ${userName} </p>
          <p> Thank you for signing up for an account...</p>

          <p> Your OTP :- <b> ${otp} </b> </p>
        </div>
    `,
  });
};
