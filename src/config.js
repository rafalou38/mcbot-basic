require("dotenv").config();

module.exports = {
	VIEWER_PORT: process.env.PORT,
	BOT_USERNAME: process.env.BOT_USERNAME || "mr. Bot",
	BOT_PASSWORD: process.env.BOT_PASSWORD,
	SERVER: process.env.SERVER || "localhost",
	SERVER_PORT: process.env.SERVER_PORT,
	RECONNECT_DELAY: process.env.RECONNECT_DELAY || 4,
	MC_VERSION: process.env.MC_VERSION,
	MOVE_DELAY_MAX: process.env.MOVE_DELAY_MAX || 5,
	MODE: process.env.MODE || "goto",
	GOTO_MAX_DISTANCE: process.env.GOTO_MAX_DISTANCE || 4000,
	GOTO_MIN_DISTANCE: process.env.GOTO_MIN_DISTANCE || 1000,
};
