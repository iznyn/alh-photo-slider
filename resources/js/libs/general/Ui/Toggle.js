//
// UI helper
//
import $ from 'jquery';
import 'jquery.transit';
import Config from './../Config';

class Toggle
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

        this.onMenu = false;
    }

    /**
     * Setup toggle
     *
     * @return void
     */
    setup()
    {
        //prepare
        this.prepare();

        //trigger event
        this.trigger();

        //close outside
        this.closeOutside();
    }

    /**
     * Prepare toggle
     *
     * @return void
     */
    prepare()
    {
        //get container
        this.containerId = this.config.get( 'containerClass' );
        this.container = new $( this.containerId );
    }

    /**
     * Open event handler
     *
     * @return void
     */
    trigger()
    {
        let self = this;
        let container = this.container;
        let trigger = $( this.config.get( 'triggerClass' ), container );

        if ( trigger.length > 0 )
        {
            trigger.click( function()
            {
                if ( self.checkToggleProcess() )
                {
                    //check class
                    if ( container.hasClass( '_shown' ) ) {
                        self.close( $(this) );
                    }
                    else {
                        self.open( $(this) );
                    }
                }

                return false;
            });
        }
    }

    /**
     * Check process
     *
     * @return void
     */
    checkToggleProcess()
    {
        if ( this.container.hasClass( '_disable' ) ) {
            return false;
        }
        if ( this.container.hasClass( '_on-process' ) ) {
            return false;
        }
        if ( $('body').hasClass( '_on-process' ) ) {
            return false;
        }
        return true;
    }

    /**
     * Close when click on outside menu
     *
     * @return void
     */
    closeOutside()
    {
        let self = this;

        //check when hover in container
        this.container.hover(function(){
            self.onMenu = true;
        }, function(){
            self.onMenu = false;
        });

        //body click
        $( 'body' ).click( function()
        {
            if ( ! self.onMenu ) {
                self.close();
            }
        });

    }

    /**
     * Open toggle
     *
     * @return void
     */
    open()
    {
        //just add/remove class
        this.container.removeClass( '_hidden' );
        this.container.addClass( '_shown' );
    }

    /**
     * Close toggle
     *
     * @return void
     */
    close()
    {
        //just add/remove class
        this.container.removeClass( '_shown' );
        this.container.addClass( '_hidden' );
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
            containerClass: '.ui__toggle',
            triggerClass: '._trigger',
            detailClass: '._section--detail',
            closeOnClickOutside: false
        };
        return settings;
    }

};

export default Toggle;
