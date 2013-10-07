/*jslint sub : true, newcap : true */
/*global describe, expect, it, beforeEach, afterEach, datespy, spyOn, jasmine, setTimeout, setInterval, clearTimeout, clearInterval, navigator:true */
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


describe('Test IE Support', function () {
    "use strict";
    var clock;

    beforeEach(function () {
        clock = datespy.useFakeTimers();
    });

    afterEach(function () {
        clock.restore();
    });

    it('Testing IE', function () {
        //     Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)
        var originalNavigator = null;
        if (!(/MSIE ([0-9]{1,}[\.0-9]{0,})/.test(navigator.userAgent))) {
            originalNavigator = navigator;
            navigator = {};
            navigator['__proto__'] = originalNavigator;
            navigator['__defineGetter__']('userAgent', function () { return 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)'; });
        }
        expect(navigator.userAgent).toBe('Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)');
        expect(setTimeout).toBeDefined();
        expect(clearTimeout).toBeDefined();
        expect(setInterval).toBeDefined();
        expect(clearInterval).toBeDefined();
        expect(Date).toBeDefined();

    });
});