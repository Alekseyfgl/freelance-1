import { IEmailsRepository } from './emails-interfaces/emails.repository.interface';
import { EmailsRingDto } from './dto/emails-ring.dto';
import { inject, injectable } from 'inversify';
import nodemailer, { SentMessageInfo, Transporter } from 'nodemailer';
import { TYPES } from '../../types';
import { IConfigService } from '../../config/config.service.interface';
import { ILogger } from '../../logger/logger.interface';
import { ringBack } from './messages/ring-back.message';
import { IRingBackMessage } from './emails-interfaces/messages.interface';

@injectable()
export class EmailsRepository implements IEmailsRepository {
	constructor(@inject(TYPES.ConfigService) private configService: IConfigService, @inject(TYPES.ILogger) private loggerService: ILogger) {}

	async callBack(dto: EmailsRingDto): Promise<boolean> {
		const { phone } = dto;
		const host: string = this.configService.get('HOST_GMAIL');
		const user: string = this.configService.get('GMAIL');
		const pass: string = this.configService.get('PASS_CODE');

		const transporter: Transporter<SentMessageInfo> = nodemailer.createTransport({ host, auth: { user, pass } });

		try {
			const message: IRingBackMessage = ringBack(phone, user);

			await transporter.sendMail(message);
			return true;
		} catch (error) {
			this.loggerService.error(error);
			return false;
		}
	}
}