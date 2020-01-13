import { MailService } from './mail.service';
import { HttpExceptionFilter } from '../../common/filter/http-exception.filer';
import { UseFilters } from '@nestjs/common';

// @Resolver()

@UseFilters(new HttpExceptionFilter())
export class MailResolver {
  constructor(private readonly authService: MailService) { }

}
