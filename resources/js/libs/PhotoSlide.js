//
// Photo Slide lib
//
class PhotoSlide
{
    /**
     * Class constructor
     *
     * @return void
     */
    constructor()
    {
        this.container = $( '.photo-slide' );
        this.index = 1;
        this.count = 0;
        this.scenes = [];
    }

    /**
     * Init
     *
     * @return mixed
     */
    init()
    {
        this.scenes = $( '.photo-slide--scene', this.container );
        this.count = this.scenes.length;

        //setup slide
        this.setupSlide();

        //prepare slider
        this.prepareSlider();

        //responsive
        $(window).resize(()=>{
            this.setupSlide();
        })

        return this;
    }

    /**
     * Setup slide
     *
     * @return mixed
     */
    setupSlide()
    {
        this.winWidth = $(window).width();
        this.winHeight = $(window).height();

        this.scenes.each(( i, el ) =>
        {
            let scene = $(el);
            let index = i+1;
            scene.attr( 'data-index', index )
                 .width( this.winWidth )
                 .height( this.winHeight );
        });
    }

    /**
     * Prepare slider
     *
     * @return mixed
     */
    prepareSlider()
    {
        this.index = 1;
        this.scenes.hide();

        let first = $( '.photo-slide--scene:nth-child(1)', this.container );
        first.show()
             .addClass( '_active' )
             .addClass( '_scene--in' );

        //Hide loader add run first animation
        setTimeout(()=>{
            $( '.photo-slide--loader' ).addClass( '_hide' );

            setTimeout(()=>
            {
                $( '.photo-slide--loader' ).hide();
                first.addClass( '_anim--in' );

                this.goNext( first );
            },
            600);

        },1000);
    }

    /**
     * Next slider
     *
     * @return mixed
     */
    next()
    {
        let currentIndex = this.index;
        let nextIndex = currentIndex+1;

        if ( nextIndex > this.count ) {
            nextIndex = 1;
        }
        this.goto( nextIndex, currentIndex );
        this.index = nextIndex;
    }

    /**
     * Next slider
     *
     * @param object element
     * @return mixed
     */
    goNext( element )
    {
        let interval = this.getInterval( element );
        setTimeout(()=>{
            this.next();
        }, interval);
    }

    /**
     * Go to slider
     *
     * @param int targetIndex
     * @param int currentIndex
     * @return mixed
     */
    goto( targetIndex, currentIndex )
    {
        let current = $( '.photo-slide--scene:nth-child('+currentIndex+')', this.container );
        let target = $( '.photo-slide--scene:nth-child('+targetIndex+')', this.container );

        current.css( 'zIndex', 99 )
               .removeClass( '_anim--in' )
               .addClass( '_anim--out' );
        target.show();

        let currentDuration = this.getItemAnimationDuration( current );
        let targetDuration = this.getItemAnimationDuration( target );
        let slideDuration = this.getSlideDuration( target );
        targetDuration += 400;

        setTimeout(()=>
        {
            target.css( 'zIndex', 999 )
                  .removeClass( '_scene--out' )
                  .addClass( '_scene--in' );

            setTimeout(()=>
            {
                target.removeClass( '_anim--out' )
                      .addClass( '_anim--in' );

                //Previus scene out
                setTimeout(()=>
                {
                    current.removeClass( '_scene--in' )
                           .addClass( '_scene--out' )
                           .hide();

                },targetDuration);

                //Go next
                this.goNext( target );

            },slideDuration);

        },currentDuration);

    }

    /**
     * Get interval
     *
     * @param element
     * @return mixed
     */
    getInterval( element )
    {
        let interval = parseInt( element.attr( 'data-interval' ) );
        if ( typeof interval != 'undefined') {
            interval = 6000;
        }
        return interval;
    }

    /**
     * Get item animation duration
     *
     * @param element
     * @return mixed
     */
    getItemAnimationDuration( element )
    {
        let duration = 0;
        $( '._anim--item', element ).each((i,el)=>
        {
            let cd = parseFloat( $(el).css( 'transition-duration' ) );
            if ( cd > duration ) {
                duration = cd;
            }
        });
        duration *= 1000;
        return duration;
    }

    /**
     * Get slide duration
     *
     * @param element
     * @return mixed
     */
    getSlideDuration( element )
    {
        let duration = parseFloat( $(element).css( 'transition-duration' ) );
        duration *= 1000;
        return duration;
    }
};

export default PhotoSlide;
