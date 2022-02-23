const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  try {
    const newMail = { ...data, from: "vitaliikovalenko23@gmail.com" };
    await sgMail.send(newMail);
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
