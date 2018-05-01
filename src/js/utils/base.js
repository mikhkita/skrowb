module.exports = function() {
/***/
/* module start */
/***/

    (function() {
        /**
         * userAgent
         *
         * @date 2014-09-03
         */
        var ua = navigator.userAgent.toLowerCase();
        $.ua = {
            // Windows
            isWindows: /windows/.test(ua),
            // Mac
            isMac: /macintosh/.test(ua),
            // IE
            isIE: /msie (\d+)|trident/.test(ua),
            // IE8
            isLtIE8: /msie (\d+)/.test(ua) && RegExp.$1 < 8,
            // IE9
            isLtIE9: /msie (\d+)/.test(ua) && RegExp.$1 < 9,
            // IE10
            isLtIE10: /msie (\d+)/.test(ua) && RegExp.$1 < 10,
            // Firefox
            isFirefox: /firefox/.test(ua),
            // WebKit
            isWebKit: /applewebkit/.test(ua),
            // Chrome
            isChrome: /chrome/.test(ua),
            // Safari
            isSafari: /safari/.test(ua)&&(!/chrome/.test(ua))&&(!/mobile/.test(ua)),
            // iOS
            isIOS: /i(phone|pod|pad)/.test(ua),
            // iPhone、iPod touch
            isIPhone: /i(phone|pod)/.test(ua),
            // iPad
            isIPad: /ipad/.test(ua),
            // Android
            isAndroid: /android/.test(ua),
            // モバイル版Android
            isAndroidMobile: /android(.+)?mobile/.test(ua),
            //
            isTouchDevice: 'ontouchstart' in window,
            //
            isMobile: /i(phone|pod)/.test(ua)||/android(.+)?mobile/.test(ua),
            //
            isTablet: /ipad/.test(ua)||/android(.+)(?!mobile)/.test(ua)
        };


        /**
         *
         * @date 2012-09-12
         *
         * @example $.preLoadImages('/img/01.jpg');
         */
        var cache = [];
        $.preLoadImages = function() {
            var args_len = arguments.length;
            for (var i = args_len; i--;) {
                var cacheImage = document.createElement('img');
                cacheImage.src = arguments[i];
                cache.push(cacheImage);
            }
        };
    })(jQuery);


/***/
/* module end */
/***/
};