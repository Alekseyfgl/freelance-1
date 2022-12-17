import {BaseController} from "../common/base.controller";
import {IEmailsController} from "./emails-interfaces/emails.controller.interface";
import {NextFunction, Request, Response} from "express";
import {EmailsRingDto} from "./dto/emails-ring.dto";
import {inject, injectable} from "inversify";
import {TYPES} from "../types";
import {ILogger} from "../logger/logger.interface";

@injectable()
export class EmailsController extends BaseController implements IEmailsController {
    constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
        super(loggerService);
        this.bindRoutes([{
            path: '/ring',
            method: 'post',
            func: this.ring
        }])
    }
    async ring(req: Request<{}, {}, EmailsRingDto>, res: Response, next: NextFunction) {
        this.ok(res, {message: 'ring',});
    }

}
