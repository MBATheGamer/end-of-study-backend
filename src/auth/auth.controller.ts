import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from './models/register.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
  private readonly authService: AuthService;
  private readonly jwtService: JwtService;
  private readonly userService: UserService;

  constructor(authService: AuthService, jwtService: JwtService, userService: UserService) {
    this.authService = authService;
    this.jwtService = jwtService;
    this.userService = userService;
  }

  @Post("register")
  public async register(@Body() body: RegisterDTO) {
    if (body["password"] !== body["passwordConfirm"]) {
      throw new BadRequestException("Passwords do not match!");
    }

    await this.userService.create({
      cin: body["cin"],
      firstName: body["firstName"],
      lastName: body["lastName"],
      email: body["email"],
      password: await bcrypt.hash(body["password"], 12),
      role: {id: 4}
    });

    return {
      message: "Success"
    };
  }

  @Post("login")
  public async login(
    @Body("email") email: string,
    @Body("password") password: string,
    @Res({passthrough: true}) response: Response
  ) {
    const user = await this.userService.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (!await bcrypt.compare(password, user["password"])) {
      throw new BadRequestException("Invalid credentials!");
    }

    const jwt = this.jwtService.sign({id: user.id});

    response.cookie("jwt", jwt, { httpOnly: true });

    return {
      message: "Success"
    };
  }

  @UseGuards(AuthGuard)
  @Get("user")
  public async user(@Req() request: Request) {
    const id = await this.authService.userId(request);

    return this.userService.findOne({
      where: {
        id: id
      }
    }, ["role", "classroom"]);
  }

  @UseGuards(AuthGuard)
  @Post("logout")
  public async logout(@Res({passthrough: true}) response: Response) {
    response.clearCookie("jwt");

    return {
      message: "Success"
    }
  }
}
