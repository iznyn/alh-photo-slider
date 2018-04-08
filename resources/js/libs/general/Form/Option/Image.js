//
// Option Image
//
import $ from 'jquery';
import Config from './../../Config';
import 'jquery.transit';

class Image
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
    }

    /**
     * Building widget search
     *
     * @return void
     */
    setup()
    {
        //get container
        if ( ! this.container ) {
            this.container = $( this.config.get( 'containerClass' ) );
        }
        if ( this.container.length > 0 )
        {
            //prepare
            this.prepare();

            //on select
            this.onselect();

            //on hover
            if ( this.config.get( 'hover' )) {
                this.onhover();
            }
        }
    }

    /**
     * Prepare option
     *
     * @return void
     */
    prepare()
    {
        let container = this.container;
        container.addClass( '_initialized' );
    }

    /**
     * Handler selecting option
     *
     * @return void
     */
    onselect( option = false )
    {
        if ( ! option )
        {
            let _option = $( this.config.get( 'triggerClass'), this.container );
            if ( _option.length > 0 ) {
                option = _option;
            }
        }
        if ( option )
        {
            option.click( (e, y) => {

                let trigger = $( e.currentTarget );
                let value = this.getValue( trigger );

                //save value
                this.saveValue( value, trigger );
                //after callback
                this.afterSelect( value, trigger );

                return false;
            });
        }
    }

    /**
     * Handler hover option to show detail
     *
     * @return void
     */
    onhover( option = false )
    {
        if ( ! option )
        {
            let _option = $( this.config.get( 'triggerClass'), this.container );
            if ( _option.length > 0 ) {
                option = _option;
            }
        }
        if ( option )
        {
            option.hover(
                //Hover in
                (e) => {

                    let item = $( e.currentTarget );
                    let detail = $( this.config.get( 'detailClass'), item );
                    if ( detail.length > 0 )
                    {
                        return this.doHoverIn( detail, e );
                    }
                },
                //Hover out
                (e) => {

                    let item = $( e.currentTarget );
                    let detail = $( this.config.get( 'detailClass'), item );
                    if ( detail.length > 0 )
                    {
                        return this.doHoverOut( detail, e );
                    }
                }
            );
        }
    }

    /**
     * Hover in
     *
     * @param object detail
     * @param object ev
     * @return void
     */
    doHoverIn( detail, ev )
    {

    }

    /**
     * Hover out
     *
     * @param object detail
     * @param object ev
     * @return void
     */
    doHoverOut( detail, ev )
    {

    }

    /**
     * Save value
     *
     * @param string value
     * @param object trigger
     * @return void
     */
    saveValue( value, trigger )
    {
        let storage = $( this.config.get( 'storageClass'), this.container );
        if ( storage.length > 0 ) {
            storage.val( value );
        }
    }

    /**
     * After select callback
     *
     * @param string value
     * @param object trigger
     * @return void
     */
    afterSelect( value, trigger )
    {
        $( this.config.get( 'triggerClass'), this.container ).removeClass( '_active' );
        trigger.addClass( '_active' );
    }

    /**
     * Get value from selected option
     *
     * @param object option
     * @return void
     */
    getValue( option )
    {
        let value = false;
        if ( typeof option.attr( 'data-value' ) !== undefined ) {
            value = option.attr( 'data-value' );
        }
        return value;
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
            containerClass: '.option__image',
            itemsClass: '._items',
            itemClass: '._item',
            triggerClass: '._item',
            storageClass: '._storage',
            detailClass: '._storage',
            hover: false
        };
        return settings;
    }
};

export default Image;
