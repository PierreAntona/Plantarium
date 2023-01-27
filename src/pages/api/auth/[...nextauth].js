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
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
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
                email: user.email,
                garden: user.garden,
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
        return user;
      } catch (err) {
        console.log("Signin callback error:", err);
        return false;
      }
    },
    async session(session, token) {
      if (userAccount !== null) {
        session.user = userAccount;
        session.user = {
          email: userAccount.email,
          garden: userAccount.garden,
        };
      } else if (
        typeof token.user !== typeof undefined &&
        (typeof session.user === typeof undefined ||
          typeof session.user !== typeof undefined)
      ) {
        session.user = token.token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      console.log(session.user)
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
  },
  secret: process.env.JWT_SECRET,
};

export default (req, res) => NextAuth(req, res, configuration);
