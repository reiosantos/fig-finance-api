import { Express, Request, Response } from 'express';
import { ControllerBase } from '@san/util/ControllerBase';
import { MODELS } from '@san/constants';
import ModelFactory from '@san/models/model.factory';

class EventsController extends ControllerBase {
  constructor(app: Express, express: any, routerPrefix: string) {
    super();
    const router: Express = new express.Router();
    // Add as many routes as you want
    router.route('/recommendations').post(this.recommendations);

    app.use(`${routerPrefix}/events`, router);
  }

  recommendations = async (req: Request, res: Response) => {
    try {
      const eventM = ModelFactory.getModel(MODELS.EVENT);
      const events = await eventM.find({});
      return res.json(events);
    } catch (e: any) {
      return res.status(401).json({ error: e.message });
    }
  };
}

export = EventsController;
