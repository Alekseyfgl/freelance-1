import { IEmailsService } from './emails-interfaces/emails.service.interface';
import { EmailsRingDto } from './dto/emails-ring.dto';
import { injectable } from 'inversify';

@injectable()
export class EmailsService implements IEmailsService {
	async ringBack(dto: EmailsRingDto) {
		console.log(dto);
		return true;
	}
}