const config = require("../config");
const pathfinder = require("mineflayer-pathfinder").pathfinder;
const Movements = require("mineflayer-pathfinder").Movements;
const { GoalXZ } = require("mineflayer-pathfinder").goals;

let time_not_moving;
let next_move_time = Math.floor(Math.random() * config.MOVE_DELAY_MAX);
let last_pos;
let time_locked = 0;
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
	let current_pos = bot.entity.position.floored();

	if (
		(current_pos?.x == last_pos?.x &&
			current_pos?.y == last_pos?.y &&
			current_pos?.z == last_pos?.z) ||
		bot.blockAt(current_pos)?.name != "air"
	) {
		time_locked++;
	} else {
		time_locked = 0;
		last_pos = current_pos;
	}
	if (time_locked >= 5) {
		bot.chat(
			`/tp ~${Math.round(Math.random() * 10)} ~${Math.round(
				Math.random() * 10
			)} ~${Math.round(Math.random() * 10)}`
		);
		time_locked = 0;
		console.log("bot locked unlocking ... 🕳");
	}

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
