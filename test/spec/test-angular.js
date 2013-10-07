/*jslint browser : true */
/*global describe, expect, it, beforeEach, afterEach, datespy, spyOn, jasmine, angular */
var originalDate = new Date();

describe('Testing date spy library', function () {
    "use strict";
    var clock;

    beforeEach(function () {
        clock = datespy.useFakeTimers();
    });

    afterEach(function () {
        clock.restore();
    });

    it('Testing Date Spy Tick', function () {
        clock.tick(99);

        clock.tick(1);

        // Also:
        expect(new Date().getTime()).toBe(100);
    });

    it('Expect Fake Time to not match Original Date', function () {
        expect(new Date().getFullYear()).not.toBe(originalDate.getFullYear());
        expect(new Date().getDate()).not.toBe(originalDate.getDate());
        expect(new Date().getDay()).not.toBe(originalDate.getDay());
    });

    it('Expect that spy will be called', function () {
        var timerCallback = jasmine.createSpy('timerCallback');

        setTimeout(function () {
            timerCallback();
        }, 1000);

        expect(timerCallback).not.toHaveBeenCalled();

        clock.tick(1001);

        expect(timerCallback).toHaveBeenCalled();

    });
});


describe('Test to ensure that date spy functionality restore clock', function () {
    "use strict";
    it('Expect original date to match new Date', function () {
        expect(new Date().getFullYear()).toBe(originalDate.getFullYear());
        expect(new Date().getDate()).toBe(originalDate.getDate());
        expect(new Date().getDay()).toBe(originalDate.getDay());
    });
});


describe('Test angular support', function () {
    "use strict";

    var clock;

    beforeEach(function () {
        clock = angular.mock.$mockDate();
    });

    afterEach(function () {
        clock.$restoreDate();
    });

    it('Expect $mockDate to return a mock representation of the Date object', function () {

        var dCallback = jasmine.createSpy('dateCallback');
        setTimeout(function () {
            dCallback();
        }, 1000);

        expect(dCallback).not.toHaveBeenCalled();

        clock.tick(1000);

        expect(dCallback).toHaveBeenCalled();
        expect(dCallback.callCount).toBe(1);
    });

    it('Expect Spy object to be called multiple time', function () {
        var dCallback = jasmine.createSpy('dateCallback'),
            iId = setInterval(function () {
                dCallback();
            }, 1000);

        clock.tick(1000);
        clock.tick(1000);
        clock.tick(1000);
        clock.tick(1000);
        clock.tick(1000);

        clearInterval(iId);

        expect(dCallback).toHaveBeenCalled();
        expect(dCallback.callCount).toBe(5);

    });

    it('Testing Date Spy Tick', function () {
        clock.tick(99);

        clock.tick(1);

        // Also:
        expect(new Date().getTime()).toBe(100);
    });
});