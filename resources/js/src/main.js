//
// Main JS
//
import HomeLib from "../libs/Home";

(function ($) {
    "use strict";

    $(document).ready(function ()
    {
        //Home script
        new HomeLib().init();
    });
})(jQuery);
