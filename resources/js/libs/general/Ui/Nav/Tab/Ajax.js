//
// UI helper
//
import $ from 'jquery';
import _ from 'lodash';
import 'jquery.transit';
import Config from './../../../Config';
import Tab from './../Tab';
import Loader from './../../Loader';
import LoaderSection from './../../Loader/Section';

class Ajax extends Tab
{
    /**
     * Class constructor
     *
     * @param object settings
     * @return void
     */
    constructor( settings = {} )
    {
        super( settings );
    }

    /**
     * Prepare content
     *
     * @param object menu
     * @return void
     */
    prepareContent( menu )
    {
        //Prepare loader
        let contentId = this.config.get( 'contentClass' );
        let content = $( contentId, this.container );
        this.loaderContent = new LoaderSection( content );

        //prepare loader site
        this.loaderSite = new Loader();

        //send ajax to get data
        let navFirst = this.getFirstMenu();
        if ( navFirst )
        {
            this.menuHandler( navFirst );
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
        if ( ! menu.hasClass( '_active' ) )
        {
            this.menuHandler( menu );
        }
    }

    /**
     * Handling menu select
     *
     * @param object menu
     * @return void
     */
    menuHandler( menu )
    {
        this.loaderContent.show();
        let value = menu.attr( 'data-value' );
        //send ajax 
        this.sendAjax( value, menu );
    }

    /**
     * Send ajax request
     *
     * @param string value
     * @param object menu
     * @return void
     */
    sendAjax( value, menu )
    {
        let self = this;
        let ajaxUrl = this.getAjaxUrl( value );
        let ajaxData = this.getAjaxRequestData( value );

        $.ajax({
           url: ajaxUrl,
           type: 'GET',
           dataType: 'json',
           data: ajaxData,
           error: function() {
               self.ajaxError( value, menu );
           },
           success: function( data )
           {
                self.ajaxSuccess( data, value, menu );
           }
        });
    }

    /**
     * Get ajax url
     *
     * @param string value
     * @return void
     */
    getAjaxUrl( value )
    {
        let ajaxUrl = this.config.get( 'ajaxUrl' );
        return ajaxUrl;
    }

    /**
     * Get ajax request data
     *
     * @param string value
     * @return void
     */
    getAjaxRequestData( value )
    {
        let data = {
           format: 'json',
           type: value
        };
        return data;
    }

    /**
     * Handling when ajax request is error
     *
     * @param string value
     * @param object menu
     * @return void
     */
    ajaxError( value, menu )
    {
        this.loaderContent.hide();
    }

    /**
     * Handling when ajax request is success
     *
     * @param object data
     * @param string value
     * @param object menu
     * @return void
     */
    ajaxSuccess( data, value, menu )
    {
        //reset
        this.resetItems();

        //hide loader
        this.loaderContent.hide();

        //manipulating menu
        let menus = this.getAllMenus();
        menus.removeClass( '_active' );

        menu.addClass( '_active' );

        //appends items
        this.appendItems( data, value );
    }

    /**
     * Reset items
     *
     * @return void
     */
    resetItems()
    {
        let container = this.getItemsContainer();
        container.html( '' );
    }

    /**
     * Append items
     *
     * @param object data
     * @param string value
     * @return void
     */
    appendItems( data, value )
    {
        let items = this.getItemsFromData( data );
        if ( items )
        {
            for ( let i = 0; i < items.length; i++ )
            {
                this.buildItem( items[i] );
            }
        };
    }

    /**
     * Build item
     *
     * @param object itemData
     * @return void
     */
    buildItem( itemData )
    {
        let item = $( '<div></div>' );
        item.attr( 'data-id', itemData.id )
            .addClass( '_item' )
            //Append inner
            .append(

                $( '<div></div>' )
                    .addClass( '_item--inner' )
                    //Item thumb
                    .append(
                        this.getItemThumbnail( itemData )
                    )
                    //Item detail
                    .append(
                        this.getItemDetail( itemData )
                    )
            );

        this.appendItem( item );
    }

    /**
     * append item
     *
     * @param object item
     * @return void
     */
    appendItem( item )
    {
        let container = this.getItemsContainer();
        //prepare
        item.css( 'opacity', 0 )
            .addClass( '_pre-showing' )
            .appendTo( container );

        //animating
        item.transition({
            opacity: 1
        });
    }

    /**
     * Get item thumbnail
     *
     * @param object itemData
     * @return void
     */
    getItemThumbnail( itemData )
    {
        let item = $( '<div></div>' );
        item.addClass( '_item--thumbnail' )
            //image
            .append(
                $( '<img />' )
                    .attr( 'src', itemData.image )
                    .attr( 'alt', itemData.title )
            );

        return item;
    }

    /**
     * Get item detail
     *
     * @param object itemData
     * @return void
     */
    getItemDetail( itemData )
    {
        let detail = $( '<div></div>' );
        detail.addClass( '_item--detail' )
        detail.hide();

        return detail;
    }

    /**
     * Get items container
     *
     * @return void
     */
    getItemsContainer()
    {
        let content = $( this.config.get( 'contentClass'), this.container );
        let items = $( '._items', content );
        if ( items.length < 1 )
        {
            items = $( '<div></div>' );
            items.addClass( '_items' )
                 .addClass( 'clearfix' )
                 .appendTo( content );
        }
        return items;
    }

    /**
     * Get items from data
     *
     * @param object data
     * @return void
     */
    getItemsFromData( data )
    {
        let items = false;
        if ( typeof data.items !== 'undefined' && _.isArray( data.items ) ) {
            items = data.items;
        }
        return items;
    }

    /**
     * Get default settings
     *
     * @return object
     */
    _getDefaultSettings()
    {
        let settings = {
            containerClass: '.ui__nav__tab--ajax',
            navClass: '._tab--menu',
            contentClass: '._tab--content',
            menuClass: '._menu',
            ajaxUrl: ''
        };
        return settings;
    }

};

export default Ajax;
