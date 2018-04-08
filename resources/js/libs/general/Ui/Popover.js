//
// Form select
//
import $ from 'jquery';
import 'jquery.transit';
import Config from './../Config';

class Popover
{
    /**
     * Class constructor
     *
     * @param object container
     * @param object settings
     * @return void
     */
    constructor( container = false, settings = {} )
    {
        //set settings
        this._setSettings( settings );

        this.container = container;
        this.inPopover = false;
        this.inTrigger = false;
    }

    /**
     * Setup
     *
     * @return void
     */
    setup()
    {
        let self = this;

        //get container
        if ( ! this.container ) {
            this.container = $( this.config.get( 'containerClass' ) );
        }
        if ( this.container.length > 0 )
        {
            //setup popup
            this.setupPopup();
            //trigger
            this.setupTrigger();
        }

    }

    /**
     * Setup trigger
     *
     * @return void
     */
    setupPopup()
    {
        let self = this;
        this.container.each( function()
        {
            let item = $(this);
            let trigger = $( self.config.get( 'triggerClass' ), item );
            let popup = $( self.config.get( 'popupClass' ), item );
            if ( popup.length > 0 && trigger.length > 0 )
            {
                let contClass = self.config.get( 'containerClass' ).replace( '.', '' );
                let popover =
                    $( '<div></div>' )
                        .addClass( contClass + '--popup' )
                        .addClass( '_initialized' )
                        .append( popup )
                        .appendTo( $( 'body' ) );

                setTimeout( function()
                {
                    //set anchor
                    self.setPopupAnchor( popover, popup, trigger );

                    //set position
                    //self.setPopupPosition( popover, popup, trigger );

                    popover.hide();

                    //after callback
                    self.afterSetupPopup( popover, popup, trigger );

                },400);

            }
        });
    }

    /**
     * Set popup anchor
     *
     * @param object popover
     * @param object popup
     * @param object trigger
     * @return void
     */
    setPopupAnchor( popover, popup, trigger )
    {
        let anchorId = this.getAnchorId();
        trigger.attr( 'data-target', anchorId );
        popover.attr( 'data-anchor', anchorId );
    }

