import { IEmailsRepository } from './emails-interfaces/emails.repository.interface';
import { EmailsRingDto } from './dto/emails-ring.dto';
import { injectable } from 'inversify';

@injectable()
export class EmailsRepository implements IEmailsRepository {
	async callBack(dto: EmailsRingDto) {
		console.log(dto);
		return true;
	}
}