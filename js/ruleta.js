window.wheel = {

    cache: {},

    init: function () {
        console.log('controller init...');

        this.cache.wheel = $('.ruleta');
        this.cache.wheelSpinBtn = $('.btn-girar');

        this.cache.wheel;

        //mapping is backwards as wheel spins clockwise //1=win
        this.cache.wheelMapping = ['seguras', 'autenticas', 'independientes', 'libres', 'creativas'];

        //reset wheel
        this.resetSpin();

        //setup prize events
        //this.prizeEvents();
    },

    spin: function () {
        console.log('spinning wheel');

        var _this = this;

        // reset wheel
        this.resetSpin();

        //disable spin button while in progress
        this.cache.wheelSpinBtn.addClass('disabled');

        /*
            Wheel has 10 sections.
            Each section is 360/10 = 36deg.
        */
        var deg = 1500 + Math.round(Math.random() * 1500),
            duration = 6000; //optimal 6 secs

        _this.cache.wheelPos = deg;

        //transition queuing
        //ff bug with easeOutBack
        this.cache.wheel.transition({
            rotate: '0deg'
        }, 0)
            .transition({
            rotate: deg + 'deg'
        }, duration, 'easeOutCubic');

        //wheel finish
        setTimeout(function () {
            // did it win??!?!?!
            var spin = _this.cache.wheelPos,
                degrees = spin % 360;

            console.log('spin = ' + spin);
            console.log('degrees = ' + degrees);
            console.log('winfun = ' + _this.win(degrees));
            console.log('win = ' + _this.cache.wheelMapping[_this.win(degrees)]);

            //re-enable wheel spin
            _this.cache.wheelSpinBtn.removeClass('disabled');

        }, duration);

    },

    win: function(degrees) {
        if ((degrees >= 0 && degrees <= 38) || (degrees >= 328 && degrees <= 360)) {
            return 0;
        } else if (degrees >= 39 && degrees <= 111) {
            return 1;
        } else if (degrees >= 112 && degrees <= 183) {
            return 2;
        } else if (degrees >= 184 && degrees <= 255) {
            return 3;
        } else if (degrees >= 256 && degrees <= 327) {
            return 4;
        }
    },

    resetSpin: function () {
        this.cache.wheel.transition({
            rotate: '0deg'
        }, 0);
        this.cache.wheelPos = 0;
    }

}