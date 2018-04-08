//
// Ajax Handler
//
import api from 'axios';

export default
{
    /**
     * Send ajax request
     *
     * @param string method
     * @param string url
     * @param object data
     * @param object succCb
     * @param object errCb
     *
     * @return boolean
     */
    request( method, url, data, succCb = null, errCb = null )
    {
        return api({
            method: method,
            url: this.getApiUrl( url ),
            data: data,
            headers: this.getHeaders()
        }).then(succCb).catch(errCb);
   },

    /**
     * Get API Url
     *
     * @param string url
     * @return string
     */
    getApiUrl( url )
    {
        return url;
    },

    /**
     * Get headers
     *
     * @return object
     */
    getHeaders()
    {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
    },

    /**
     * Send ajax get request
     *
     * @param string url
     * @param object data
     * @param object succCb
     * @param object errCb
     *
     * @return boolean
     */
    get (url, data = {}, succCb = null, errCb = null) {
        return this.request('GET', url, data, succCb, errCb);
    },

    /**
     * Send ajax post request
     *
     * @param string url
     * @param object data
     * @param object succCb
     * @param object errCb
     *
     * @return boolean
     */
    post (url, data = {}, succCb = null, errCb = null) {
        return this.request('POST', url, data, succCb, errCb);
    },

    /**
     * Send ajax put request
     *
     * @param string url
     * @param object data
     * @param object succCb
     * @param object errCb
     *
     * @return boolean
     */
    put (url, data = {}, succCb = null, errCb = null) {
        return this.request('PUT', url, data, succCb, errCb);
    },

    /**
     * Send ajax delete request
     *
     * @param string url
     * @param object data
     * @param object succCb
     * @param object errCb
     *
     * @return boolean
     */
    delete (url, data = {}, succCb = null, errCb = null) {
        return this.request('DELETE', url, data, succCb, errCb);
    }
};
