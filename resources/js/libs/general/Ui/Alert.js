//
// UI Alert
//
import $ from 'jquery';
import 'jquery.transit';
import Config from './../Config';

class Alert
{
    /**
     * Class constructor
     *
     * @param string content
     * @param string type
     * @param object settings
     * @return void
     */
    constructor( content, type, settings = {} )
    {
        this.content = content;
        this.type = type;
        //set settings
        this._setSettings( settings );

        this.prefix = this.config.get( 'prefixClass' );
        this.container = $( 'body' );

    }

    /**
     * Get alert
     *
     * @return object
     */
    getAlert()
    {
        let alert = this.checkAlert();
        if ( ! alert ) {
            this.alert = this.buildAlert();
        }
        else
        {
            this.alert = alert;
            let prefix = this.prefix;
            $( '.' +prefix+'--content', this.alert ).html( this.content );
        }
        return this.alert;
    }

    /**
     * Build alert
     *
     * @return object
     */
    buildAlert()
    {
        let prefix = this.prefix;
        let icon = this.getIcon();

        let alert = $( '<div></div>' )
            .addClass( prefix )
            .addClass( prefix + '--' + this.type )
            .append(
                $( '<div></div>' )
                    .addClass( prefix+'--main' )
                    .append( icon )
                    .append(
                        $( '<div class="'+prefix+'--content"></div>' )
                            .html( this.content )
                    )
            );

        alert.addClass( '_initialized' )
              .hide()
              .css( 'opacity', 0 );

        this.appendAlert( alert );

        return alert;
    }

    /**
     * Get icon
     *
     * @return object
     */
    getIcon()
    {
        let prefix = this.prefix;
        let iconClass = 'icon--' + this.type;
        if ( this.type == 'warning' ) {
            iconClass = 'fa fa-warning';
        }
        else if ( this.type == 'error' || this.type == 'danger' ) {
            iconClass = 'fa fa-times';
        }
        else if ( this.type == 'success' || this.type == 'accept' ) {
            iconClass = 'fa fa-check-circle';
        }

        let icon = $( '<span></span>' )
            .addClass( prefix + '--icon' )
            .append(
                $( '<i></i>' )
                    .addClass( iconClass )
            );

        return icon;
    }

    /**
     * Check alert
     *
     * @return object
     */
    checkAlert()
    {
        let alert = $( '.'+this.prefix, this.container );
        if ( alert.length > 0 ) {
            return alert;
        }
        return false;
    }

    /**
     * Append alert to document
     *
     * @param object alert
     * @return object
     */
    appendAlert( alert )
    {
        //append to body
        alert.appendTo( this.container );
    }

    /**
     * Show alert
     *
     * @return void
     */
    show()
    {
        let alert = this.getAlert();
        if ( alert )
        {
            alert.removeClass( '_hide' );
            alert.removeClass( '_hidden' );
            alert.addClass( '_showing' );
            this.showAnimation( alert );
            this.containerOnShown();
        }
    }

    /**
     * Show animation
     *
     * @return void
     */
    showAnimation( alert )
    {
        let self = this;

        alert.css({
            y: -100 ,
            opacity: 0
        });
        alert.show();
        alert.transition({
            y: 0,
            opacity: 1,
            duration: this.config.get( 'showDuration' ),
            complete: function()
            {
                alert.removeClass( '_showing' );
                alert.addClass( '_shown' );

                self.afterShow( alert );
            }
        });
    }

    /**
     * After show alert
     *
     * @param object alert
     * @return void
     */
    afterShow( alert )
    {
        let self = this;
        let duration = this.config.get( 'displayDuration' );
        if ( duration > 0 )
        {
            setTimeout( function()
            {
                self.dohide( alert );
            }, duration );
        }
    }

    /**
     * Hide alert
     *
     * @return void
     */
    hide()
    {
        let alert = this.getAlert();
        if ( alert )
        {
            this.dohide( alert );
        }
    }

    /**
     * Hide alert
     *
     * @param object alert
     * @return void
     */
    dohide( alert )
    {
        alert.removeClass( '_showing' );
        alert.removeClass( '_shown' );
        alert.addClass( '_hide' );
        this.hideAnimation( alert );
        this.containerOnHidden();
    }

    /**
     * Hide animation
     *
     * @return void
     */
    hideAnimation( alert )
    {
        alert.transition({
            y: -100,
            opacity: 0,
            duration: this.config.get( 'hideDuration' ),
            complete: function()
            {
                alert.hide();
                alert.removeClass( '_hide' );
                alert.addClass( '_hidden' );
            }
        });
    }

    /**
     * Manipulating when alert shown
     *
     * @return void
     */
    containerOnShown( alert )
    {
        this.container.addClass( '_alert--shown' );
    }

    /**
     * Manipulating when alert hidden
     *
     * @return void
     */
    containerOnHidden( alert )
    {
        this.container.removeClass( '_alert--shown' );
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
            prefixClass: 'ui__alert',
            displayDuration: 3000,
            showDuration: 400,
            hideDuration: 300
        };

        return settings;
    }

};

export default Alert;
