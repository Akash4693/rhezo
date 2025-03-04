import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";
import { client, sender } from "./mailtrap";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipient = [{ email }];
  console.log("recipient: ", recipient);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verification",
    });
    console.log("SendVerification response:", res);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification");
  }
};
export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{ email }];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome to Rhezo",
      html: htmlContent,
      template_variables: {
        company_info_name: "Rhezo",
        name: name,
      },
    });
    console.log("SendWelcomeEmail response:", res);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email");
  }
};
export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
) => {
  const recipient = [{ email }];
  const htmlContent = generatePasswordResetEmailHtml(resetURL);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: htmlContent,
      category: "Reset Password",
    });
    console.log("SendPasswordResetEmail response:", res);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to reset password");
  }
};
export const sendResetSuccessEmail = async (email: string) => {
  const recipient = [{ email }];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successfully",
      html: htmlContent,
      category: "Password Reset",
    });
    console.log("SendResetSuccessEmail response:", res);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset success email");
  }
};
