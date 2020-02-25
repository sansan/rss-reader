import { BodyParams, Req } from "@tsed/common";
import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { Strategy } from "passport-local";
import { Forbidden } from "ts-httpexceptions";
import { UserCreation } from "../models/UserCreation";
import { UserRepository } from "../repositories/UserRepository";
const bcrypt = require("bcrypt");
const saltRounds = 10;

@Protocol({
  name: "signup",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class SignupLocalProtocol implements OnVerify, OnInstall {
  constructor(private userRepository: UserRepository) {}

  async $onVerify(@Req() request: Req, @BodyParams() user: UserCreation) {
    const { email, password } = user;
    const found = await this.userRepository.findOne({ email });

    if (found) {
      throw new Forbidden("Email is already registered");
    }

    const hash = bcrypt.hashSync(password, saltRounds);
    const { id } = await this.userRepository.save({
      ...user,
      password: hash
    });
    return { id, email };
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
