//--------------------------------------------------------
//-- Calculate configurations
//--------------------------------------------------------
const { execSync } = require("node:child_process");
const path = require("node:path");
const { fsSync } = require("@valtech-commerce/fs");
const sortJson = require("sort-json");
const tmp = require("tmp");

const root = path.join(__dirname, "..", "..");
const configPath = path.join(root, "base");

const temporaryDirectory = tmp.dirSync({ prefix: `tsconfig-generate-fixtures`, unsafeCleanup: true });
tmp.setGracefulCleanup();

fsSync.scandir(configPath, "dir").forEach((name) => {
	const directoryPath = path.join(temporaryDirectory.name, name);

	fsSync.ensureFile(path.join(directoryPath, "index.ts"));

	fsSync.outputJson(path.join(directoryPath, "tsconfig.json"), {
		extends: path.join(configPath, name, "tsconfig.json"),
	});

	const rawConfig = execSync(
		["tsc", `--project ${path.join(directoryPath, "tsconfig.json")}`, "--showConfig"].join(" "),
		{
			stdio: ["pipe"],
		}
	);

	const config = sortJson(JSON.parse(rawConfig.toString()), { depth: 100 });

	fsSync.writeJson(path.join(root, "test", "feature", "fixtures", "config", `${name}.json`), config, { space: 2 });
});
