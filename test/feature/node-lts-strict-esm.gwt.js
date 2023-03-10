//--------------------------------------------------------
//-- node-lts-strict-esm - Given-When-Then
//--------------------------------------------------------
import { given as givenConfig, when as whenConfig, then as thenConfig } from "../config.gwt";

const given = { ...givenConfig };
const when = { ...whenConfig };
const then = { ...thenConfig };

given.currentRuleset = () => {
	given.ruleset("node-lts-strict-esm");
};

export { given, when, then };
