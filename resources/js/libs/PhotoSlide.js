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
        this.mainContainer = $( '.photo-slide--main' );
        this.index = 1;
        this.count = 0;
        this.scenes = [];
        this.itemIndex = 1;
        this.iterationIndex = 0;
    }

    /**
     * Init
     *
     * @return mixed
     */
    init()
    {
        //Load slider
        this.loadSlides(() =>
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
        });

        return this;
    }

    /**
     * Load slide
     *
     * @return mixed
     */
    loadSlides(CB)
    {
        let self = this;
        let requestUrl = 'data/slides.json';

        $.ajax({
           url: requestUrl,
           type: 'GET',
           data: '',
           dataType: 'json',
           processData: false,
           contentType: false,
           error: function(){},
           success: function( data )
           {
               self.createSlides(data, CB);
           }
        });
    }

    /**
     * Create slides
     *
     * @param array data
     * @param object CB
     * @return mixed
     */
    createSlides(data, CB)
    {
        if (data.length > 0) {
            this.loadSlideItems(data, CB);
        }
    }

    /**
     * Create slides
     *
     * @param array data
     * @return mixed
     */
    loadSlideItems(data, CB)
    {
        let self = this;
        let index = this.iterationIndex;
        if (index >= data.length) {
            CB();
            return true;
        }
        let item = data[index];
        $.ajax({
           url: 'data/' + item.file,
           type: 'GET',
           data: '',
           dataType: 'json',
           processData: false,
           contentType: false,
           error: function(){},
           success: function(itemData)
           {
               self.iterationIndex++;
               self.createSlideItems(itemData);
               self.loadSlideItems(data, CB);
           }
        });
    }

    /**
     * Create slide items
     *
     * @param array items
     * @return mixed
     */
    createSlideItems(items)
    {
        if (items.length > 0)
        {
            for (var i = 0; i < items.length; i++)
            {
                this.createSlideItem(items[i]);
            }
        }
    }

    /**
     * Create slide item
     *
     * @param object data
     * @return mixed
     */
    createSlideItem(data)
    {
        let item = $('<div></div>')
            .addClass('photo-slide--scene')
            .addClass('photo-slide__scene-' + this.itemIndex)
            .attr('data-index', this.itemIndex)
            .attr('data-position', data.infoPosition)
            .attr('data-theme', data.infoTheme)
            .attr('data-animation', data.animation)
            .append(
                $('<div></div>')
                    .addClass('_scene--image')
                    .attr('style', "background-image:url('images/" + data.image + "')")
            )
            .append(
                $('<div></div>')
                    .addClass('_scene--info')
                    .append(
                        $('<h2></h2>')
                            .addClass('_info--title')
                            .addClass('_anim--item')
                            .text(data.title)
                    )
                    .append(
                        $('<div></div>')
                            .addClass('_info--desc')
                            .addClass('_anim--item')
                            .html(data.info_1)
                    )
            )
            .appendTo(this.mainContainer);

        this.itemIndex++;
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
        this.container.addClass( '_play' );

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
        let cnt = this.container;
        if ( cnt.hasClass( '_pause' ) || ! cnt.hasClass( '_play' ) ) {
            return true;
        }

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
