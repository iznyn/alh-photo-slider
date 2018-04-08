//
// UI helper
//
import $ from 'jquery';
import UiSelect from './../..//Ui/Select';

class TextFont extends UiSelect
{
    /**
     * Class constructor
     *
     * @param object editorLib
     * @param object editor
     * @param object settings
     * @return void
     */
    constructor( editorLib, editor, settings = {} )
    {
        super( settings );

        this.editorLib = editorLib;
        this.editor = editor;
    }

    /**
     * Prepare toggle
     *
     * @return void
     */
    prepare()
    {
        //get container
        this.containerId = this.config.get( 'containerClass' );
        this.container = new $( this.containerId, this.editor.getElement() );
    }

    /**
     * Item click
     *
     * @param object item
     * @return void
     */
    itemSelect( item )
    {
        super.itemSelect( item );

        let value = this.getItemValue( item );
        if ( typeof this.editor.textarea != 'undefined' )
        {
            let input = this.editor.textarea.getInputElement();
            input.css( 'fontFamily', value );
        }

        //callback
        let actions = this.editorLib.config.get( 'actions' );
        if ( typeof actions['select:font'] === 'function' )
        {
            actions['select:font']( value, this.editor, this.editorLib );
        }
    }

    /**
     * Item activate
     *
     * @param object item
     * @return void
     */
    itemActivate( item )
    {
    }
};

export default TextFont;
