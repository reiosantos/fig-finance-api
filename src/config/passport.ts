import passport from 'passport';
import LocalStrategy from 'passport-local';
import MongoWrapper from '../models';
import { MODELS } from "@san/constants";

export const localStrategy = new LocalStrategy.Strategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false
}, async (username: string, password: string, next: Function) => {
  const userM = MongoWrapper.getModel(MODELS.USER);

  try {
    const user = await userM.findOne({ $or: [{'username': username}, {'email': username}] }).exec();
    if (!user) {
      return next(null, false, { error: 'username or password is invalid' });
    }

    const isValid = await user.validatePassword(password);

    if (isValid) {
      return next(null, user);
    }
    return next(null, false, { error: 'username or password is invalid' });
  } catch (err) {
    return next(null, false, { error: err.message || err });
  }
});

passport.use(localStrategy);
