import nodemailer from "nodemailer";

export const emailRegister = async (credentials) => {
	const { email, name, token } = credentials;

	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
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
		`,
	});
};

export const emailForgotPassword = async (credentials) => {
	const { email, name, token } = credentials;

	const transport = nodemailer.createTransport({
		host: process.env.EMAIL_HOST,
		port: process.env.EMAIL_PORT,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
	});

	const info = await transport.sendMail({
		from: '"UpTask - Project Admin" <accounts@uptask.com>',
		to: email,
		subject: "UpTask - Reset Password",
		text: "Reset your Password",
		html: `
		<p>Hi: ${name}, you request a password reset</p>
		<p>Follow the link to generate a new password:</p>

		<a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Reset Password</a>

		<p>If you did not request this, you can ignore this email</p>
		`,
	});
};
