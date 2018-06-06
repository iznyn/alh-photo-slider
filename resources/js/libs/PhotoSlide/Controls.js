//
// Controls lib
//
class Controls
{
    /**
     * Class constructor
     *
     * @param object slide
     * @return void
     */
    constructor(slide)
    {
        this.slide = slide;
        this.container = $('.photo-slide__nav ._nav--control');
    }

    /**
     * Init
     *
     * @return mixed
     */
    init()
    {
        this.menu();
        this.first();
        this.last();
        this.next();
        this.prev();
        this.play();
        this.stop();
    }

    /**
     * Open/close menu
     *
     * @return mixed
     */
    menu()
    {
        $('._trigger', this.container).click((e) =>
        {
            this.container.addClass('_open');
            return false;
        });

        $('._menus ._close', this.container).click((e) =>
        {
            this.container.removeClass('_open');
            return false;
        });
    }

    /**
     * Menu go to first slide
     *
     * @return mixed
     */
    first()
    {
        $('._menu--first', this.container).click((e) =>
        {
            this.slide.dirFirst();
            return false;
        });
    }

    /**
     * Menu go to last slide
     *
     * @return mixed
     */
    last()
    {
        $('._menu--last', this.container).click((e) =>
        {
            this.slide.dirLast();
            return false;
        });
    }

    /**
     * Menu go to prev slide
     *
     * @return mixed
     */
    prev()
    {
        $('._menu--prev', this.container).click((e) =>
        {
            this.slide.dirPrev();
            return false;
        });
    }

    /**
     * Menu go to next slide
     *
     * @return mixed
     */
    next()
    {
        $('._menu--next', this.container).click((e) =>
        {
            this.slide.dirNext();
            return false;
        });
    }

    /**
     * Menu go to play slide
     *
     * @return mixed
     */
    play()
    {
        $('._menu--play', this.container).click((e) =>
        {
            $('.photo-slide').attr('data-status', 'play');
            $('.photo-slide').addClass('_play');
            $('.photo-slide').removeClass('_pause');

            this.slide.resume();

            return false;
        });
    }

    /**
     * Menu go to play slide
     *
     * @return mixed
     */
    stop()
    {
        $('._menu--stop', this.container).click((e) =>
        {
            $('.photo-slide').attr('data-status', 'stop');
            $('.photo-slide').addClass('_pause');
            $('.photo-slide').removeClass('_play');
            return false;
        });
    }
};

export default Controls;
