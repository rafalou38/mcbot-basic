process.setMaxListeners(20);
const config = require("./config");
const mineflayer = require("mineflayer");
const mineflayerViewer = require("prismarine-viewer").mineflayer;
let live;
let first = true;
let action = require("./actions/goto");
let checkOnline = setInterval(() => {});
let last_loop = Date.now();
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
		if (!live && config.VIEWER != "false") {
			live = await mineflayerViewer(bot, {
				port: config.VIEWER_PORT,
				firstPerson: true,
			});
		}
		if (action.main) await action.main(bot);

		for (const command of config.START_CMD) {
			bot.chat(command);
		}

		first = false;
	}
}

async function setupEvents(bot) {
	bot.on("spawn", (_) => main(bot));

	checkOnline = setInterval(() => {
		if (last_loop + 10000 <= Date.now()) {
			bot.quit();
			console.error("bot end 😭");
			console.info(`reconnecting in ${config.RECONNECT_DELAY}s ⏳`);
			setTimeout(connect, config.RECONNECT_DELAY * 1000);
			clearInterval(checkOnline);
		}
	}, 2000);

	if (action.loop)
		bot.on("time", (_) => {
			console.log("loop");
			last_loop = Date.now();
			action.loop(bot);
		});
}

connect();
