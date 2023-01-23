import { PrismaClient } from ".prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

let userAccount = null;
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const confirmPasswordHash = (plainPassword, hashedPassword) => {
  return new Promise((resolve) => {
    bcrypt.compare(plainPassword, hashedPassword, function (err, res) {
      resolve(res);
    });
  });
};

const configuration = {
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_END === "production",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          // SELECT * FROM users WHERE email='value';
          const user = await prisma.users.findFirst({
            where: {
              email: credentials.email,
            },
          });

          if (user !== null) {
            //Compare the hash
            const res = await confirmPasswordHash(
              credentials.password,
              user.password
            );
            if (res === true) {
              userAccount = {
                userId: user.userId,
                email: user.email,
                garden: user.garden
              };
              return userAccount;
            } else {
              console.log("Hash not matched logging in");
              return null;
            }
          } else {
            return null;
          }
        } catch (err) {
          console.log("Authorize error:", err);
        }
      },
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      try {
        user = user.user;
        console.log("Sign in callback", user);
        console.log("User id: ", user.userId);
        if (typeof user.userId !== typeof undefined) {
          if (user.isActive === "1") {
            console.log("User is active");
            return user;
          } else {
            console.log("User is not active");
            return false;
          }
        } else {
          console.log("User id was undefined");
          return false;
        }
      } catch (err) {
        console.log("Signin callback error:", err);
        return false;
      }
    },
    async session(session, token) {
      if (userAccount !== null) {
        session.user = userAccount;
        session.user = {
          userId: userAccount.userId,
          email: userAccount.email,
          garden: userAccount.garden
        };
      } else if (
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          (typeof session.user !== typeof undefined &&
            typeof session.user.userId === typeof undefined))
      ) {
        session.user = token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      console.log("JWT callback. Got User: ", user);
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
};

export default (req, res) => NextAuth(req, res, configuration);