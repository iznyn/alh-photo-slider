//
// Photo Slide lib
//
import _C from "lodash/collection";

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
        this.defaultInterval = 5000;
        this.slideIntv = null;
        this.currentIntervalCode = null;
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
        let order = CONFIGSLIDERORDER;
        let config = CONFIGSLIDER;

        let dataSlider = [];
        for (var i = 0; i < order.length; i++) {
            let id = order[i];
            let slideConfig = _C.find(config, {id: id});
            if (slideConfig) {
                dataSlider.push(slideConfig);
            }
        }
        this.createSlideItems(dataSlider);
        CB();
    }

    /**
     * Load slide
     *
     * @return mixed
     */
    __loadSlides(CB)
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
        let interval = this.defaultInterval;
        if (typeof data.interval !== 'undefined') {
            interval = parseInt(data.interval);
        }
        let item = $('<div></div>')
            .addClass('photo-slide--scene')
            .addClass('photo-slide__scene-' + this.itemIndex)
            .attr('data-id', data.id)
            .attr('data-index', this.itemIndex)
            .attr('data-position', data.infoPosition)
            .attr('data-theme', data.infoTheme)
            .attr('data-animation', data.animation)
            .attr('data-interval', data.interval)
            .append(
                $('<div></div>')
                    .addClass('_scene--image')
                    .append(
                        $('<img/>')
                            .attr('src', 'images/' + data.image)
                    )
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
     * go to an index slide
     *
     * @return mixed
     */
    dir(id)
    {
        let element = $( '.photo-slide--scene[data-id="' + id + '"]');
        if (element.length > 0)
        {
            let index = parseInt(element.attr('data-index'));
            let currentIndex = this.index;
            if (index == currentIndex) {
                return true;
            }
            clearInterval(this.slideIntv);
            this.container.attr('data-status', 'dir');
            this.goto( index, currentIndex );
            this.index = index;
        }
    }

    /**
     * go to an prev slide
     *
     * @return mixed
     */
    dirPrev()
    {
        let currentIndex = this.index;
        let prevIndex = currentIndex-1;
        if (prevIndex < 1) {
            prevIndex = this.count;
        }

        clearInterval(this.slideIntv);
        this.container.attr('data-status', 'dir');
        this.goto(prevIndex, currentIndex);
        this.index = prevIndex;
    }

    /**
     * go to an next slide
     *
     * @return mixed
     */
    dirNext()
    {
        let currentIndex = this.index;
        let nextIndex = currentIndex+1;
        if (nextIndex > this.count) {
            nextIndex = 1;
        }

        clearInterval(this.slideIntv);
        this.container.attr('data-status', 'dir');
        this.goto(nextIndex, currentIndex);
        this.index = nextIndex;
    }

    /**
     * go to an first slide
     *
     * @return mixed
     */
    dirFirst()
    {
        let currentIndex = this.index;
        let nextIndex = 1;
        clearInterval(this.slideIntv);
        this.container.attr('data-status', 'dir');
        this.goto(nextIndex, currentIndex);
        this.index = nextIndex;
    }

    /**
     * go to an last slide
     *
     * @return mixed
     */
    dirLast()
    {
        let currentIndex = this.index;
        let nextIndex = this.count;
        clearInterval(this.slideIntv);
        this.container.attr('data-status', 'dir');
        this.goto(nextIndex, currentIndex);
        this.index = nextIndex;
    }

    /**
     * Next slider
     *
     * @return mixed
     */
    next(code = false)
    {
        let currentIndex = this.index;
        let nextIndex = currentIndex+1;

        if ( nextIndex > this.count ) {
            nextIndex = 1;
        }
        this.goto( nextIndex, currentIndex, code );
        this.index = nextIndex;
    }

    /**
     * Resume slider
     *
     * @return mixed
     */
    resume()
    {
        this.next();
    }

    /**
     * Next slider
     *
     * @param object element
     * @return mixed
     */
    goNext( element, code = false )
    {
        if (! code) {
            code = this.makeid();
            this.currentIntervalCode = code;
        }
        let cnt = this.container;
        let interval = this.getInterval( element );
        this.slideIntv = setTimeout(() =>
        {
            let validCode = true;
            if (code && this.currentIntervalCode) {
                if (code != this.currentIntervalCode) {
                    validCode = false;
                }
            }
            if ( validCode && ! cnt.hasClass( '_pause' ) && cnt.hasClass( '_play' ) ) {
                this.next(code);
            }

        }, interval);
    }

    /**
     * Go to slider
     *
     * @param int targetIndex
     * @param int currentIndex
     * @return mixed
     */
    goto( targetIndex, currentIndex, code = false )
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
                this.goNext( target, code );

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
        let interval = this.defaultInterval;
        if ( typeof element.attr('data-interval') != 'undefined') {
            interval = parseInt( element.attr('data-interval') );
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

    /**
     * Get slide duration
     *
     * @param element
     * @return mixed
     */
    makeid ()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
};

export default PhotoSlide;
