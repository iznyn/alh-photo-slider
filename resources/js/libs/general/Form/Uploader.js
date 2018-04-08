//
// Uploader file
//
import _ from 'lodash';
import Config from './../Config';
import Dom from './../Dom';

class Uploader
{
    /**
     * Constructor
     *
     * @param object input
     * @param object settings
     * @return void
     */
    constructor( input, settings = {} )
    {
        this.files = [];
        this.input = new Dom( input );
        this.config = null;
        this.preview = false;

        //set messages
        this.messages = this._getMessages();

        //set settings
        this._setSettings( settings );
    }

    /**
     * Get all files
     *
     * @return array
     */
    files()
    {
        return this.files;
    }

    /**
     * Get all files
     *
     * @param int index
     * @return object
     */
    file( index )
    {
        let file = false;
        if ( typeof this.files[index] !== 'undefined' ) {
            file = this.files[index];
        }
        return file;
    }

    /**
     * Setup file input
     *
     * @return Uploader
     */
    setup()
    {
        this.prepare();
        this.onchange();
    }

    /**
     * Preparing file input
     *
     * @return Uploader
     */
    prepare()
    {
    }

    /**
     * Event on change
     *
     * @return Uploader
     */
    onchange()
    {
        let self = this;
        this.input.on( 'change', (el, ev ) => {

            self.selecting( ev );
        });
    }

    /**
     * Handler select file
     *
     * @param object e
     * @return Uploader
     */
    selecting( e )
    {
        let file = this.getSelectedFile( e );
        let errors = this.checkFile( file );
        if ( errors.length == 0 )
        {
            //Set file
            this.files.push( file );
            //load image preview
            this.loadImagePreview( file );
            //processing file
            this.processingFile( file, e );
        }
        else {
            this.errorFile( errors, e );
        }
    }

    /**
     * Get image preview
     *
     * @param object file
     * @return mixed
     */
    loadImagePreview( file )
    {
        if ( file.type.match( 'image.*' ) )
        {
            var reader = new FileReader();
            reader.addEventListener("load", () => {

                this.showImagePreview( reader, file );
            },
            false);
            reader.readAsDataURL( file );
        }
    }

    /**
     * Show image preview
     *
     * @param object reader
     * @param object file
     * @return mixed
     */
    showImagePreview( reader, file )
    {
    }

    /**
     * Processing file
     *
     * @param object file
     * @param object e
     * @return mixed
     */
    processingFile( file, e )
    {
    }

    /**
     * Handling if file is error
     *
     * @param array errors
     * @param object e
     * @return mixed
     */
    errorFile( errors, e )
    {
    }

    /**
     * Checking file
     *
     * @param object file
     * @return array
     */
    checkFile( file )
    {
        let errors = [];

        //Check max size file
        if ( this.config.get( 'maxSize' ))
        {
            let maxSize = parseInt( this.config.get( 'maxSize' ) );
            if ( maxSize < file.size ) {
                let msg = this.messages.size;
                msg = msg.replace( '{maxSize}', maxSize );
                errors.push( msg );
            }
        }

        //Check file type
        if ( this.config.get( 'extensions' ))
        {
            let extensions = this.config.get( 'extensions' );
            if ( ! file.type.match( extensions ) ) {
                let msg = this.messages.type;
                msg = msg.replace( '{extensions}', extensions );
                errors.push( msg );
            }
        }

        return errors;
    }

    /**
     * Handler select file
     *
     * @param object e
     * @return Uploader
     */
    getSelectedFile( e )
    {
        let file = false;
        if ( typeof e.target.files[0] !== 'undefined' )
        {
            file = e.target.files[0];
        }
        return file;
    }

    /**
     * Set settings
     *
     * @param array settings
     * @return Uploader
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
            maxSize: 3200000,
            extensions: 'image.*'
        };
        return settings;
    }

    /**
     * Get error messages
     *
     * @return object
     */
    _getMessages()
    {
        let messages = {
            size: 'Your image too large. Max size: {maxSize}.',
            type: 'You must select an file {extensions}.'
        };
        return messages;
    }
};

export default Uploader;
