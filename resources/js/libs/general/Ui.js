//
// UI helper
//
import $ from 'jquery';
import 'remodal';
import _ from 'lodash/Lang';

class Ui
{
    constructor()
    {

    }

    /**
     * Show alert message
     *
     * @param string message
     * @return void
     */
    alert( message )
    {
        let modal = $('[data-remodal-id="ui--modal--alert"]');
        let inst = modal.remodal();
        let msg = '';

        if ( _.isString( message ))
        {
            msg = $( '<p class="_alert--message"></p>' )
                    .append( message );
        }
        else if ( _.isArray( message ))
        {
            msg = $( '<ul class="_alert--messages"></ul>' );
            for( let i = 0; i < message.length; i++ )
            {
                msg.append( '<li class="_alert--message">'+message[i]+'</li>' );
            }
        }

        $( '.ui__modal--content', modal ).html( msg );
        inst.open();
    }

    /**
     * Close modal
     *
     * @param string type
     * @para void
     */
    closeModal( type )
    {
        let modal = $('[data-remodal-id="ui--modal--'+type+'"]');
        if ( modal.length > 0 ) {
            let inst = modal.remodal();
            inst.close();
        }
    }

    /**
     * Show input error
     *
     * @param object input
     * @param string message
     * @return object
     */
    showInputError( input, message )
    {
        if ( $(input).next( '._form--input--error' ).length < 1 )
        {
            let p = $( '<p></p>' );
            p.addClass( '_form--input--error' )
             .text( message )
             .insertAfter( $(input) )
             .addClass( '_showing' );

            return p;
        }
        return false;
    }
};

export default Ui;
