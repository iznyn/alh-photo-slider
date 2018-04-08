/**
 * Youtube Script
 *
 */
import $ from 'jquery';
import 'jquery.transit';
import Config from './../Config';

class Youtube
{
    /**
     * Class constructor
     *
     * @param object settings
     * @return void
     */
    constructor( settings = {} )
    {
        //set settings
        this._setSettings( settings );

        this.videos = {};
        this.apiReady = false;
    }

    /**
     * Setup
     *
     * @return void
     */
    setup()
    {
        if ( ! this.apiReady )
        {
            this.prepareLibs();
            this.loadScript();
        }

        return this;
    }

    /**
     * Prepare libraries
     */
    prepareLibs()
    {
        let self = this;
        window.onYouTubeIframeAPIReady = function()
        {
            $( self.config.get( 'itemClass' ) ).each( function()
            {
                self.setupVideo( $(this) );
            });
        }

        //Resize
        this.resize();
    }

    /**
     * Resize
     *
     * @return void
     */
    resize()
    {
        let self = this;
        $(window).resize(function()
        {
            $( self.config.get( 'itemClass' ) ).each( function()
            {
                self.setupVideoSize( $(this) );
            });

        });
    }

    /**
     * Setup video
     *
     * @param object videoEl
     * @return void
     */
    setupVideoSize( videoEl )
    {
        let player = $( '._player', videoEl );
        let container = videoEl.parents( this.config.get('containerClass') );

        let width = container.width();
        let height = Math.ceil(width / this.config.get( 'ratio' ));
        height -= 2;

        player.width( width );
        player.height( height );
        videoEl.attr( 'data-container-height', container.height() );
    }

    /**
     * Setup video
     *
     * @param object videoEl
     * @return void
     */
    setupVideo( videoEl )
    {
        let videoId = videoEl.attr( 'data-video-id' );
        if ( typeof videoId != 'undefined' )
        {
            this.setupVideoPlayer( videoId, videoEl );
        }
    }

    /**
     * Setup video player
     *
     * @param string videoId
     * @param object videoEl
     * @return void
     */
    setupVideoPlayer( videoId, videoEl )
    {
        let code = this.getUniqueCode();
        videoEl.attr( 'data-code', code );

        let player = this.getPlayer( videoId, videoEl, code );

        this.videos[code] = player;

        //setup play button
        this.setupPlayButton( player, videoEl );

        //setup player trigger
        this.setupPlayerTrigger( player, videoEl );
    }

    /**
     * Get unique code
     *
     * @param string videoId
     * @param object videoEl
     * @param string code
     * @return string
     */
    getPlayer( videoId, videoEl, code )
    {
        let self = this;
        let container = videoEl.parents( this.config.get('containerClass') );
        let wrapper = $( '<div class="_player"></div>' )
                        .appendTo( videoEl );

        let width = container.width();
        let height = Math.ceil(width / this.config.get( 'ratio' ));
        height -= 2;

        videoEl.width( width );
        videoEl.height( height );
        videoEl.attr( 'data-container-height', container.height() );

        let player = new YT.Player( wrapper[0], {
            height: height,
            width: width,
            videoId: videoId,
            playerVars: {
                controls: 0,
                showinfo: 0,
                rel:0
            },
            events: {
                'onReady': function( event ){
                    self.onReady( event, player, videoEl );
                },
                'onStateChange': function( event ){
                    self.onStateChange( event, player, videoEl );
                }
            }
        });
        return player;
    }

    /**
     * Get unique code
     *
     * @return string
     */
    getUniqueCode()
    {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    /**
     * Setup play button
     *
     * @param object player
     * @param object videoEl
     * @return string
     */
    setupPlayButton( player, videoEl )
    {
        let self = this;
        let container = videoEl.parents( this.config.get('containerClass') );

        let classPlay = this.config.get( 'playClass' );
        if ( $( classPlay, container ).length > 0 )
        {
            $( classPlay, container ).click( function()
            {
                self.playVideo( player, videoEl );
                self.hideCover( videoEl );
                return false;
            });
        }
    }

    /**
     * Setup player trigger
     *
     * @param object player
     * @param object videoEl
     * @return string
     */
    setupPlayerTrigger( player, videoEl )
    {
        let self = this;
        videoEl.click( function()
        {
            if ( $(this).hasClass( '_playing' ) ) {
                self.stopVideo( player, videoEl );
                $(this).removeClass( '_playing' );
            } else {
                self.playVideo( player, videoEl );
                $(this).addClass( '_playing' );
            }
            return false;
        });
    }

    /**
     * Play video
     *
     * @param object player
     * @param object videoEl
     * @return string
     */
    playVideo( player, videoEl )
    {
        let container = videoEl.parents( this.config.get('containerClass') );
        container.addClass( '_onplay' );
        player.playVideo();
    }

    /**
     * Stop video
     *
     * @param object player
     * @param object videoEl
     * @return string
     */
    stopVideo( player, videoEl )
    {
        let container = videoEl.parents( this.config.get('containerClass') );
        container.removeClass( '_onplay' );
        player.stopVideo();
    }

    /**
     * On ready event
     *
     * @param object event
     * @param object player
     * @param object videoEl
     * @return string
     */
    onReady( event, player, videoEl )
    {
        let self = this;
        let autoplay = videoEl.attr( 'data-autoplay' );
        if ( typeof autoplay != 'undefined' && autoplay == 'true' )
        {
            this.hideCover( videoEl );
            self.playVideo( player, videoEl );
        }
    }

    /**
     * On state change event
     *
     * @param object state
     * @param object player
     * @param object videoEl
     * @return string
     */
    onStateChange( state, player, videoEl )
    {
        if (state.data === 0 ) {
            this.showCover( videoEl );
        }
    }

    /**
     * Show cover
     *
     * @return void
     */
    showCover( videoEl )
    {
        let container = videoEl.parents( this.config.get('containerClass') );
        let cover = $( this.config.get( 'coverClass' ), container );
        if ( cover.length > 0 )
        {
            cover.css({opacity:0});
            cover.show();
            cover.transition({
                opacity: 1,
                duration: 600,
                complete: function()
                {
                }
            });
        }

        container.transition({
            height: parseInt( videoEl.attr( 'data-container-height' ) ),
            duration: 400
        });

        container.removeClass( '_video-cover-hide' );
    }

    /**
     * Hide cover
     *
     * @return void
     */
    hideCover( videoEl )
    {
        let container = videoEl.parents( this.config.get('containerClass') );
        let cover = $( this.config.get( 'coverClass' ), container );
        if ( cover.length > 0 )
        {
            cover.transition({
                opacity: 0,
                duration: 600,
                complete: function()
                {
                    cover.hide();
                }
            });
        }

        container.transition({
            height: videoEl.height(),
            duration: 400
        });
        container.addClass( '_video-cover-hide' );
    }

    /**
     * Load script
     *
     * @return void
     */
    loadScript()
    {
        if ( ! document.querySelector( '#youtube-api-script') )
        {
            let tag = document.createElement('script');
            tag.setAttribute( 'id', 'youtube-api-script' );
            tag.src = "https://www.youtube.com/iframe_api";
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.apiReady = true;
        }
    }

    /**
     * Set settings
     *
     * @param array settings
     * @return Youtube
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
            containerClass: '.banner--video-bg',
            itemClass: '.video__youtube',
            coverClass: '.video__youtube--cover',
            playClass: '.video__youtube--play',
            ratio: 16/9
        };

        return settings;
    }
};

export default Youtube;
