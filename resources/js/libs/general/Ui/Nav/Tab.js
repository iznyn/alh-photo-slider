//
// UI helper
//
import $ from 'jquery';
import 'jquery.transit';
import Config from './../../Config';

class Tab
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
        //prepare menu
        this.prepareMenu();

        //prepare content
        this.prepareContent();

        //ready prepare
        this.container.addClass( '_initialized' );
    }

    /**
     * Prepare menu
     *
     * @return void
     */
    prepareMenu()
    {
        //get first
        let first = this.getFirstMenu();
        if ( first ) {
            first.addClass( '_active' );
        }
    }

    /**
     * Get first menu
     *
     * @return void
     */
    getFirstMenu()
    {
        let menus = this.getAllMenus();

        //get first
        if ( menus.length > 0 ) {
            let menu = $( menus.get(0) );
            return menu;
        }
        return false;
    }

    /**
     * Get all menus
     *
     * @return void
     */
    getAllMenus()
    {
        let navClass = this.config.get( 'navClass' );
        let menuClass = this.config.get( 'menuClass' );
        let menus = $( navClass + ' ' + menuClass, this.container );

        return menus;
    }

    /**
     * Prepare content
     *
     * @return void
     */
    prepareContent()
    {
        let self = this;
        let contentClass = this.config.get( 'contentClass' );
        let sectionClass = this.config.get( 'sectionClass' );
        let sections = $( contentClass + ' ' + sectionClass, this.container );

        //setup section
        sections.each(function()
        {
            let section = $(this);
            self.prepareSection( section );
        });

        //show first
        $( sections.get(0) )
            .show()
            .addClass( '_shown' );
    }

    /**
     * Preparing section
     *
     * @param object section
     * @return void
     */
    prepareSection( section )
    {
        section.show();
        section.height( 'auto' );
        section.attr( 'data-height', section.height() );
        section.hide();
    }

    /**
     * Menu click event handler
     *
     * @return void
     */
    trigger()
    {
        let self = this;
        let menus = this.getAllMenus();

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
            if ( ! menu.hasClass( '_active' ) &&  ! menu.hasClass( '_disable' ) ) {
                self.activateMenu( menu );
            }
            return false;
        });
    }

    /**
     * Change menu
     *
     * @param string name
     * @return void
     */
    changeMenu( name )
    {
        let menuClass = this.config.get( 'navClass' );
        menuClass += ' a[href="'+name+'"]';

        if ( $( menuClass, this.container ).length > 0 )
        {
            let menu = $( menuClass, this.container );
            this.activateMenu( menu );
        }
    }

    /**
     * Activate menu
     *
     * @param object menu
     * @return void
     */
    activateMenu( menu )
    {
        let target = this.getTarget( menu );
        if ( target ) {
            this.showTab( target, menu );
        }
    }

    /**
     * Show tab
     *
     * @param object target
     * @param object menu
     * @return void
     */
    showTab( target, menu )
    {
        let self = this;
        let menusClass = this.config.get( 'navClass' );
        menusClass += ' ';
        menusClass += this.config.get( 'menuClass' );
        menusClass += '._active';

        let active = $( menusClass, this.container );
        if ( active.length > 0 )
        {
            active.removeClass( '_active' );

            let activeTarget = this.getTarget( active );
            if ( activeTarget ) {
                self.hide( activeTarget, active, () => {
                    self.show( target, menu );
                });
            }
        }
        else {
            this.show( target, menu );
        }
    }

    /**
     * Get content target
     *
     * @param object menu
     * @return void
     */
    getTarget( menu )
    {
        let targetId = this.getTargetId( menu );
        let target = $( targetId );
        if ( target.length > 0 ) {
            return target;
        }
        return false;
    }

    /**
     * Get target id
     *
     * @param object menu
     * @return void
     */
    getTargetId( menu )
    {
        let link = menu;
        if ( menu.prop( 'tagName' ) != 'A' ) {
            link = $( 'a', menu );
        }
        let targetId = link.attr( 'href' );

        return targetId;
    }

    /**
     * Show tab content
     *
     * @param object target
     * @param object menu
     * @return void
     */
    show( target, menu )
    {
        //add & remove class
        target.removeClass( '_hide' );
        target.removeClass( '_hidden' );
        target.addClass( '_showing' );
        menu.addClass( '_active' );

        //animation
        this.showAnimation( target, menu );
    }

    /**
     * Hide tab content
     *
     * @param object target
     * @param object menu
     * @param object callback
     * @return void
     */
    hide( target, menu, callback = false )
    {
        //add & remove class
        target.removeClass( '_showing' );
        target.removeClass( '_shown' );
        menu.removeClass( '_active' );
        target.addClass( '_hide' );

        //animation
        this.hideAnimation( target, menu, callback );
    }

    /**
     * Open animation
     *
     * @param object target
     * @param object menu
     * @return void
     */
    showAnimation( target, menu )
    {
        let self = this;
        let duration = this.config.get( 'showDuration' );
        var height = parseInt( target.attr( 'data-height' ) );

        target.css( 'height', 0 );
        target.show();
        target.animate({
            height: height
        }, duration, function()
        {
            target.removeClass( '_showing' );
            target.addClass( '_shown' );
            self.showComplete( target, menu );
        });
    }

    /**
     * Hide animation
     *
     * @param object target
     * @param object menu
     * @param object callback
     * @return void
     */
    hideAnimation( target, menu, callback = false )
    {
        let self = this;
        let duration = this.config.get( 'hideDuration' );

        target.animate({
            height: 0
        }, duration, function()
        {
            target.removeClass( '_hide' );
            target.addClass( '_hidden' );
            target.hide();
            self.hideComplete( target, menu );

            //callback
            if ( callback ) {
                callback();
            }
        });
    }

    /**
     * After showing submenu
     *
     * @param object target
     * @param object menu
     * @return void
     */
    showComplete( target, menu )
    {
    }

    /**
     * After hide submenu
     *
     * @param object target
     * @param object menu
     * @return void
     */
    hideComplete( target, menu )
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
            containerClass: '.ui__nav__tab',
            navClass: '._tab--menu',
            contentClass: '._tab--content',
            sectionClass: '._tab--section',
            menuClass: '._menu',
            showDuration: 600,
            hideDuration: 300
        };
        return settings;
    }

};

export default Tab;
