const config = require("./config");
const mineflayer = require("mineflayer");
const mineflayerViewer = require("prismarine-viewer").mineflayer;
let live;
let first = true;
let action = require("./actions/goto");
const armorManager = require("mineflayer-armor-manager");
try {
	action = require(`./actions/${config.MODE}`);
} catch (err) {
	console.error(
		`no action named ${config.MODE} should be one of ["goto", "random"] defaulting to goto"`
	);
}

async function connect() {
	console.info("connecting 🚀");
	first = true;
	const bot = mineflayer.createBot({
		host: config.SERVER,
		port: config.SERVER_PORT,
		username: config.BOT_USERNAME,
		password: config.BOT_PASSWORD,
		version: config.MC_VERSION,
		auth: "mojang",
	});
	if (live) live(bot);
	bot.loadPlugin(armorManager);
	await setupEvents(bot);

	if (action.init) await action.init(bot);
	return bot;
}

async function main(bot) {
	if (first) {
		console.info("\nthe bot is connected 🎉");
		console.log(
			`username: ${bot.username}\nversion: ${bot.version}\nserver: ${config.SERVER}\n`
		);
		if (!live) {
			live = await mineflayerViewer(bot, {
				port: config.VIEWER_PORT,
				firstPerson: true,
			});
		}
		if (action.main) await action.main(bot);

		if (config.START_CMD) {
			bot.chat(config.START_CMD);
		}

		first = false;
	}
}

async function setupEvents(bot) {
	bot.on("spawn", (_) => main(bot));
	bot.on("kicked", (reason, loggedIn) => {
		bot.quit();
		console.warn(`the bot was kicked ⛔: ${reason}`);
		console.info(`reconnecting in ${config.RECONNECT_DELAY}s ⏳`);
		setTimeout(connect, config.RECONNECT_DELAY * 1000);
	});

	bot.on("error", (error) => {
		bot.quit();
		console.error("oh no there was an error 😱: ", error);
		console.info(`reconnecting in ${config.RECONNECT_DELAY}s ⏳`);
		setTimeout(connect, config.RECONNECT_DELAY * 1000);
	});

	if (action.loop) bot.on("time", (_) => action.loop(bot));
}

connect();
