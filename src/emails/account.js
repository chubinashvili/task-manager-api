import nodemailer from 'nodemailer';
 
const transporter = () => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,  
            pass:  process.env.PASSWORD
        }
    });
};
 
export const sendWelcomeEmail = (email, name) => {
    const transporterObject = transporter();
    transporterObject.sendMail({
        from: 'Task Manager API <chubinashvili2003@gmail.com>',
        to: email,
        subject: 'Thanks for joining!',
        text: `Welcome to our service, ${name}!`,
        html: `<b>Welcome to our service, ${name}!</b>`
    });
};
 
export const sendDeleteEmail = (email, name) => {
    const transporterObject = transporter();
    transporterObject.sendMail({
        from: 'Task Manager API <chubinashvili2003@gmail.com>',
        to: email,
        subject: 'We\'re sorry to see you leave',
        text: `We hope to see you back again someday, ${name}!`,
        html: `<b>We hope to see you back again someday, ${name}!</b>`
    });
};
 
