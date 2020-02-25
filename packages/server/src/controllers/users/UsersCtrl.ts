import { BodyParams, Controller, Get, PathParams, Post } from "@tsed/common";
import { Returns, ReturnsArray } from "@tsed/swagger";
import { User } from "../../entities/User";
import { UserCreation } from "../../models/UserCreation";
import { UserRepository } from "../../repositories/UserRepository";

@Controller("/users")
export class UsersCtrl {
  constructor(private userRepository: UserRepository) {}

  @Post("/check")
  async check(@BodyParams("email") email: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      return { ok: true };
    }
    return { ok: false, error: `User with email ${email} exists` };
  }

}
