const { PrismaClient } = require('@prisma/client');
const ResponseTemplate = require('../helper/response.helper');
const prisma = new PrismaClient();
const hashPassword = require('../utils/hashPassword');
const Sentry = require('@sentry/node');

async function Register(req, res) {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      return res
        .status(400)
        .json(ResponseTemplate(null, 'failed to register new user', null, 400));
    }

    return res
      .status(201)
      .json(ResponseTemplate(newUser, 'created', null, 201));
  } catch (error) {
    Sentry.captureException(error);
    return res
      .status(500)
      .json(ResponseTemplate(null, 'internal server error', error, 500));
  }
}

module.exports = { Register };
