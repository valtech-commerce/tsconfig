//--------------------------------------------------------
//-- node-lts-strict-esm - Feature tests
//--------------------------------------------------------
import configTests from "../config";
import { given, when, then } from "./node-lts-strict-esm.gwt";

describe(`Validate that 'node-lts-strict-esm' works`, () => {
	configTests({ given, when, then });
});
