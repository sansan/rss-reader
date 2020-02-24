import { BodyParams, Req, $log } from "@tsed/common";
import { OnInstall, OnVerify, Protocol } from "@tsed/passport";
import { IStrategyOptions, Strategy } from "passport-local";
import { Credentials } from "../models/Credentials";
import { UserRepository } from "../repositories/UserRepository";
import { Forbidden, NotFound } from "ts-httpexceptions";
const bcrypt = require("bcrypt");
const saltRounds = 10;

@Protocol<IStrategyOptions>({
  name: "login",
  useStrategy: Strategy,
  settings: {
    usernameField: "email",
    passwordField: "password"
  }
})
export class LoginLocalProtocol implements OnVerify, OnInstall {
  constructor(private userRepository: UserRepository) {}

  async $onVerify(@Req() request: Req, @BodyParams() credentials: Credentials) {
    const { email, password } = credentials;

    const user = await this.userRepository.findOne({ email });
    $log.debug("verifying login");
    if (!user) {
      $log.debug("not exist");
      throw new NotFound("User does not exist");
      //return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      throw new Forbidden("Wrong password!");
      //return false;
      // OR throw new NotAuthorized("Wrong credentials")
    }
    $log.debug("ok");

    return { ok: true, user };
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
