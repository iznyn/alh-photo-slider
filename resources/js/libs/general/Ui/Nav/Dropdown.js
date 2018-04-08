//
// UI helper
//
import $ from 'jquery';
import 'jquery.transit';
import Config from './../../Config';

class Dropdown
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
        //get container
        this.containerId = this.config.get( 'containerClass' );
        this.container = new $( this.containerId );

        if ( ! this.container.hasClass( '_initialized') )
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
        //prepare submenu
        this.prepareMenus();

        //ready prepare
        this.container.addClass( '_initialized' );
    }

    /**
     * Prepare menus
     *
     * @return void
     */
    prepareMenus()
    {
        let self = this;
        let menus = $( this.config.get( 'menuClass' ), this.container  );
        menus.each( function()
        {
            let menu = $(this);
            self.prepareMenu( menu );
        });
    }

    /**
     * Prepare menu
     *
     * @param object menu
     * @return void
     */
    prepareMenu( menu )
    {
        let self = this;
        let submenu = $( self.config.get( 'submenuClass' ), menu );
        if ( submenu.length > 0 )
        {
            menu.addClass( '_has-submenu' );
            submenu.show();
            submenu.css( 'height', 'auto' );
            submenu.attr( 'data-height', submenu.height() );
            submenu.hide();
        }
    }

    /**
     * Menu click event handler
     *
     * @return void
     */
    trigger()
    {
        let self = this;
        let menus = $( this.config.get( 'menuClass' ), this.container  );
        menus.each( function()
        {
            let menu = $(this);
            self.onclickMenu( menu );
        });
    }

    /**
     * Menu click event handler
     *
     * @param object menu
     * @return void
     */
    onclickMenu( menu )
    {
        var self = this;
        menu.click( function()
        {
            let submenu = $( self.config.get( 'submenuClass' ), menu );
            if ( menu.hasClass( '_has-submenu' ) && submenu.length > 0 )
            {
                if ( menu.hasClass( '_shown' ))
                {
                    self.close( menu, submenu );
                }
                else {
                    self.open( menu, submenu );
                }
                return false;
            }
            return true;
        });
    }


    /**
     * Open toggle
     *
     * @param object menu
     * @param object submenu
     * @return void
     */
    open( menu, submenu )
    {
        //add & remove class
        menu.removeClass( '_hide' );
        menu.removeClass( '_hidden' );
        menu.addClass( '_showing' );
        menu.addClass( '_active' );

        //animation
        this.openAnimation( menu, submenu );
    }

    /**
     * Close toggle
     *
     * @param object menu
     * @param object submenu
     * @return void
     */
    close( menu, submenu )
    {
        //add & remove class
        menu.removeClass( '_showing' );
        menu.removeClass( '_shown' );
        menu.removeClass( '_active' );
        menu.addClass( '_hide' );

        //animation
        this.closeAnimation( menu, submenu );
    }

    /**
     * Open animation
     *
     * @param object menu
     * @param object submenu
     * @return void
     */
    openAnimation( menu, submenu )
    {
        let self = this;
        let duration = this.config.get( 'openDuration' );
        var height = parseInt( submenu.attr( 'data-height' ) );

        submenu.css( 'height', 0 );
        submenu.show();
        submenu.animate({
            height: height
        }, duration, function()
        {
            menu.removeClass( '_showing' );
            menu.addClass( '_shown' );
            self.openComplete( menu, submenu );
        });
    }

    /**
     * Close animation
     *
     * @param object menu
     * @param object submenu
     * @return void
     */
    closeAnimation( menu, submenu )
    {
        let self = this;
        let duration = this.config.get( 'closeDuration' );

        submenu.animate({
            height: 0
        }, duration, function()
        {
            menu.removeClass( '_hide' );
            menu.addClass( '_hidden' );
            submenu.hide();
            self.closeComplete( menu, submenu );
        });
    }

    /**
     * After opening submenu
     *
     * @param object menu
     * @param object submenu
     * @return void
     */
    openComplete( menu, submenu )
    {
    }

    /**
     * After closing submenu
     *
     * @param object menu
     * @param object submenu
     * @return void
     */
    closeComplete( menu, submenu )
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
            containerClass: '.ui__nav__dropdown',
            menusClass: '._menus',
            menuClass: '._menu',
            submenuClass: '._submenu',
            openDuration: 800,
            closeDuration: 600
        };
        return settings;
    }

};

export default Dropdown;
