"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const configOptions_1 = require("./config/configOptions");
const routes_1 = __importDefault(require("./routes"));
const errorhandler_1 = require("./middlewares/errorhandler");
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const PORT = process.env.PORT || 3000;
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./utils/logger"));
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = require("./config/passport.config");
const express_flash_1 = __importDefault(require("express-flash"));
const path_1 = __importDefault(require("path"));
// express middleware
process.on("uncaughtException", (error) => {
    if (error.name === "PrismaClientInitializationError") {
        logger_1.default.error("Failed to connect to database");
    }
    else {
        logger_1.default.error(error.message, { name: error.name, stack: error.stack });
    }
    process.exit(1);
});
app.set("trust proxy", 1);
app.use((0, cors_1.default)(configOptions_1.corsConfig));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, express_flash_1.default)());
app.use(configOptions_1.sessionMiddleware);
app.use((0, morgan_1.default)("dev"));
(0, passport_config_1.initializePassport)(passport_1.default);
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// images route
app.use("/images", express_1.default.static(path_1.default.join(__dirname, "images")));
app.use("/api", routes_1.default);
app.use(errorhandler_1.errorHandler);
server.listen(PORT, () => logger_1.default.info(`App Live`));
