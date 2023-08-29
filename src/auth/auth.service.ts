import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthService {
  private readonly service: JwtService;

  constructor(service: JwtService) {
    this.service = service;
  }

  public async userId(request: Request): Promise<number> {
    const cookie = request.cookies["jwt"];

    const data = await this.service.verifyAsync(cookie);

    return data["id"];
  }
}
