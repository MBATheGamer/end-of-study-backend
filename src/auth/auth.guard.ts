import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly service: JwtService;
  
  constructor(service: JwtService) {
    this.service = service;
  }

  canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();
    try {
      const jwt = request.cookies["jwt"];
      return this.service.verify(jwt);
    }
    catch (exception) {
      return false;
    }
  }
}
