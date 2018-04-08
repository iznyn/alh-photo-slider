//
// UI helper
//
import $ from 'jquery';
import 'jquery.transit';
import Config from './../Config';

class Collapse
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
        //prepare
        this.prepare();

        //trigger event
        this.trigger();
    }

    /**
     * Prepare collapse
     *
     * @return void
     */
    prepare()
    {
        //get container
        this.containerId = this.config.get( 'containerClass' );
        this.container = new $( this.containerId );

        this.prepareItems();
    }

    /**
     * Prepare items collapse
     *
     * @return void
     */
    prepareItems()
    {
        let self = this;
        let itemClass = this.config.get( 'itemClass' );
        $( itemClass, this.container ).each( function()
        {
            let item = $(this);
            let detail = $( self.config.get( 'detailClass' ), item );
            if ( detail.length > 0 )
            {
                detail.show();
                detail.css( 'height', 'auto' );
                let height = detail.height();
                detail.attr( 'data-height', height );
                detail.height( 0 );
                detail.hide();

                if ( item.hasClass( '_active' ) ) {
                    item.addClass( '_shown' );
                    self.show( item );
                }
            }

        });
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
                let button = $(this);
                let item = self.getItem( button );
                let status = self.checkStatus( item );
                if ( status == 'active' )
                {
                    self.hide( item );
                }
                else if ( status == 'nonactive' )
                {
                    self.show( item );
                }
                return false;
            });
        }
    }

    /**
     * Get item
     *
     * @param object button
     * @return void
     */
    getItem( button )
    {
        let itemClass = this.config.get( 'itemClass' );
        let item = button.parents( itemClass );
        if ( item.length > 0 ) {
            return item;
        }
        return false;
    }

    /**
     * Check item status
     *
     * @param object item
     * @return void
     */
    checkStatus( item )
    {
        if ( item.hasClass( '_disable' ) ) {
            return 'disable';
        }
        else if ( item.hasClass( '_active' ) ) {
            return 'active';
        }
        else {
            return 'nonactive';
        }
    }

    /**
     * Show collapse detail
     *
     * @param object item
     * @return void
     */
    show( item )
    {
        let detail = $( this.config.get( 'detailClass' ), item );
        if ( detail.length > 0 )
        {
            //add/remove class
            item.removeClass( '_hidden' );
            item.removeClass( '_hide' );
            item.addClass( '_showing' );

            this.showAnimation( item, detail );
        }
    }

    /**
     * Show animation
     *
     * @param object item
     * @param object detail
     * @return void
     */
    showAnimation( item, detail )
    {
        let self = this;
        let duration = this.config.get( 'showDuration' );
        let height = parseInt( detail.attr( 'data-height' ) );
        detail.height(0).show();

        detail.animate({
            "height": height
        }, duration, function(event)
        {
            self.afterShow( item, detail, event );
        });
    }

    /**
     * After show animation
     *
     * @param object item
     * @param object detail
     * @param object event
     * @return void
     */
    afterShow( item, detail, event )
    {
        item.removeClass( '_showing' );
        item.addClass( '_shown' );
        item.addClass( '_active' );
    }

    /**
     * Hide collapse detail
     *
     * @param object item
     * @return void
     */
    hide( item )
    {
        let detail = $( this.config.get( 'detailClass' ), item );
        if ( detail.length > 0 )
        {
            //add/remove class
            item.removeClass( '_showing' );
            item.removeClass( '_shown' );
            item.addClass( '_hide' );

            this.hideAnimation( item, detail );
        }
    }

    /**
     * Hide animation
     *
     * @param object item
     * @param object detail
     * @return void
     */
    hideAnimation( item, detail )
    {
        let self = this;
        let duration = this.config.get( 'hideDuration' );
        detail.css( 'height', 'auto' );

        detail.animate({
            "height": 0
        }, duration, function(event)
        {
            self.afterHide( item, detail, event );
        });
    }

    /**
     * After hide animation
     *
     * @param object item
     * @param object detail
     * @param object event
     * @return void
     */
    afterHide( item, detail, event )
    {
        detail.hide();
        item.removeClass( '_hide' );
        item.removeClass( '_active' );
        item.addClass( '_hidden' );
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
            containerClass: '.ui__collapse',
            itemClass: '._collapse',
            triggerClass: '._trigger',
            detailClass: '._detail',
            showDuration: 600,
            hideDuration: 500
        };
        return settings;
    }

};

export default Collapse;
