//
// UI Loader
//
import $ from 'jquery';
import 'jquery.transit';

class Loader
{
    /**
     * Class constructor
     *
     * @return void
     */
    constructor()
    {
        this.loader = false;
        this.prefix = 'ui__loader';
        this.container = $( 'body' );
    }

    /**
     * Get loader
     *
     * @return object
     */
    getLoader()
    {
        if ( ! this.loader ) {
            this.loader = this.buildLoader();
        }
        return this.loader;
    }

    /**
     * Build loader
     *
     * @return object
     */
    buildLoader()
    {
        let loader = this.checkLoader();
        let prefix = this.prefix;

        if ( ! loader )
        {
            loader = $( '<div class="'+prefix+'"></div>' )
                .append(
                    $( '<div class="'+prefix+'--main"></div>' )
                        .append(
                            $( '<div class="'+prefix+'--animation"></div>' )
                                .append( $( '<img src="../images/loader.svg" alt="Loading..." />' ) )
                        )
                );

            loader.addClass( '_initialized' )
                  .hide()
                  .css( 'opacity', 0 );

            this.appendLoader( loader );
        }

        return loader;
    }

    /**
     * Build loader
     *
     * @return object
     */
    checkLoader()
    {
        let loader = $( '.'+this.prefix, this.container );
        if ( loader.length > 0 ) {
            return loader;
        }
        return false;
    }

    /**
     * Append loader to document
     *
     * @param object loader
     * @return object
     */
    appendLoader( loader )
    {
        //append to body
        loader.appendTo( this.container );
    }

    /**
     * Show loader
     *
     * @return void
     */
    show()
    {
        let loader = this.getLoader();
        if ( loader )
        {
            loader.removeClass( '_hide' );
            loader.removeClass( '_hidden' );
            loader.addClass( '_showing' );
            this.showAnimation( loader );
            this.containerOnShown();
        }
    }

    /**
     * Show animation
     *
     * @return void
     */
    showAnimation( loader )
    {
        loader.css({ opacity: 0});
        loader.show();
        loader.transition({
            opacity: 1,
            duration: 400,
            complete: function()
            {
                loader.removeClass( '_showing' );
                loader.addClass( '_shown' );
            }
        });
    }

    /**
     * Hide loader
     *
     * @return void
     */
    hide()
    {
        let loader = this.getLoader();
        if ( loader )
        {
            loader.removeClass( '_showing' );
            loader.removeClass( '_shown' );
            loader.addClass( '_hide' );
            this.hideAnimation( loader );
            this.containerOnHidden();
        }
    }

    /**
     * Hide animation
     *
     * @return void
     */
    hideAnimation( loader )
    {
        loader.transition({
            opacity: 0,
            duration: 400,
            complete: function()
            {
                loader.hide();
                loader.removeClass( '_hide' );
                loader.addClass( '_hidden' );
            }
        });
    }

    /**
     * Manipulating when loader shown
     *
     * @return void
     */
    containerOnShown( loader )
    {
        this.container.addClass( '_loader--shown' );
    }

    /**
     * Manipulating when loader hidden
     *
     * @return void
     */
    containerOnHidden( loader )
    {
        this.container.removeClass( '_loader--shown' );
    }


};

export default Loader;
