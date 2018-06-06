//
// Main JS
//
import HomeLib from "../libs/Home";
import PhotoSlideLib from "../libs/PhotoSlide";
import ControlsLib from "../libs/PhotoSlide/Controls";
import MenusLib from "../libs/PhotoSlide/Menus";

(function ($) {
    "use strict";

    $(document).ready(function ()
    {
        //Home script
        new HomeLib().init();
        //PhotoSlide script
        let slide = new PhotoSlideLib().init();
        //Controls script
        new ControlsLib(slide).init();
        //Menus script
        new MenusLib(slide).init();
    });
})(jQuery);
