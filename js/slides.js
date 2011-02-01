(function ($) {
    $.fn.slides = function (options) {
        $.extend($.fn.slides.settings, $.fn.slides.defaults, options);

        return this.each(function () {
            $.fn.slides.init(this);
        });
    };

    $.fn.slides.settings = {},
    $.fn.slides.slides = [];
    $.fn.slides.current = 0;

    $.fn.slides.defaults = {
        duration: 0,
        help: true,
        bindings: {
            37: "prev", // left
            38: "prev", // up
            75: "prev", // k
            39: "next", // right
            40: "next", // down
            74: "next", // j
            32: "next", // space
        },
    };

    $.fn.slides.init = function (element) {
        $.fn.slides.root = root = $(element);
        $.fn.slides.header = header = root.find("> header");
        $.fn.slides.footer = footer = root.find("> footer");
        var slides = $.fn.slides.slides;

        /* Hide header, footer and (slides > 1). */
        root.addClass("slides").children("section").each(function () {
            slides.push($(this));
        });
        $.each(slides.slice(1), function () {
            $(this).hide();
        });
        $.fn.slides.gotohash();

        $(document).keydown(function (event) {
            var key = (event.keyCode ? event.keyCode : event.which);
            var fnname = $.fn.slides.settings.bindings[key],
                fn = $.fn.slides[fnname];
            if (fn) {
                fn();
                return false;
            };
        });

        if ("hashchange" in $(window)) {
            $(window).hashchange(function () {
                $.fn.slides.gotohash();
            });
        };

        $.fn.slides.help();
    };

    $.fn.slides.goto = function (index) {
        var slides = $.fn.slides.slides,
            current = $.fn.slides.current,
            settings = $.fn.slides.settings;
        if (index >= slides.length || index < 0 || (index > 1 && index == current))
            return;
        $.fn.slides.hide(slides[current]);
        $.fn.slides.show(slides[index]);
        $.fn.slides.current = index;
        location.hash = "#slide" + (index + 1);
    };

    $.fn.slides.next = function () {
        $.fn.slides.goto($.fn.slides.current + 1);
    }

    $.fn.slides.prev = function () {
        $.fn.slides.goto($.fn.slides.current - 1);
    }

    $.fn.slides.show = function (slide) {
        slide.show($.fn.slides.settings.duration);
    };

    $.fn.slides.hide = function (slide) {
        slide.hide($.fn.slides.settings.duration);
    };

    $.fn.slides.gotohash = function (hash) {
        var hash = hash;
        if (typeof hash == "undefined")
            hash = location.hash || "#slide1";
        var slide = hash.replace(/^#slide/, "");
        $.fn.slides.goto(parseInt(slide, 10) - 1);
    };

    $.fn.slides.help = function () {
        if (! $.fn.slides.settings.help)
            return;
        $('<p id="slides-help" class="flash">' + 
                "This webpage is a presentation: use <kbd>↑</kbd>, <kbd>←</kbd>, <kbd>k</kbd> or <kbd>space</kbd> to go forward " + 
                "and <kbd>↓</kbd>, <kbd>→</kbd>, or <kbd>j</kbd> to go backwards." + 
                "</p>")
            .appendTo("body")
            .fadeOut(10000);
    };
})(jQuery);
