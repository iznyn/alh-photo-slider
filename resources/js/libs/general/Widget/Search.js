/**
 * Widget search
 *
 */
import Config from './../Config.js';
import Dom from './../Dom.js';

class WidgetSearch
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

        //get container
        this.containerId = this.config.get( 'container' );
        this.container = new Dom( this.containerId );
    }

    /**
     * Building widget search
     *
     * @return void
     */
    build()
    {
        let container = this.container;
        container.addClass( '_builded' );

        //open trigger
        this.show();

        //close trigger
        this.hide();
    }

    /**
     * Show search form
     *
     * @return void
     */
    show()
    {
        let self = this;
        let trigger = new Dom( this.config.get( 'trigger' ), this.container );
        if ( trigger.isExists() )
        {
            trigger.on( 'click', (element, ev) => {

                self.showAnimating( element, ev );
                ev.preventDefault();
                return false;
            });
        }
    }

    /**
     * Show animating
     *
     * @param Element element
     * @param object ev
     * @return void
     */
    showAnimating( element, ev )
    {
        let self = this;

        //Call callback
        this.beforeShow( element, ev );

        let form = new Dom( this.config.get( 'form' ), this.container );
        //Add class open
        form.addClass( '_open' );

        //Add class for show input
        setTimeout( function(){
            form.addClass( '_show--input' );
        },100);

        //Add class for show close button
        setTimeout( function(){
            form.addClass( '_show--close' );
        },300);

        //Call callback after
        setTimeout( function(){
            self.afterShow( element, ev );
        },700);
    }

    /**
     * Before show animating
     *
     * @param Element element
     * @param object ev
     * @return void
     */
    beforeShow( element, ev )
    {

    }

    /**
     * After show animating
     *
     * @param Element element
     * @param object ev
     * @return void
     */
    afterShow( element, ev )
    {

    }

    /**
     * Hide search form
     *
     * @return void
     */
    hide()
    {
        let self = this;
        let trigger = new Dom( this.config.get( 'close' ), this.container );
        if ( trigger.isExists() )
        {
            trigger.on( 'click', (element, ev) => {

                self.hideAnimating( element, ev );
                ev.preventDefault();
                return false;
            });
        }
    }

    /**
     * Hide animating
     *
     * @param Element element
     * @param object ev
     * @return void
     */
    hideAnimating( element, ev )
    {
        let self = this;
        //Call callback
        this.beforeHide( element, ev );

        let form = new Dom( this.config.get( 'form' ), this.container );

        //Remove class for show input
        form.removeClass( '_show--input' );

        //Remove class for show close button
        setTimeout( function(){
            form.removeClass( '_show--close' );
        },200);

        //Remove class open
        setTimeout( function(){
            form.removeClass( '_open' );
        },300);

        //Call callback after
        setTimeout( function(){
            self.afterHide( element, ev );
        },700);
    }

    /**
     * Before hide animating
     *
     * @param Element element
     * @param object ev
     * @return void
     */
    beforeHide( element, ev )
    {

    }

    /**
     * After hide animating
     *
     * @param Element element
     * @param object ev
     * @return void
     */
    afterHide( element, ev )
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
            container: '.widget__search',
            trigger: '._trigger',
            form: '._search--form',
            close: '._search--close'
        };
        return settings;
    }
};

export default WidgetSearch
