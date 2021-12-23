const nodemailer = require('nodemailer');
 
function transporter() {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,  
            pass:  process.env.PASSWORD
        }
    });
};
 
function sendWelcomeEmail(email, name) {
    const transporterObject = transporter();
    transporterObject.sendMail({
        from: 'Task Manager API <chubinashvili2003@gmail.com>',
        to: email,
        subject: 'Thanks for joining!',
        text: `Welcome to our service, ${name}!`,
        html: `<b>Welcome to our service, ${name}!</b>`
    });
};
 
function sendDeleteEmail(email, name) {
    const transporterObject = transporter();
    transporterObject.sendMail({
        from: 'Task Manager API <chubinashvili2003@gmail.com>',
        to: email,
        subject: 'We\'re sorry to see you leave',
        text: `We hope to see you back again someday, ${name}!`,
        html: `<b>We hope to see you back again someday, ${name}!</b>`
    });
};
 
module.exports = {
    sendWelcomeEmail,
    sendDeleteEmail
};