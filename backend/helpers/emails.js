import nodemailer from "nodemailer";

export const emailRegister = async (credentials) => {
	const { email, name, token } = credentials;

	const transport = nodemailer.createTransport({
		host: "sandbox.smtp.mailtrap.io",
		port: 2525,
		auth: {
		  user: "b9987ec38423b5",
		  pass: "92d8b9f668a32b"
		}
	  });

	const info = await transport.sendMail({
		from: '"UpTask - Project Admin" <accounts@uptask.com>',
		to: email,
		subject: "UpTask - Confirm Account",
		text: "Confirm your UpTask Account",
		html: `
		<p>Hi: ${name}, please confirm your UpTask Account</p>
		<p>Your account is almost ready, you just have to confirm it with this link:</p>

		<a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirm Account</a>

		<p>If you did not created an account you can ignore this email</p>
		`
	})
}