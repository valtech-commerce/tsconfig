//--------------------------------------------------------
//-- Config - Given-When-Then
//--------------------------------------------------------
import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv-draft-04";
import fetch from "node-fetch";

import {
	given as givenException,
	when as whenException,
	then as thenException,
} from "@valtech-commerce/jest-gwt/exception"; // eslint-disable-line node/no-missing-import

const given = { ...givenException };
const when = { ...whenException };
const then = { ...thenException };

let schema;
let ruleset;
let rawConfig;
let config;
let schemaCompliance;

//-- Given - Reset
given.noRuleset = () => {
	ruleset = undefined;
};

given.noRawConfig = () => {
	rawConfig = undefined;
};

given.noConfig = () => {
	config = undefined;
};

given.noSchema = () => {
	schema = undefined;
};

given.noSchemaCompliance = () => {
	schemaCompliance = undefined;
};

//-- Given
given.schema = async () => {
	const response = await fetch("https://json.schemastore.org/tsconfig");
	schema = await response.json();
};

given.ruleset = (value) => {
	ruleset = value;
};

//-- When - Config
when.configIsRead = () => {
	when.attempting(() => {
		rawConfig = fs.readFileSync(path.join(__dirname, "..", "base", ruleset, "tsconfig.json"), "utf8");
	});
};

when.configIsParsed = () => {
	when.configIsRead();

	when.attempting(() => {
		config = JSON.parse(rawConfig);
	});
};

when.configIsCheckedAgainstSchema = () => {
	when.configIsParsed();

	const ajv = new Ajv({ strictTypes: false, strictSchema: false });
	ajv.compile(schema);

	schemaCompliance = ajv.validate(config);
};

//-- Then - Config
then.configShouldNotBeEmpty = () => {
	expect(config).toBeObject();
	expect(config).not.toEqual({});
};

then.configShouldComplyWithSchema = () => {
	expect(schemaCompliance).toBeTrue();
};

export { given, when, then };
