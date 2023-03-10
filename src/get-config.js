//--------------------------------------------------------
//-- Read and process base config
//--------------------------------------------------------
const path = require("node:path");
const { fsSync } = require("@valtech-commerce/fs");
const deepMerge = require("deepmerge");
const pkgDir = require("pkg-dir");

module.exports = (...paths) => {
	return paths.reduce((config, filePath) => {
		const filePaths = filePath.split("/");
		const filename = filePaths.pop();
		const current = fsSync.readYaml(path.join(pkgDir.sync(__dirname), "config", ...filePaths, `${filename}.yaml`));

		return deepMerge.all([config, current], {
			arrayMerge: (destination, source) => source,
		});
	}, {});
};
