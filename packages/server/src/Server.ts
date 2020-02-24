import {
  ConverterService,
  EndpointInfo,
  GlobalAcceptMimesMiddleware,
  IMiddleware,
  OverrideProvider,
  Res,
  ResponseData,
  SendResponseMiddleware,
  ServerLoader,
  ServerSettings
} from "@tsed/common";
import "@tsed/ajv";
import "@tsed/passport";
import "@tsed/swagger";
import "@tsed/typeorm";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import * as session from "express-session";
import * as methodOverride from "method-override";
import * as path from "path";
import { User } from "./entities/User";

const rootDir = __dirname;
const clientDir = path.join(rootDir, "../../client/build");
const dbPath = path.join(rootDir, "../resources/database.sql");

@ServerSettings({
  rootDir,
  ajv: {
    errorFormat: error =>
      `At ${error.modelName}${error.dataPath}, value '${error.data}' ${error.message}`,
    options: { verbose: true }
  },
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8081,
  httpsPort: false,
  mount: {
    "/v1": [`${rootDir}/controllers/**/**Ctrl.{ts,js}`]
  },
  componentsScan: [
    `${rootDir}/services/*{.ts,.js}`,
    `${rootDir}/repositories/*{.ts,.js}`,
    `${rootDir}/protocols/*{.ts,.js}`
  ],
  passport: {
    userInfoModel: User
  },
  typeorm: [
    {
      name: "default",
      type: "sqlite",
      database: process.env.MYSQL_DB || dbPath,
      logging: false,
      synchronize: false,
      entities: [`${rootDir}/entities/*{.ts,.js}`],
      migrations: [`${rootDir}/migrations/*{.ts,.js}`],
      subscribers: [`${rootDir}/subscriber/*{.ts,.js}`]
    }
  ],
  swagger: {
    path: "/api-docs",
    spec: {
      securityDefinitions: {
        "auth:basic": {
          type: "basic"
        }
      }
    }
  },
  statics: {
    "/": clientDir
  },
  logger: {
    debug: true,
    logRequest: true,
    requestFields: [
      "reqId",
      "method",
      "url",
      "headers",
      "query",
      "params",
      "duration"
    ]
  }
})
export class Server extends ServerLoader {
  $beforeRoutesInit(): void | Promise<any> {
    this.use(GlobalAcceptMimesMiddleware)
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true
        })
      )
      .use(
        session({
          secret: "mysecretkey",
          resave: true,
          saveUninitialized: true,
          // maxAge: 36000,
          cookie: {
            path: "/",
            httpOnly: true,
            secure: false,
            maxAge: null
          }
        })
      );

    return null;
  }
}
