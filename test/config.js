//--------------------------------------------------------
//-- Config tests
//--------------------------------------------------------

export default ({ given, when, then }) => {
	beforeEach(async () => {
		given.noException();
		given.noSchema();
		given.noRuleset();
		given.noRawConfig();
		given.noConfig();
		given.noSchemaCompliance();
		given.currentRuleset();
	});

	test(`Ensure file exists`, () => {
		when.configIsRead();
		then.shouldNotHaveThrown();
	});

	test(`Ensure file is contains valid JSON`, () => {
		when.configIsParsed();
		then.shouldNotHaveThrown();
	});

	test(`Ensure file contains config`, () => {
		when.configIsParsed();
		then.configShouldNotBeEmpty();
	});

	test(`Ensure config complies with schema`, async () => {
		await given.schema();
		when.configIsCheckedAgainstSchema();
		then.configShouldComplyWithSchema();
	});
};
