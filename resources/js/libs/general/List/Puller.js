/**
 * List pusher
 */
import Config from './../Config.js';
import Dom from './../Dom.js';
import Element from './../Dom/Element.js';
import $ from 'jquery';

class Puller
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
        this.inProgress = false;
        this.index = 1;
        //get container
        this.containerId = this.config.get( 'container' );
        let contDom = new Dom( this.containerId );
        let container = false;
        if ( contDom.isExists() ) {
            container = contDom.get(0);
        }
        this.container = container;
    }

    /**
     * Building widget search
     *
     * @return void
     */
    setup()
    {
        if ( this.container )
        {
            //prepare
            this.prepare();

            //onscroll event
            this.onscroll();
        }
    }

    /**
     * Prepare pusher
     *
     * @return void
     */
    prepare()
    {
        //Add class
        this.container.addClass( '_initialized' );
        //prepare loader dom and hide them
        this.loader = new Element( this.config.get( 'loader' ), this.container );
        this.loader.hide();
    }

    /**
     * Onscroll event
     *
     * @return void
     */
    onscroll()
    {
        let scroller = this.config.get( 'scroll' );
        if ( scroller == 'window' )
        {
            $(window).scroll( (e) => {

                if ( this.inProgress ) {
                    return true;
                }

                let container = this.container;
                let top = container.top();
                let height = container.height();
                let winHeight = $(window).height();
                let maxScroll = top+height-winHeight;

                console.log( maxScroll );

                let scrollTop = $(window).scrollTop();
                if ( scrollTop > maxScroll )
                {
                    this.pullData();
                }
            });
        }

    }

    /**
     * Pull data
     *
     * @return Puller
     */
    pullData()
    {
        let self = this;
        let page = this.index + 1;

        this.container.addClass( '_in-progress' );
        this.inProgress = true;
        this.loader.show();

        $.ajax({
           url: self.config.get( 'remoteUrl' ),
           type: 'GET',
           dataType: 'html',
           data: {
               page: page
           },
           error: function() {},
           success: function( content )
           {
               self.processingData( content );
           }
        });
    }

    /**
     * Handling if get empty data
     *
     * @param string data
     * @return void
     */
    processingData( data )
    {
        let filtered = this.filterContent( data );
        if ( filtered )
        {
            if ( data != '' && data != ' ' )
            {
                this.index++;
                this.renderContent( data );
            }
            else {
                this.emptyData();
            }
        }
    }

    /**
     * Filter content
     *
     * @param string content
     * @return void
     */
    filterContent( content )
    {
        return content;
    }

    /**
     * Render content
     *
     * @param string content
     * @return void
     */
    renderContent( content )
    {
        //run callback
        this.beforeRenderContent( content );

        let container = $( this.container.element );
        let lists = $( this.config.get( 'items' ), container );

        //animating
        this.animatingContent( lists, content );

        //unprogress
        this.container.removeClass( '_in-progress' );
        this.inProgress = false;

        //hide loader
        this.loader.hide();
    }

    /**
     * Handling if get empty data
     *
     * @param Node lists
     * @param string content
     * @return void
     */
    animatingContent( lists, content )
    {
        lists.append( content );

        //run callback
        this.afterRenderContent( lists, content );
    }

    /**
     * Function that call before render content
     *
     * @param string content
     * @return void
     */
    beforeRenderContent( content )
    {
    }

    /**
     * Function that call after render content
     *
     * @param Node lists
     * @param string content
     * @return void
     */
    afterRenderContent( lists, content )
    {
    }

    /**
     * Handling if get empty data
     *
     * @return void
     */
    emptyData( content )
    {
    }

    /**
     * Set settings
     *
     * @param array settings
     * @return Puller
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
            remoteUrl: 'data/products.php',
            scroll: 'window',
            container: '.list__pusher',
            items: '._pusher--items',
            item: '._pusher--item',
            loader: '._pusher--loader',
        };
        return settings;
    }
};

export default Puller
