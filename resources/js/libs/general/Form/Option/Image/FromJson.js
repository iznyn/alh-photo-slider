//
// Option Image From Json
//
import $ from 'jquery';
import Config from './../../../Config';
import OptionImage from './../Image';
import 'jquery.transit';

class FromJson extends OptionImage
{
    /**
     * Class constructor
     *
     * @return void
     */
    constructor( jsonUrl, settings = {} )
    {
        super( settings );

        this.jsonUrl = jsonUrl;
    }

    /**
     * Building widget search
     *
     * @return void
     */
    setup()
    {
        let self = this;

        //call ajax
        $.ajax({
           url: this.jsonUrl,
           type: 'GET',
           dataType: 'json',
           data: {
              format: 'json'
           },
           error: function() {
           },
           success: function(data)
           {
                self.setupJson( data );
           }
        });
    }

    /**
     * Setup json data
     *
     * @param array data
     * @return void
     */
    setupJson( data )
    {
        this.jsonData = data;

        //prepare
        this.prepare();

        //build options
        this.buildOptions();

        //on select
        this.onselect();

        //on hover
        this.onhover();
    }

    /**
     * Build options
     *
     * @return void
     */
    buildOptions()
    {
        let options = $( this.config.get( 'itemsClass' ), this.container );
        if ( options.length > 0 )
        {
            let data = this.jsonData;
            for( var i = 0; i < data.length; i++ )
            {
                let item = data[i];
                let opt = this.createOption( item, i );
                options.append( opt );
            }
        }
        return this;
    }

    /**
     * Create option
     *
     * @param object item
     * @param int index
     * @return object
     */
    createOption( item, index )
    {
        let iclass = this.config.get( 'itemClass' ).replace( '.', '' );
        let thumb = this.createOptionThumbnail( item );
        let title = this.createOptionTitle( item );
        let detail = this.createOptionDetail( item );

        let option = $( '<div></div>' );
        option.addClass( iclass )
              .attr( 'data-index', (index+1) )
              .attr( 'data-value', item.id );

        let inner = $( '<div></div>' );
        inner.addClass( iclass + '--inner' )
             .append( thumb )
             .append( title );

        option.append( inner )
              .append( detail );

        return option;
    }

    /**
     * Create option thumbnail
     *
     * @param object item
     * @return object
     */
    createOptionThumbnail( item )
    {
        let iclass = this.config.get( 'itemClass' ).replace( '.', '' );
        iclass += '--thumbnail';

        let image = $( '<div></div>' );
        image.addClass( iclass );
        image.append(
            $( '<img/>' ).attr( 'src', item.image )
        );

        return image;

    }

    /**
     * Create option title
     *
     * @param object item
     * @return object
     */
    createOptionTitle( item )
    {
        let iclass = this.config.get( 'itemClass' ).replace( '.', '' );
        iclass += '--title';

        let title = $( '<h3></h3>' );
        title.addClass( iclass );
        title.append( item.title );

        return title;
    }

    /**
     * Create option detail
     *
     * @param object item
     * @return object
     */
    createOptionDetail( item )
    {
        let detail = '';
        if ( typeof item.detail !== 'undefined' )
        {

        }
        return detail;
    }
};

export default FromJson;
