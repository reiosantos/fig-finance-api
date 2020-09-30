import passport from 'passport';
import LocalStrategy from 'passport-local';
import { MODELS } from "@san/constants";
import ModelFactory from "@san/models/model.factory";

export const localStrategy = new LocalStrategy.Strategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false
}, async (username: string, password: string, next: Function) => {
  const userM = ModelFactory.getModel(MODELS.USER);

  try {
    const user = await userM.findOne({ $or: [{'username': username}, {'email': username}] }).exec();
    if (!user) {
      return next(null, false, {
        isError: true,
        data: null,
        error: 'username or password is invalid'
      });
    }

    const isValid = await user.validatePassword(password);

    if (isValid) {
      return next(null, user);
    }
    return next(null, false, {
      isError: true,
      data: null,
      error: 'username or password is invalid'
    });
  } catch (err) {
    return next(null, false, {
      isError: true,
      data: null,
      error: err.message || err
    });
  }
});

passport.use(localStrategy);
