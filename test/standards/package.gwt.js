//--------------------------------------------------------
//-- Standards - Given-When-Then
//--------------------------------------------------------
import path from "node:path";
import { given as givenPackage, when as whenPackage, then as thenPackage } from "@valtech-commerce/jest-gwt/package";

const given = { ...givenPackage };
const when = { ...whenPackage };
const then = { ...thenPackage };

//-- Given - Current
given.currentRoot = () => {
	given.packageRoot(path.join(__dirname, "..", ".."));
};

given.currentNamePattern = () => {
	given.packageNamePattern(/^@valtech-commerce\/.+$/u);
};

given.currentKeywords = () => {
	given.packageKeywords(["tsconfig"]);
};

export { given, when, then };
