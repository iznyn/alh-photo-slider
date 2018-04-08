//
// Config management
//
import $ from 'jquery';
import _ from 'lodash';

class Config
{
    /**
     * Class constructor
     *
     * @param object dataDefault
     * @param object dataCustom
     * @return void
     */
    constructor( dataDefault = {}, dataCustom = {} )
    {
        this.data = this._parseData( dataDefault, dataCustom );
    }

    /**
     * Get storage value
     *
     * @param string key
     * @return mixed
     */
    get( key )
    {
        let value = false;
        if ( typeof this.data[key] !== 'undefined' ) {
            value = this.data[key];
        }
        return value;
    }

    /**
     * Get storage value
     *
     * @param string key
     * @param mixed value
     * @return void
     */
    set( key, value )
    {
        this.data[key] = value;
        return this;
    }

    /**
     * Parsing data
     *
     * @param object dataDefault
     * @param object dataCustom
     * @return object
     */
    _parseData( dataDefault = {}, dataCustom = {} )
    {
        let settings = _.extend( dataDefault, dataCustom );
        return settings;
    }
};

export default Config;
