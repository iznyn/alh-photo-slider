//
// Facebook share
//
import $ from 'jquery';
import Config from './../Config';

class Facebook
{
    /**
     * Class constructor
     *
     * @return void
     */
    constructor( appId, settings = {} )
    {
        this._setSettings( settings );
        this.appId = appId;
        this.apiReady = false;
    }

    /**
     * Setup
     *
     * @return Facebook
     */
    setup()
    {
        if ( ! this.apiReady )
        {
            this.prepareLibs();
            this.loadScript();
            this.setupButton();
        }
        return this;
    }

    /**
     * Setup share button
     *
     * @return Facebook
     */
    setupButton()
    {
        let self = this;
        let buttonClass = this.config.get( 'buttonClass' );
        if ( $( buttonClass ).length > 0 )
        {
            let button = $( buttonClass );
            button.click( function()
            {
                if ( self.checkAuth() )
                {
                    let link = self.getShareLink( button );
                    FB.ui({
                        method: 'share',
                        href: link
                    }, function(response)
                    {
                        self.afterShare( response );
                    });
                }

                return false;
            });
        }
    }

    /**
     * Get share link
     *
     * @param object button
     * @return void
     */
    getShareLink( button )
    {
        let linkCallback = this.config.get( 'getLinkShare' );
        if ( linkCallback ) {
            return linkCallback( button );
        }
        return '#';
    }

    /**
     * Check auth
     *
     * @return void
     */
    checkAuth()
    {
        let authCallback = this.config.get( 'checkAuth' );
        if ( authCallback ) {
            return authCallback();
        } else {
            return true;
        }
    }

    /**
     * After share callback
     *
     * @param object response
     * @return void
     */
    afterShare( response )
    {
        let callback = this.config.get( 'afterShare' );
        if ( callback ) {
            callback( response );
        }
    }

    /**
     * Preparing library
     *
     * @return void
     */
    prepareLibs()
    {
        let self = this;
        window.fbAsyncInit = function() {
            FB.init({
                appId            : self.appId,
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v2.10'
            });
            FB.AppEvents.logPageView();
         };
    }

    /**
     * Load script
     *
     * @return void
     */
    loadScript()
    {
        let self = this;
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&appId="+self.appId;
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        this.apiReady = true;
    }

    /**
     * Set settings
     *
     * @param array settings
     * @return Facebook
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
            'buttonClass': '.fb--share',
            'getLinkShare': false,
            'afterShare': false
        };
        return settings;
    }
};

export default Facebook;
