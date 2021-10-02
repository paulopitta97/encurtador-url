import { Router } from "express";
import urlController from "../controller/url.controller";

const urlsRoute = Router();

urlsRoute.post('/encurtar', urlController.encurtar);
urlsRoute.get('/:hash', urlController.redirecionar);

export default urlsRoute;