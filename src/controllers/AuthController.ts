import { Express, Request, Response } from 'express';
import { ControllerBase } from '@san/util/ControllerBase';
import passport from 'passport';
import { MODELS } from '@san/constants';
import ModelFactory from '@san/models/model.factory';

class AuthController extends ControllerBase {
  constructor(app: Express, express: any, routerPrefix: string) {
    super();
    const router: Express = new express.Router();
    // Add as many routes as you want
    router.route('/login').post(this.login);
    router.route('/signup').post(this.signup);

    app.use(`${routerPrefix}/auth`, router);
  }

  login = (req: Request, res: Response, next: Function) => {
    // Need username/password in body
    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
      if (passportUser) {
        const userObject = passportUser;
        userObject.token = passportUser.generateJWTToken();
        return res.json({ isError: false, data: userObject.toAuthJSON(), message: null });
      }

      return res.status(400).json(err || info);
    })(req, res, next);
  };

  signup = async (req: Request, res: Response) => {
    // Need username/password in body
    try {
      const userM = ModelFactory.getModel(MODELS.USER);
      const user = await userM.create(req.body);
      return res.json(user.toAuthJSON());
    } catch (e: any) {
      return res.status(401).json({ error: e.message });
    }
  };
}

export = AuthController;
