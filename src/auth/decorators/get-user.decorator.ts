import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  let user = req.user;

  if (!user) {
    throw new InternalServerErrorException('User not found (request)');
  }

  // si la data tiene algo entonces regresar solo esas propiedades
  if (data?.length > 0) {
    user = data.reduce((acc, key) => {
      acc[key] = user[key];
      return acc;
    }, {});
  }

  return user;
});
