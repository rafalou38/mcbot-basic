const config = require("../config");
let move_next_time = Date.now() + Math.random() * config.MOVE_DELAY_MAX * 1000;
let movements = ["forward", "back", "left", "right", "jump", "sprint", "sneak"];

module.exports.loop = async function (bot) {
	let current_time = Date.now();
	if (current_time >= move_next_time) {
		movements.forEach((e) => {
			bot.setControlState(e, Math.round(Math.random()) === 1);
		});
		move_next_time =
			Date.now() + Math.random() * config.MOVE_DELAY_MAX * 1000;
	}
};