    /**
     * Get anchor id
     *
     * @return string
     */
    getAnchorId()
    {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    /**
     * Set popup position
     *
     * @param object popover
     * @param object popup
     * @param object trigger
     * @return void
     */
    setPopupPosition( popover, trigger )
    {
        let popDetail = $( this.config.get( 'popupClass' ), popover );
        let popupWidth = popDetail.outerWidth();
        let popupHeight = popDetail.outerHeight();
        let toTop = this.getPopupTop( popover, popDetail, trigger );
        let toLeft = this.getPopupLeft( popover, popDetail, trigger );

        popover.width( popupWidth )
               .height( popupHeight )
               .css( 'top', toTop - 40 )
               .css( 'left', toLeft )
               .attr( 'data-top', toTop )
               .attr( 'data-left', toLeft );
    }

    /**
     * Get popup top position
     *
     * @param object popover
     * @param object popup
     * @param object trigger
     * @return void
     */
    getPopupTop( popover, popup, trigger )
    {
        let offset = trigger.offset();
        let top = offset.top;
        let triggerHeight = trigger.outerHeight();
        let popupHeight = popup.outerHeight();
        let toTop = top - popupHeight + 10;

        return toTop;
    }

    /**
     * Get popup left position
     *
     * @param object popover
     * @param object popup
     * @param object trigger
     * @return void
     */
    getPopupLeft( popover, popup, trigger )
    {
        let offset = trigger.offset();
        let left = offset.left;
        let triggerWidth = trigger.outerWidth();
        let popupWidth = popup.outerWidth();

        let toLeft = left;
        if ( triggerWidth > popupWidth ) {
            toLeft = left + ((triggerWidth-popupWidth)/2);
        } else {
            toLeft = left - ((popupWidth-triggerWidth)/2);
        }
        return toLeft;
    }

    /**
     * Callback after setup popup
     *
     * @param object popover
     * @param object popup
     * @param object trigger
     * @return void
     */
    afterSetupPopup( popover, popup, trigger )
    {
        let self = this;
        let delay = this.config.get( 'hideDelay' );
        popover.hover( function() {
            self.inPopover = true;
        },
        function()
        {
            self.inPopover = false;
            setTimeout( function() {
                if ( ! self.inTrigger ) {
                    self.hide( trigger );
                }
            },
            delay );
        });
    }

    /**
     * Setup trigger
     *
     * @return void
     */
    setupTrigger()
    {
        let self = this;

        let triggerType = this.config.get( 'triggerType' );
        this.container.each( function()
        {
            let cont = $(this);
            let trigger = $( self.config.get( 'triggerClass' ), cont );
            // if ( triggerType == 'click' ) {
            //     self.setupClick( trigger );
            // } else {
            //     self.setupHover( trigger );
            // }

            let winWidth = $(window).width();
            if ( winWidth < 1100 )
            {
                self.setupClick( trigger );
            } else {
                self.setupClick( trigger );
                self.setupHover( trigger );
            }
        });
    }

    /**
     * Setup hover
     *
     * @param object item
     * @return void
     */
    setupHover( item )
    {
        let self = this;
        let delay = this.config.get( 'hideDelay' );

        item.hover(function()
        {
            self.inPopover = false;
            self.inTrigger = true;
            let trigger = $(this);
            self.show( trigger );
        },
        function()
        {
            let trigger = $(this);
            self.inTrigger = false;
            setTimeout( function()
            {
                if ( ! self.inPopover ) {
                    self.hide( trigger );
                }
            },
            delay );
        });
    }

    /**
     * Setup click
     *
     * @param object item
     * @return void
     */
    setupClick( item )
    {
        let self = this;

        item.click(function()
        {
            self.hideAll();
            let trigger = $(this);
            self.show( trigger );

            return false;
        });

        //Hide in outside click
        $( '*' ).click( function()
        {
            if ( ! self.inPopover ) {
                self.hideAll();
            }
        });
    }

    /**
     * Hide all popover
     *
     * @return void
     */
    hideAll()
    {
        let popupClass = this.config.get( 'containerClass' );
        popupClass += '--popup._shown';

        let self = this;
        $( popupClass ).each( function()
        {
            let popup = $(this);
            self.hideAnimation( popup );
        });
    }

    /**
     * Show popup
     *
     * @param object trigger
     * @return void
     */
    show( trigger )
    {
        let anchorId = trigger.attr( 'data-target' );
        let popup = this.getPopup( anchorId );

        if ( popup )
        {
            this.setPopupPosition( popup, trigger );
            this.showAnimation( popup );
        }
    }

    /**
     * Show animation popup
     *
     * @param object popup
     * @return void
     */
    showAnimation( popup )
    {
        popup.removeClass( '_hide' );
        popup.removeClass( '_hidden' );
        popup.addClass( '_showing' );

        let self = this;
        let toTop = parseInt( popup.attr( 'data-top' ) );
        popup.css( 'opacity', 0 )
             .show()
             .transition({
                 top: toTop,
                 opacity: 1,
                 duration: this.config.get( 'showDuration' ),
                 complete: function()
                 {
                    popup.addClass( '_shown' );
                    popup.removeClass( '_showing' );
                    self.afterShow( popup );
                 }
             });
    }

    /**
     * After show animation popup
     *
     * @param object popup
     * @return void
     */
    afterShow( popup )
    {
    }

    /**
     * hide popup
     *
     * @param object trigger
     * @return void
     */
    hide( trigger )
    {
        let anchorId = trigger.attr( 'data-target' );
        let popup = this.getPopup( anchorId );

        if ( popup )
        {
            let self = this;
            self.hideAnimation( popup );
        }
    }

    /**
     * Hide animation popup
     *
     * @param object popup
     * @return void
     */
    hideAnimation( popup )
    {
        popup.removeClass( '_shown' );
        popup.removeClass( '_showing' );
        popup.addClass( '_hide' );

        let self = this;
        let toTop = parseInt( popup.attr( 'data-top' ) );

        popup.transition({
                top: toTop - 40,
                opacity: 0,
                duration: this.config.get( 'hideDuration' ),
                complete: function()
                {
                    popup.addClass( '_hidden' );
                    popup.removeClass( '_hide' );
                    popup.hide();
                    self.afterHide( popup );
                }
             });
    }

    /**
     * After hide animation popup
     *
     * @param object popup
     * @return void
     */
    afterHide( popup )
    {
    }

    /**
     * Get popup
     *
     * @param string anchorId
     * @return void
     */
    getPopup( anchorId )
    {
        let popup = false;
        let contClass = this.config.get( 'containerClass' );
        contClass += '--popup';
        contClass += '[data-anchor="'+anchorId+'"]';

        if ( $( contClass ).length > 0 ){
            popup = $( contClass );
        }

        return popup;
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
            containerClass: '.ui__popover',
            triggerClass: '._trigger',
            popupClass: '._popup',
            showDuration: 300,
            hideDuration: 300,
            hideDelay: 300,
            triggerType: 'hover'
        };

        return settings;
    }

};

export default Popover;
