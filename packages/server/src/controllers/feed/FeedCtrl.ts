import { Controller, Get } from "@tsed/common";
import { FeedService } from "../../services/feed/FeedService";
import { Authorize } from "@tsed/passport";

@Controller("/feed")
export class FeedCtrl {
  constructor(private feedService: FeedService) {}

  @Get("/")
  @Authorize("login")
  async getFeedData() {
    return this.feedService.get();
  }
}
