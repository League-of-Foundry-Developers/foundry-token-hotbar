"use strict";
exports.__esModule = true;
require("jasmine");
var settings_1 = require("../src/settings");
var TestClientSettings = /** @class */ (function () {
    function TestClientSettings(settings) {
        this.settings = settings;
    }
    TestClientSettings.prototype.get = function (scope, key) {
        return this.settings[key];
    };
    return TestClientSettings;
}());
describe('linkToLinkedActor', function () {
    it('should be true when linkToLinkedActor is true', function () {
        var clientSettings = {};
        clientSettings[settings_1.Settings.keys.linkToLinkedActor] = true;
        var settings = new settings_1.Settings().load(new TestClientSettings(clientSettings));
        expect(settings.linkToLinkedActor).toBeTrue();
    });
});
