require("dotenv").config();

module.exports = {
	BOT_USERNAME     : process.env.BOT_USERNAME || "mr. Bot",
	BOT_PASSWORD     : process.env.BOT_PASSWORD,
	SERVER           : process.env.BOT_PASSWORD || "localhost",
	PORT             : process.env.port,
	RECONNECT_DELAY  : process.env.RECONNECT_DELAY || 10,
	MC_VERSION       : process.env.MC_VERSION || "1.16.5",
	MOVE_DELAY_MAX   : process.env.MOVE_DELAY_MAX || 5,
	MODE             : process.env.MODE || "goto",
	GOTO_MAX_DISTANCE: process.env.GOTO_MAX_DISTANCE || 200,
	GOTO_MIN_DISTANCE: process.env.GOTO_MIN_DISTANCE || -200,
};
