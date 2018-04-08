//
// UI helper
//
import $ from 'jquery';
import 'jquery.transit';
import Loader from './../Loader';

class Section extends Loader
{
    /**
     * Class constructor
     *
     * @param object section
     * @return void
     */
    constructor( section )
    {
        super();
        this.section = section;
        this.container = section; 
        this.prefix = 'ui__loader--section';
    }

    /**
     * Build loader
     *
     * @return object
     */
    checkLoader()
    {
        let loader = $( '.'+this.prefix, this.section );
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
        loader.appendTo( $( this.section ) );
    }

};

export default Section;
