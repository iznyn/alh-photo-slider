/**
 * Youku Script
 *
 */
import $ from 'jquery';
import 'jquery.transit';
import Config from './../Config';
import Youtube from './Youtube';

class Youku extends Youtube
{
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
                        .attr( 'id', 'video--'+ code )
                        .appendTo( videoEl );

        let width = container.width();
        let height = Math.ceil(width / this.config.get( 'ratio' ));
        height -= 2;

        videoEl.width( width );
        videoEl.height( height );
        videoEl.attr( 'data-container-height', container.height() );

        let player = new YKU.Player( 'video--'+ code,
        {
            client_id: '44503cca1be605b5',
            vid: videoId,
            height: height,
            width: width,
            controls: false,
            autoplay: false,
            show_related: true,
            events: {
                'onPlayerReady': function( event ){
                    self.onReady( event, player, videoEl );
                },
                'onPlayEnd': function( event ){
                    self.onPlayEnd( event, player, videoEl );
                }
            }
        });
        return player;
    }

    /**
     * On play end
     *
     * @param object event
     * @param object player
     * @param object videoEl
     * @return string
     */
    onPlayEnd( event, player, videoEl )
    {
        this.showCover( videoEl );
    }

    /**
     * Load script
     *
     * @return void
     */
    loadScript()
    {
        if ( ! document.querySelector( '#youku-api-script') )
        {
            let tag = document.createElement('script');
            tag.setAttribute( 'id', 'youku-api-script' );
            tag.src = "js/youkuapi.js";
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.apiReady = true;
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
            containerClass: '.banner--video-bg',
            itemClass: '.video__youku',
            coverClass: '.video__youku--cover',
            playClass: '.video__youku--play',
            ratio: 16/9
        };

        return settings;
    }
}

export default Youku;
