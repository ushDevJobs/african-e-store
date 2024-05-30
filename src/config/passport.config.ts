import { PassportStatic } from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { prisma } from "../prisma";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { validateLoginData } from "../schema/users";
import { compareSync } from "bcrypt";
import { ErrorCode } from "../exceptions/root";
interface User extends Express.User {
  id?: string;
  // Other user properties
}
export const initializePassport = (passport: PassportStatic) => {
  passport.serializeUser((user: User, done) => {
    done(null, user?.id);
  });
  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          email: true,
          accountType: true,
        },
      });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      async (req, email, password, done) => {
        if (!req.isAuthenticated()) {
          try {
            const parsed = validateLoginData.safeParse({ email, password });
            if (!parsed.success) {
              return done(null, false, {
                message: req.flash("error", [
                  parsed.error.errors[0].message,
                  "422",
                  "" + ErrorCode.UNPROCESSABLE_ENTITY,
                ]),
              });
            }
            const user = await prisma.user.findUnique({
              where: {
                email: email,
              },
              select: {
                id: true,
                email: true,
                accountType: true,
                password: true,
              },
            });
            console.log(user)
            if (!user) {
              return done(null, false, {
                message: req.flash("error", [
                  "No user with that email",
                  "404",
                  "" + ErrorCode.USER_NOT_FOUND,
                ]),
              });
            }

            if (compareSync(parsed.data?.password, user.password! || "")) {
              let newUser = {
                id: user.id,
                email: user.email,
                AccountType: user.accountType,
              };
              return done(null, newUser);
            } else {
              return done(null, false, {
                message: req.flash("error", [
                  "Invalid credentials",
                  "400",
                  "" + ErrorCode.INVALID_CREDENTIALS,
                ]),
              });
            }
          } catch (error) {
            done(error);
          }
        } else {
          done(null, req.user);
        }
      }
    )
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.CLIENT_ID as string,
        clientSecret: process.env.CLIENT_SECRET as string,
        callbackURL: "http://localhost:3000/api/auth/google/callback",
        passReqToCallback: true,
      },
      async (req, accessToken, refreshToken, profile, done) => {
        if (!req.isAuthenticated()) {
          const user = await prisma.user.findFirst({
            where: {
              OR: [
                {
                  googleId: profile.id,
                },
                {
                  email: profile._json.email,
                },
              ],
            },
            select: {
              id: true,
              email: true,
              accountType: true,
              googleId: true,
            },
          });
          if (!user) {
            if (profile._json.email) {
              try {
                const createUser = await prisma.user.create({
                  data: {
                    fullname: profile.displayName,
                    email: profile._json.email!,
                    googleId: profile.id,
                    status: profile._json.email_verified!
                      ? "VERIFIED"
                      : "PENDING",
                    accountType: "BUYER",
                    profilePicture:profile._json.picture
                  },
                  select: {
                    id: true,
                    email: true,
                    accountType: true,
                  },
                });
                return done(null, createUser);
              } catch (error: any) {
                return done(error);
              }
            } else {
              return done(null, false, { message: "No email present" });
            }
          }

          if (!user.googleId) {
            await prisma.user.update({
              where: {
                email: user.email,
              },
              data: {
                googleId: profile.id,
              },
            });
          }
          console.log(user);
          return done(null, {
            id: user.id,
            email: user.email,
            accountType: user.accountType,
          });
        } else {
          return done(null, req.user);
        }
      }
    )
  );
};
