//
// UI helper
//
import $ from 'jquery';
import 'jquery.transit';
import Config from './../../Config';
import Dropdown from './Dropdown';

class Mobile
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
    }

    /**
     * Setup toggle
     *
     * @return void
     */
    setup()
    {
        //get main && trigger
        this.button = $( this.config.get( 'triggerClass' ) );
        this.main = $( this.config.get( 'mainClass' ) );

        if ( this.button.length > 0 && this.main.length > 0 )
        {
            //prepare
            this.prepare();

            //trigger event
            this.trigger();
        }
    }

    /**
     * Prepare toggle
     *
     * @return void
     */
    prepare()
    {
        //dropdown
        this.prepareDropdown();

        //prepare main
        this.prepareMain();

        //ready prepare
        this.main.addClass( '_initialized' );
    }

    /**
     * Prepare dropdown
     *
     * @return void
     */
    prepareDropdown()
    {
        let ddclass = this.config.get( 'mainClass' );
        ddclass += ' ';
        ddclass += this.config.get( 'dropdownClass' );

        this.main.show();

        new Dropdown({
            containerClass: ddclass
        }).setup();

        this.main.hide();
    }

    /**
     * Prepare main
     *
     * @return void
     */
    prepareMain()
    {
        let self = this;
        let main = this.main;
        let direction = this.config.get( 'direction' );

        if ( direction == 'left' ) {
            main.css({x: '110%'});
        } else {
            main.css({x: '-110%'});
        }
    }

    /**
     * Menu click event handler
     *
     * @return void
     */
    trigger()
    {
        //Open
        this.triggerOpen();
        //Close
        this.triggerClose();
    }

    /**
     * Menu open event handler
     *
     * @return void
     */
    triggerOpen()
    {
        let self = this;
        this.button.click( function()
        {
            if ( self.main.hasClass( 'shown' )) {
                self.close();
            } else {
                self.open();
            }
            return false;
        });
    }

    /**
     * Menu close event handler
     *
     * @return void
     */
    triggerClose()
    {
        let self = this;
        let closeButton = $( this.config.get( 'closeClass'), this.main );
        if ( closeButton.length > 0 )
        {
            closeButton.click( function()
            {
                self.close();
                return false;
            });
        }
    }


    /**
     * Open nav main
     *
     * @return void
     */
    open()
    {
        //add & remove class
        this.button.addClass( '_active' );
        this.main.removeClass( '_hide' );
        this.main.removeClass( '_hidden' );
        this.main.addClass( '_showing' );

        //animation
        this.openAnimation();
    }

    /**
     * Close nav main
     *
     * @return void
     */
    close()
    {
        //add & remove class
        this.button.removeClass( '_active' );
        this.main.removeClass( '_showing' );
        this.main.removeClass( '_shown' );
        this.main.addClass( '_hide' );

        //animation
        this.closeAnimation();
    }

    /**
     * Open animation
     *
     * @return void
     */
    openAnimation()
    {
        let self = this;
        let duration = this.config.get( 'openDuration' );
        let direction = this.config.get( 'direction' );

        this.main.show();
        let animAttr = {
            "x": 0,
            "duration": duration,
            "complete": function()
            {
                self.main.removeClass( '_showing' );
                self.main.addClass( '_shown' );
                self.openComplete();
            }
        };
        this.main.transition( animAttr );
    }

    /**
     * Close animation
     *
     * @return void
     */
    closeAnimation()
    {
        let self = this;
        let duration = this.config.get( 'closeDuration' );
        let direction = this.config.get( 'direction' );

        let animAttr = {
            "duration": duration,
            "complete": function()
            {
                self.main.removeClass( '_hide' );
                self.main.addClass( '_hidden' );
                self.main.hide();
                self.closeComplete();
            }
        };
        if ( direction == 'left' ) {
            animAttr.x = '110%';
        } else {
            animAttr.x = '-110%';
        }
        this.main.transition( animAttr );
    }

    /**
     * After opening submenu
     *
     * @return void
     */
    openComplete()
    {
    }

    /**
     * After closing submenu
     *
     * @return void
     */
    closeComplete()
    {
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
            triggerClass: '.ui__nav__mobile--trigger',
            mainClass: '.ui__nav__mobile--main',
            dropdownClass: '._nav--dropdown',
            closeClass: '._nav--close',
            direction: 'right',
            openDuration: 800,
            closeDuration: 600
        };
        return settings;
    }

};

export default Mobile;
