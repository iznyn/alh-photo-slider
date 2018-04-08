//
// Video section
//
import $ from 'jquery';
import Config from './../Config';
import 'jquery.transit';

class VideoSection
{
    /**
     * Class constructor
     *
     * @return void
     */
    constructor( settings = {} )
    {
        //set settings
        this._setSettings( settings );

        //get container
        this.containerId = this.config.get( 'containerClass' );
        this.container = new $( this.containerId );
    }

    /**
     * Building widget search
     *
     * @return void
     */
    build()
    {
        //prepare
        this.prepare();

        //autoplay
        this.autoplay();

        //trigger play
        this.trigger();

        //video controls
        this.controls();

        //video end
        this.ended();
    }

    /**
     * Prepare video
     *
     * @return void
     */
    prepare()
    {
        let container = this.container;
        container.addClass( '_initialized' );

        //prepare video
        this.video = false;
        let videoCont = $( this.config.get( 'videoClass' ), container );
        if ( videoCont.length > 0 )
        {
            let video = $( 'video', videoCont ).get(0);
            this.video = video;
        }

        //resize
        this.resize();
        $(window).resize( (e) => {
            this.resize();
        });
    }

    /**
     * Resize video
     *
     * @return void
     */
    resize()
    {
        let winWidth = $(window).width();
        let vidHeight = this.defaultVideoHeight/this.defaultViewportWidth * winWidth;

        this.container.width( winWidth );
        this.container.height( vidHeight );
    }

    /**
     * Autoplay video
     *
     * @return void
     */
    autoplay()
    {
        if ( this.video )
        {
            this.video.addEventListener('loadeddata', (e) =>
            {
                this.playing();
            });
        }
    }

    /**
     * Playing video
     *
     * @return void
     */
    trigger()
    {
        let trigger = $( this.config.get( 'triggerClass' ), this.container );
        if ( trigger.length > 0 )
        {
            trigger.click( (e) => {

                if ( this.video )
                {
                    this.playing( trigger );
                }
                return false;
            });
        }
    }

    /**
     * Playing video
     *
     * @return void
     */
    playing()
    {
        this.beforePlay();

        //play video
        this.video.play();
    }

    /**
     * Stoping video
     *
     * @return void
     */
    stoping()
    {
        //remove class from container
        this.container.removeClass( '_video--playing' );

        //show content
        let contentClass = this.config.get( 'contentClass' );
        let posterClass = this.config.get( 'posterClass' );

        let poster = $( posterClass, this.container );
        if ( poster.length > 0 )
        {
            this.posterShow( poster );
        }

        let content = $( contentClass, this.container );
        if ( content.length > 0 )
        {
            this.contentShow( content );
        }
    }

    /**
     * Before playing video
     *
     * @return void
     */
    beforePlay()
    {
        //add class to container
        this.container.addClass( '_video--playing' );

        //hide content
        let contentClass = this.config.get( 'contentClass' );
        let posterClass = this.config.get( 'posterClass' );

        let poster = $( posterClass, this.container );
        if ( poster.length > 0 )
        {
            this.posterHide( poster );
        }

        let content = $( contentClass, this.container );
        if ( content.length > 0 )
        {
            this.contentHide( content );
        }
    }

    /**
     * Poster show animation
     *
     * @param object poster
     * @return void
     */
    posterShow( poster )
    {
        poster.css({opacity:0});
        poster.show();
        poster.transition({
            opacity: 1,
            duration: 800
        });
    }

    /**
     * Poster hide animation
     *
     * @param object poster
     * @return void
     */
    posterHide( poster )
    {
        poster.transition({
            opacity: 0,
            duration: 800,
            complete: function(){
                poster.hide();
            }
        });
    }

    /**
     * Content show animation
     *
     * @param object content
     * @return void
     */
    contentShow( content )
    {
        content.css({opacity:0});
        content.show();
        content.transition({
            opacity: 1,
            duration: 800
        });
    }

    /**
     * Content hide animation
     *
     * @param object content
     * @return void
     */
    contentHide( content )
    {
        content.transition({
            opacity: 0,
            duration: 800,
            complete: function(){
                content.hide();
            }
        });
    }

    /**
     * Main video controls
     *
     * @return void
     */
    controls()
    {
        let videoCont = $( this.config.get( 'videoClass' ), this.container );
        if ( videoCont.length > 0 )
        {
            videoCont.click( (e) => {

                let container = this.container;
                if ( container.hasClass( '_video--playing' ))
                {
                    container.removeClass( '_video--playing' );
                    container.addClass( '_video--pause' );

                    if ( this.video ) {
                        this.video.pause();
                    }
                }
                else if ( container.hasClass( '_video--pause' ))
                {
                    container.addClass( '_video--playing' );
                    container.removeClass( '_video--pause' );

                    if ( this.video ) {
                        this.video.play();
                    }
                    return false;
                }
            });
        }
    }

    /**
     * End video handler
     *
     * @return void
     */
    ended()
    {
        if ( this.video )
        {
            this.video.addEventListener('ended', () => {
                this.stoping();
            });
        }
    }

    /**
     * Set settings
     *
     * @param array settings
     * @return Uploader
     */
    _setSettings( settings )
    {
        let defaultSettings = this._getDefaultSettings();
        this.config = new Config( defaultSettings, settings );
        return this;
    }

    /**
     * Get default settings
     *
     * @return object
     */
    _getDefaultSettings()
    {
        let settings = {
            defaultViewportWidth: 1440,
            defaultVideoHeight: 500,
            containerClass: '.video__section',
            triggerClass: '._trigger',
            videoClass: '._video',
            posterClass: '._poster',
            contentClass: '._content',
            autoplay: false
        };
        return settings;
    }
};

export default VideoSection;
