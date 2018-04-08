//
// Main JS
//
import HomeLib from "../libs/Home";
import PhotoSlideLib from "../libs/PhotoSlide";

(function ($) {
    "use strict";

    $(document).ready(function ()
    {
        //Home script
        new HomeLib().init();
        //PhotoSlide script
        new PhotoSlideLib().init();
    });
})(jQuery);
