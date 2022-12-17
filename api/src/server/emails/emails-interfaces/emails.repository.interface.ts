import { EmailsRingDto } from '../dto/emails-ring.dto';

export interface IEmailsRepository {
	callBack: (dto: EmailsRingDto) => Promise<boolean>;
}