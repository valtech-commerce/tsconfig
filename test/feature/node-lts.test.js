//--------------------------------------------------------
//-- node-lts - Feature tests
//--------------------------------------------------------
import configTests from "../config";
import { given, when, then } from "./node-lts.gwt";

describe(`Validate that 'node-lts' works`, () => {
	configTests({ given, when, then });
});
