//--------------------------------------------------------
//-- node-lts-strict - Feature tests
//--------------------------------------------------------
import configTests from "../config";
import { given, when, then } from "./node-lts-strict.gwt";

describe(`Validate that 'node-lts-strict' works`, () => {
	configTests({ given, when, then });
});
