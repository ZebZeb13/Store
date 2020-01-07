import { createParamDecorator } from '@nestjs/common';
import { Response } from 'express';
import { User } from '../../module/user/entities/user.entity';

export const ResGql = createParamDecorator(
  (data, [root, args, ctx, info]): Response => ctx.res,
);
