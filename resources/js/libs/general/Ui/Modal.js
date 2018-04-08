//
// Form select
//
import $ from 'jquery';
import 'jquery.transit';
import Config from './../Config';

class Modal
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
    }

    /**
     * Setup
     *
     * @return Modal
     */
    setup()
    {
        let self = this;

        //setup modal
        this.setupModal();

        //setup trigger
        this.setupTrigger();

        return this;
    }

    /**
     * Setup trigger
     *
     * @return void
     */
    setupModal()
    {
        let self = this;
        $( this.config.get( 'popupClass' ) ).each( function()
        {
            let modal = $(this);
            if ( ! modal.hasClass( 'remodal' ) )  {
                self.prepareModal( modal );
            }
        });
    }

    /**
     * Prepare modal
     *
     * @param object modal
     * @return void
     */
    prepareModal( modal )
    {
        let inner = $( this.config.get( 'innerClass' ), modal );
        if ( inner.length > 0 )
        {
            inner.addClass( '_content' );

            let body = $( '<div></div>' )
                .addClass( '_body' )
                .append( inner )
                .appendTo( modal );

            let overlay = $( '<div></div>' )
                .addClass( '_overlay' )
                .appendTo( modal );
        }

        modal.hide()
             .addClass( '_initialized' )
             .appendTo( $('body') );

        //setup close
        this.setupClose( modal );
    }

    /**
     * Setup close button
     *
     * @param object modal
     * @return void
     */
    setupClose( modal )
    {
        let self = this;
        let closeBtn = $( this.config.get( 'closeClass' ), modal );
        if ( closeBtn.length > 0 )
        {
            closeBtn.click( function()
            {
                let targetId = modal.attr( 'data-modal-id' );
                self.hide( targetId );

                //after close
                self.afterClose( targetId, closeBtn );

                return false;
            });
        }
    }

    /**
     * After close callback
     *
     * @param string targetId
     * @param object closeBtn
     * @return void
     */
    afterClose( targetId, closeBtn )
    {
        let closeCallback = this.config.get( 'afterClose' );
        if ( closeCallback ) {
            closeCallback( targetId, closeBtn );
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
        $( this.config.get( 'triggerClass' ) ).each( function()
        {
            let trigger = $(this);
            //On click
            trigger.click( function()
            {
                let targetId = $(this).attr( 'href' );
                let target = self.getModal( targetId );
                if ( target ) {
                    self.triggerAction( target, trigger );
                }
                return false;
            });
        });
    }

    /**
     * Trigger action
     *
     * @param object target
     * @param object trigger
     * @return void
     */
    triggerAction( target, trigger )
    {
        //Add class active
        trigger.addClass( '_active' );

        //Show modal
        this.showModal( target );
    }

    /**
     * Show modal
     *
     * @param string target id
     * @return void
     */
    show( targetId )
    {
        let target = this.getModal( targetId );
        if ( target ) {
            this.showModal( target );
        }
    }

    /**
     * Show modal
     *
     * @param object target
     * @return void
     */
    showModal( target )
    {
        if ( target.hasClass( '_showing' ) || target.hasClass( '_shown' ) ) {
            return true;
        }
        //before show callback
        this.beforeShow( target );

        //animating
        let useAnim = this.config.get( 'animation' );
        if ( useAnim ) {
            this.showAnimation( target );
        }
        else {
            this.afterShow( target );
        }
    }

    /**
     *  Show animation
     *
     * @param object target
     * @return void
     */
    showAnimation( target )
    {
        let self = this;
        let duration = this.config.get( 'showDuration' );

        //preapre
        $( '._overlay', target ).css({ "opacity": 0 });
        $( '._body', target ).css({ "scale": 0 });
        target.show();

        //animating overlay
        $( '._overlay', target )
            .transition({
                "opacity": 1,
                "duration": 400
            });

        //animating body
        setTimeout( function()
        {
            $( '._body', target )
                .transition({
                    "scale": 1,
                    "duration": duration,
                    "complete": function()
                    {
                        self.afterShow( target );
                    }
                });

        }, 200 );
    }

    /**
     * Before show modal
     *
     * @param object target
     * @return void
     */
    beforeShow( target )
    {
        //Set scroll to top
        $( 'body' ).scrollTop(0);
        $( '._body', target ).scrollTop(0);

        //edit class
        target.removeClass( '_hide' );
        target.removeClass( '_hidden' );
        target.removeClass( '_shown' );
        target.addClass( '_showing' );

        //add class to body
        $( 'body' )
            .css( 'overflow', 'hidden' )
            .addClass( '_ui-modal--shown' );
    }

    /**
     * After show modal
     *
     * @param object target
     * @return void
     */
    afterShow( target )
    {
        //edit class
        target.removeClass( '_showing' );
        target.addClass( '_shown' );
    }

    /**
     * Hide modal
     *
     * @param string target id
     * @return void
     */
    hide( targetId )
    {
        let target = this.getModal( targetId );
        if ( target ) {
            this.hideModal( target );
        }
    }

    /**
     * Hide modal
     *
     * @param object target
     * @return void
     */
    hideModal( target )
    {
        if ( target.hasClass( '_hide' ) || target.hasClass( '_hidden' ) ) {
            return true;
        }
        //before hide callback
        this.beforeHide( target );

        //animating
        let useAnim = this.config.get( 'animation' );
        if ( useAnim ) {
            this.hideAnimation( target );
        }
        else {
            this.afterHide( target );
        }
    }

    /**
     * Hide animation
     *
     * @param object target
     * @return void
     */
    hideAnimation( target )
    {
        let self = this;
        let duration = this.config.get( 'hideDuration' );

        //Prepare
        $( '._body', target ).css({ "scale": 1 });
        $( '._overlay', target ).css({ "opacity": 1 });

        //animating body
        $( '._body', target )
            .transition({
                "scale": 0,
                "duration": duration,
                "complete": function()
                {
                    self.afterHide( target );
                }
            });

        //animating body
        setTimeout( function()
        {
            $( '._overlay', target )
                .transition({
                    "opacity": 0,
                    "duration": 400
                });

        }, 300 );
    }

    /**
     * Before hide modal
     *
     * @param object target
     * @return void
     */
    beforeHide( target )
    {
        //edit class
        target.removeClass( '_shown' );
        target.removeClass( '_showing' );
        target.removeClass( '_hidden' );
        target.addClass( '_hide' );
    }

    /**
     * After hide modal
     *
     * @param object target
     * @return void
     */
    afterHide( target )
    {
        //edit class
        target.removeClass( '_hide' );
        target.addClass( '_hidden' );
        target.hide();

        //add class to body
        $( 'body' )
            .css( 'overflow', 'auto' )
            .removeClass( '_ui-modal--shown' );
    }

    /**
     * Get modal
     *
     * @param string targetId
     * @return void
     */
    getModal( targetId )
    {
        targetId = targetId.replace( '#', '' );
        let query = this.config.get( 'popupClass' );
        query += '[data-modal-id="' + targetId + '"]';

        let target = $( query );
        if ( target.length > 0 ) {
            return target;
        }
        return false;
    }

    /**
     * Set settings
     *
     * @param array settings
     * @return Modal
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
            triggerClass: '.ui__modal--trigger',
            popupClass: '.ui__modal',
            closeClass: '.ui__modal--close',
            innerClass: '.ui__modal--inner',
            animation: true,
            showDuration: 400,
            hideDuration: 300,
            showEffect: 'fadeIn',
            hideEffect: 'fadeOut'
        };

        return settings;
    }

};

export default Modal;
