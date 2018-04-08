/**
 * Youtube Script
 *
 */
import $ from 'jquery';
import 'jquery.transit';
import Youtube from './../Youtube';
import Modal from './../../Ui/Modal';

class YoutubePopup extends Youtube
{
    /**
     * Setup
     *
     * @return void
     */
    setup()
    {
        let self = this;

        //prepare modal
        this.modal = new Modal({
            afterClose: function( targetId, closeBtn )
            {
                self.closePopup( targetId, closeBtn );
            }
        }).setup();
        this.container = this.config.get( 'containerClass' );
        this.popup = $( this.config.get( 'popupClass' ) );
        this.video = $( this.config.get( 'videoClass' ), this.popup );

        if ( this.popup.length > 0 )
        {
            //Get popup id
            this.popupId = this.popup.attr( 'data-modal-id' );

            super.setup();
        }
    }

    /**
     * Prepare libraries
     */
    prepareLibs()
    {
        let self = this;
        window.onYouTubeIframeAPIReady = function()
        {
            self.setupPopup();
            self.setupTrigger();
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
            self.setupVideoSize();
        });
    }

    /**
     * Setup video
     *
     * @return void
     */
    setupVideoSize()
    {
        let videoSize = this.getVideoSize();
        this.video.width( videoSize.width );
        this.video.height( videoSize.height );
    }

    /**
     * Setup popup video
     *
     * @return void
     */
    setupPopup()
    {
        let firstVideo = this.getFirstVideoSlide();
        if ( firstVideo ) {
            this.prepareVideoPlayer( firstVideo );
        }
    }

    /**
     * Setup trigger
     *
     * @return void
     */
    setupTrigger()
    {
        let self = this;
        $( this.config.get( 'itemClass' ) ).each( function()
        {
            self.setupTriggerButton( $(this) );
        });
    }

    /**
     * Setup trigger
     *
     * @param object button
     * @return void
     */
    setupTriggerButton( button )
    {
        let self = this;
        let container = button.parents( this.config.get('containerClass') );

        let classPlay = this.config.get( 'playClass' );
        if ( $( classPlay, container ).length > 0 )
        {
            $( classPlay, container ).click( function()
            {
                self.playVideo( container );
                return false;
            });
        }
    }

    /**
     * Close video popup
     *
     * @param object container
     * @return string
     */
    closePopup( targetId, closeBtn )
    {
        if ( targetId == this.popupId )
        {
            let videoId = this.popup.attr( 'data-video-id' );
            let itemClass = this.config.get('itemClass');
            let videoEl = $( itemClass + '[data-video-id='+videoId+']');
            if ( videoEl.length > 0 )
            {
                let container = videoEl.parents( this.config.get('containerClass') );
                this.stopVideo( container );
            }
        }
    }

    /**
     * Play video
     *
     * @param object container
     * @return string
     */
    playVideo( container )
    {
        //get video id
        let videoEl = $( this.config.get( 'itemClass' ), container );
        let videoId = videoEl.attr( 'data-video-id' );
        if ( typeof videoId != 'undefined' )
        {
            let currentId = this.popup.attr( 'data-video-id' );
            if ( currentId != videoId )
            {
                this.player.loadVideoById(videoId, 0, "default");
                this.popup.attr( 'data-video-id', videoId );
            }
        }

        container.addClass( '_onplay' );
        this.player.playVideo();

        this.modal.show( this.popupId );

        let playCallback = this.config.get( 'afterPlay' );
        if ( playCallback ) {
            playCallback( this, container );
        }
    }

    /**
     * Stop video
     *
     * @param object container
     * @return string
     */
    stopVideo( container )
    {
        container.removeClass( '_onplay' );
        this.player.stopVideo();

        this.modal.hide( this.popupId );

        let stopCallback = this.config.get( 'afterStop' );
        if ( stopCallback ) {
            stopCallback( this, container );
        }
    }

    /**
     * Setup video
     *
     * @param object firstVideo
     * @return void
     */
    prepareVideoPlayer( firstVideo )
    {
        let self = this;
        let videoEl = this.video;
        let videoId = firstVideo.attr( 'data-video-id' );
        let videoSize = this.getVideoSize();

        videoEl.width( videoSize.width );
        videoEl.height( videoSize.height );

        let player = new YT.Player( videoEl.get(0), {
            height: videoSize.height,
            width: videoSize.width,
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
        this.player = player;

        return player;
    }

    /**
     * Get first video slide
     *
     * @return object
     */
    getFirstVideoSlide()
    {
        let slideClass = this.config.get( 'itemClass' );
        let firstSlide = false;
        if ( $( slideClass ).length > 0 ) {
            firstSlide = $( slideClass ).get(0);
            firstSlide = $( firstSlide );
        }
        return firstSlide;
    }

    /**
     * Get video size
     *
     * @return object
     */
    getVideoSize()
    {
        let winWidth = $(window).width();
        let widthPercent = 1;

        if ( winWidth > 1920 ) {
            widthPercent = 0.5;
        }
        else if ( winWidth > 1440 ) {
            widthPercent = 0.6;
        }
        else if ( winWidth > 960 ) {
            widthPercent = 0.65;
        }
        else if ( winWidth > 760 ) {
            widthPercent = 0.7;
        }
        else {
            widthPercent = 0.9;
        }
        let width = widthPercent * winWidth;
        let height = Math.ceil(width / this.config.get( 'ratio' ));
        height -= 2;

        return {
            "width": width,
            "height": height
        }
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
            this.modal.hide( this.popupId );
        }
    }

    /**
     * Get default settings
     *
     * @return object
     */
    _getDefaultSettings()
    {
        let settings = {
            containerClass: '.video__youtube--wrapper',
            itemClass: '.video__youtube',
            coverClass: '.video__youtube--cover',
            playClass: '.video__youtube--play',
            popupClass: '.video__youtube--popup',
            videoClass: '._popup--video',
            ratio: 16/9
        };

        return settings;
    }
}

export default YoutubePopup;
