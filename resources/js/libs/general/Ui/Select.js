//
// Form select
//
import $ from 'jquery';
import 'jquery.transit';
import Config from './../Config';
import Toggle from './Toggle';

class Select extends Toggle
{
    /**
     * Class constructor
     *
     * @return void
     */
    constructor( settings = {} )
    {
        super( settings );

        //overide toggel settings
        let triggerClass = this.config.get( 'currentClass' );
        let detailClass = this.config.get( 'itemsClass' );

        this.config.set( 'triggerClass', triggerClass );
        this.config.set( 'detailClass', detailClass );

    }

    /**
     * Setup toggle
     *
     * @return void
     */
    setup()
    {
        super.setup();

        //submenu click
        this.itemClick();
    }

    /**
     * Item click
     *
     * @return void
     */
    itemClick()
    {
        let self = this;
        let items = $( this.config.get( 'itemClass' ), this.container );
        items.each( function()
        {
            let item = $(this);
            item.click( function()
            {
                if ( self.checkItemProcess( item ) )
                {
                    //close submenu
                    self.close();
                    //main process
                    self.itemSelect( item );
                    return false;
                }

            })
        });
    }

    /**
     * Check process
     *
     * @param object item
     * @return void
     */
    checkItemProcess( item )
    {
        if ( item.hasClass( '_disable' ) ) {
            return false;
        }
        if ( item.hasClass( '_on-process' ) ) {
            return false;
        }
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
     * Item click
     *
     * @param string value
     * @return void
     */
    setValue( value )
    {
        let self = this;
        let item = $( this.config.get( 'itemClass' ) + '[data-value="'+value+'"]', this.container );
        this.itemSelect( item );
    }

    /**
     * Item click
     *
     * @param object item
     * @return void
     */
    itemSelect( item )
    {
        //save value
        let value = this.getItemValue( item );
        this.saveValue( value, item );

        //activate item
        this.itemActivate( item );

        //after select
        this.afterSelect( value, item );
    }

    /**
     * Item activate
     *
     * @param object item
     * @return void
     */
    itemActivate( item )
    {
        //add class item
        item.addClass( '_active' );

        //change current
        let text = item.text();
        let current = $( this.config.get( 'currentClass'), this.container );
        $( '._current--label', current ).text( text );
    }

    /**
     * Get item value
     *
     * @param object item
     * @return void
     */
    getItemValue( item )
    {
        let value = 0;
        if ( item.attr( 'data-value' ) ) {
            value = item.attr( 'data-value' );
        }
        return value;
    }

    /**
     * Get item value
     *
     * @param string value
     * @param object item
     * @return void
     */
    saveValue( value, item )
    {
        let storage = $( this.config.get( 'storageClass' ), this.container );
        if ( storage.length > 0 ) {
            storage.val( value );
        }
    }

    /**
     * After select item
     *
     * @param string value
     * @param object item
     * @return void
     */
    afterSelect( value, item )
    {
    }

    /**
     * Get default settings
     *
     * @return object
     */
    _getDefaultSettings()
    {
        let settings = {
            containerClass: '.ui__select',
            currentClass: '._current',
            itemsClass: '._items',
            itemClass: '._item',
            storageClass: '._storage',
            showDuration: 600,
            hideDuration: 300,
            closeOnClickOutside: false
        };

        return settings;
    }

};

export default Select;
