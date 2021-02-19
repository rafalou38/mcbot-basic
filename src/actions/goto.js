const config = require("../config");
const pathfinder = require("mineflayer-pathfinder").pathfinder;
const Movements = require("mineflayer-pathfinder").Movements;
const { GoalXZ } = require("mineflayer-pathfinder").goals;

let time_not_moving;
let next_move_time = Math.floor(Math.random() * config.MOVE_DELAY_MAX);

function gen_cords(min, max) {
	return Math.max(Math.floor(Math.random() * max), min);
}

async function gen_goal(bot) {
	const x = gen_cords(config.GOTO_MIN_DISTANCE, config.GOTO_MAX_DISTANCE);
	const y = gen_cords(config.GOTO_MIN_DISTANCE, config.GOTO_MAX_DISTANCE);
	console.log(`the bot is moving to the coordinates x:${x} y:${y} 🗺️`);
	bot.pathfinder.setGoal(new GoalXZ(x, y), true);
}

module.exports.loop = async function (bot) {
	if (!bot.pathfinder.isMoving()) {
		if (time_not_moving > next_move_time) {
			gen_goal(bot);
			next_move_time = Math.floor(Math.random() * config.MOVE_DELAY_MAX);
		} else {
			time_not_moving += 1;
		}
	} else {
		time_not_moving = 0;
	}
};

module.exports.init = async function (bot) {
	bot.loadPlugin(pathfinder);
	const mcData = require("minecraft-data")(bot.version);
	const defaultMove = new Movements(bot, mcData);
	bot.pathfinder.setMovements(defaultMove);
};

module.exports.main = async function (bot) {
	gen_goal(bot);
};
