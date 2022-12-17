import {EmailsRingDto} from "../dto/emails-ring.dto";

export interface IEmailsService {
    ringBack: (dto: EmailsRingDto) => Promise<boolean>
}