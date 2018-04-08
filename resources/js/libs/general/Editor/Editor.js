//
// UI Alert
//
import $ from 'jquery';
import 'jquery.transit';
import Config from './../Config';
import Builder from './Builder';
import SelectColor from './Select/TextColor';
import SelectFont from './Select/TextFont';

class Editor
{
    /**
     * Class constructor
     *
     * @param object settings
     * @return void
     */
    constructor( settings = {} )
    {
        //set settings
        this._setSettings( settings );

        this.editors = {};
    }

    /**
     * Setup editor
     *
     * @return Editor
     */
    setup()
    {
        let self = this;
        let editors = $( this.config.get( 'selector' ) );
        if ( editors.length > 0 )
        {
            editors.each( function()
            {
                let editor = self.buildEditor( $(this) );
                let editorEl = editor.getElement();
                let code = self.getUniqueCode();
                editorEl.attr( 'data-code', code );
                self.editors[code] = editor;
            });
        }
        return this;
    }

    /**
     * Build editor
     *
     * @param object element
     * @return string
     */
    buildEditor( element )
    {
        let editor = new Builder( element, this );
        editor.build();

        this.afterBuild( editor );

        return editor;
    }

    /**
     * After build editor
     *
     * @param object editor
     * @return string
     */
    afterBuild( editor )
    {
        //Select font
        new SelectFont( this, editor, {
            containerClass: '._button--font',
            currentClass: '._button--trigger',
            itemsClass: '._submenu'

        }).setup();

        //Select color
        new SelectColor( this, editor, {
            containerClass: '._button--color',
            currentClass: '._button--trigger',
            itemsClass: '._submenu'

        }).setup();
    }

    /**
     * Get unique code
     *
     * @return string
     */
    getUniqueCode()
    {
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < 5; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    /**
     * Set settings
     *
     * @param array settings
     * @return Modal
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
            "selector": '.texteditor',
            "maximumCharater": 100,
            "actions": {}
        };

        return settings;
    }

};

export default Editor;
