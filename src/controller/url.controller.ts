import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes';
import { URLModel } from '../models/url.model';
import shortId from 'shortid';

class URLController {

    public async encurtar(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { originURL } = req.body;
            const url = await URLModel.findOne({ originURL });
            if( url ) {
                res.status(StatusCodes.CREATED).json(url);
                return;
            }

            const hash = shortId.generate();
            const shortURL = `${process.env.API_URL}:${process.env.SERVER_PORT}/${hash}`;
            const newURL = await URLModel.create({ hash, shortURL, originURL });
            res.status(StatusCodes.OK).json(newURL);
        } catch(error) {
            next(error);
        }
	}

	public async redirecionar(req: Request<{hash: string}>, res: Response, next: NextFunction): Promise<void> {
        try {
            const { hash } = req.params;
            const url = await URLModel.findOne({ hash });

            if( url ) {
                res.redirect(url.originURL);
                return;
            }
            res.status(StatusCodes.NOT_FOUND).json({ error: 'URL não encontrada' })
        } catch(error) {
            next(error);
        }
	}

}

export default new URLController();