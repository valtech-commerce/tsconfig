//--------------------------------------------------------
//-- Build configurations
//--------------------------------------------------------
const path = require("node:path");
const { fsSync } = require("@valtech-commerce/fs");

const root = path.join(__dirname, "..");
const configPath = path.join(root, "src", "config");

fsSync.scandir(configPath, "file").forEach((file) => {
	const outputPath = path.join(root, "base", file.slice(0, ".js".length * -1), "tsconfig.json");
	const config = require(path.join(configPath, file));

	fsSync.outputJson(outputPath, config, { space: 2 });
});
