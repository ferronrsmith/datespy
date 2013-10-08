/*jslint browser : true, evil :true */
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

        setTimeout(timerCallback, 1000);

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
        setTimeout(dCallback, 1000);

        expect(dCallback).not.toHaveBeenCalled();

        clock.tick(1000);

        expect(dCallback).toHaveBeenCalled();
        expect(dCallback.callCount).toBe(1);
    });

    it('Expect Spy object to be called multiple time', function () {
        var dCallback = jasmine.createSpy('dateCallback'),
            iId = setInterval(dCallback, 1000);

        clock.tick(5000);

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

    it('Expect spy to not be called : Tick has not reached the expected value', function () {
        var dCallback = jasmine.createSpy('dateCallback');
        setTimeout(dCallback, 1000);

        clock.tick(999);
        expect(dCallback).not.toHaveBeenCalled();
        expect(dCallback.callCount).toBe(0);

        clock.tick(1);
        expect(dCallback).toHaveBeenCalled();
        expect(dCallback.callCount).toBe(1);
    });

    it('Expect spy to to be called 2 times in 4 second interval : using the date parse functionality', function () {
        var dCallback = jasmine.createSpy('dateCallback');
        setInterval(dCallback, 4000);

        // passing in 8 seconds
        clock.tick("08");
        expect(dCallback).toHaveBeenCalled();
        expect(dCallback.callCount).toBe(2);
    });

    it('Expect spy to to be called 30 times in 4 second interval : using the date parse functionality', function () {
        var dCallback = jasmine.createSpy('dateCallback');
        setInterval(dCallback, 4000);

        // passing in 2 minutes
        clock.tick("02:00");
        expect(dCallback).toHaveBeenCalled();
        expect(dCallback.callCount).toBe(30);
    });

    it('Expect spy to to be called 89 times in 4 second interval : using the date parse functionality', function () {
        var dCallback = jasmine.createSpy('dateCallback');
        setInterval(dCallback, 4000);

        // passing in 5 minutes 56 seconds
        clock.tick("05:56");
        expect(dCallback).toHaveBeenCalled();
        expect(dCallback.callCount).toBe(89);
    });

    it('Expect spy to to be called 21041 times in 4 second interval : using the date parse functionality', function () {
        var dCallback = jasmine.createSpy('dateCallback');
        setInterval(dCallback, 4000);

        // passing in 23 hours 22 minutes 45 seconds
        clock.tick("23:22:45");
        expect(dCallback).toHaveBeenCalled();
        expect(dCallback.callCount).toBe(21041);
    });

    it('Expect date parse functionality to throw exception when a invalid date format is entered', function () {
        var dCallback = jasmine.createSpy('dateCallback'),
            ticker = function () {
                // invalid time format
                clock.tick("23:22:45:00");
            };
        setInterval(dCallback, 4000);

        // passing in 23 hours 22 minutes 45 seconds
        expect(ticker).toThrow();

        expect(dCallback).not.toHaveBeenCalled();
        expect(dCallback.callCount).toBe(0);
    });

    it("throws for invalid minutes", function () {
        var dCallback = jasmine.createSpy('dateCallback');
        setInterval(dCallback, 10000);

        expect(function () {
            clock.tick("67:10");
        }).toThrow();

        expect(dCallback.callCount).toBe(0);
    });

    it("throws for invalid minutes", function () {
        var dCallback = jasmine.createSpy('dateCallback');
        setInterval(dCallback, 10000);

        expect(function () {
            clock.tick("67:10");
        }).toThrow();

        expect(dCallback.callCount).toBe(0);
    });

    it('Expect time to be zero', function () {
        datespy.clock.create(0); // reset clock to the beginning of time
        expect(new Date().getTime()).toBe(0);
    });

    it("Expects date epoch time to be 0 if string is empty", function () {
        clock.tick("");
        expect(new Date().getTime()).toBe(0);
    });

    it('Expect spy to not have been called when timeout is cleared', function () {
        var dCallback = jasmine.createSpy('dateCallback'),
            tId;
        tId = setTimeout(dCallback, 5000);
        clock.tick(4999);
        clearTimeout(tId);
        expect(dCallback.callCount).toBe(0);
    });

    it('Expect clock to be reset', function () {
        var dCallback = jasmine.createSpy('dateCallback');
        setTimeout(dCallback, 5000);
        clock.tick(4999);
        clock.reset();
        clock.tick(5000);
        expect(dCallback.callCount).toBe(0);
    });

    it('Expect function as string to be evaluated', function () {
        expect(function () {
            setTimeout('kool', 4000);
            clock.tick(4000);
        }).toThrow();
    });

    it("creates regular date when passing timestamp", function () {
        var date = new Date(),
            fakeDate = new datespy.clock.Date(date.getTime());
        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("returns regular date when calling with timestamp", function () {
        var date = new Date(),
            fakeDate = datespy.clock.Date(date.getTime());

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("creates regular date when passing year, month", function () {
        var date = new Date(2010, 4),
            fakeDate = new datespy.clock.Date(2010, 4);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("returns regular date when calling with year, month", function () {
        var date = new Date(2010, 4),
            fakeDate = datespy.clock.Date(2010, 4);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("creates regular date when passing y, m, d", function () {
        var date = new Date(2010, 4, 2),
            fakeDate = new datespy.clock.Date(2010, 4, 2);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("returns regular date when calling with y, m, d", function () {
        var date = new Date(2010, 4, 2),
            fakeDate = datespy.clock.Date(2010, 4, 2);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("creates regular date when passing y, m, d, h", function () {
        var date = new Date(2010, 4, 2, 12),
            fakeDate = new datespy.clock.Date(2010, 4, 2, 12);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("returns regular date when calling with y, m, d, h", function () {
        var date = new Date(2010, 4, 2, 12),
            fakeDate = datespy.clock.Date(2010, 4, 2, 12);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("creates regular date when passing y, m, d, h, m", function () {
        var date = new Date(2010, 4, 2, 12, 42),
            fakeDate = new datespy.clock.Date(2010, 4, 2, 12, 42);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("returns regular date when calling with y, m, d, h, m", function () {
        var date = new Date(2010, 4, 2, 12, 42),
            fakeDate = datespy.clock.Date(2010, 4, 2, 12, 42);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("creates regular date when passing y, m, d, h, m, s", function () {
        var date = new Date(2010, 4, 2, 12, 42, 53),
            fakeDate = new datespy.clock.Date(2010, 4, 2, 12, 42, 53);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("returns regular date when calling with y, m, d, h, m, s", function () {
        var date = new Date(2010, 4, 2, 12, 42, 53),
            fakeDate = new datespy.clock.Date(2010, 4, 2, 12, 42, 53);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("creates regular date when passing y, m, d, h, m, s, ms", function () {
        var date = new Date(2010, 4, 2, 12, 42, 53, 498),
            fakeDate = new datespy.clock.Date(2010, 4, 2, 12, 42, 53, 498);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });

    it("returns regular date when calling with y, m, d, h, m, s, ms", function () {
        var date = new Date(2010, 4, 2, 12, 42, 53, 498),
            fakeDate = new datespy.clock.Date(2010, 4, 2, 12, 42, 53, 498);

        expect(fakeDate.getTime()).toBe(date.getTime());
    });
});