import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import 'reflect-metadata';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { UsersController } from './users/users.controller';
import {IEmailsController} from "./emails/emails-interfaces/emails.controller.interface";
import {IUsersController} from "./users/users-interfaces/users.controller.interface";
import {EmailsController} from "./emails/emails.controller";

@injectable()
export class App {
	app: Express;
	server: Server;
	port: number;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UsersController) private usersController: UsersController,
		@inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.EmailsController) private emailsController: EmailsController,
	) {
		this.app = express();
		this.port = 3000;
	}

	//для обработок ошибок
	useExceptionFilters(): void {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
	}

	useMiddleware(): void {
		this.app.use(json());
		// this.app.use(express.json({ limit: '1mb' }));
	}

	useRoutes(): void {
		this.app.use('/users', this.usersController.router);
		this.app.use('/emails', this.emailsController.router);
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExceptionFilters();
		this.server = this.app.listen(this.port);
		this.logger.log(`Server started on http://localhost:${this.port}`);
	}
}
