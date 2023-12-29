import axios from 'axios';

class HttpHandler {

    getDefaultHeaders() {
        return { "Content-Type": "application/json" }
        //return { "Content-Type": "application/java" }
    }
    getDefaultMultipartHeaders() {
        return { 'Content-Type': undefined }
    }

    async httpGet(url, customHeaders = this.getDefaultHeaders()) {
        let response = await fetch(url, {
            method: 'GET',
            headers: customHeaders
        })
        let data = await response.json()
        //console.log("DATA = " + JSON.stringify(data))
        return data;
    }


    async httpPost(url, reqBody, customHeaders = this.getDefaultHeaders()) {
        let response = await fetch(url, {
            method: 'POST',
            headers: customHeaders,
            body: JSON.stringify(reqBody)
        })
        let data =  await response.json()
        //console.log("DATA = " + JSON.stringify(data))
        return data;
    }

    async httpPut(url, reqBody, customHeaders = this.getDefaultHeaders()) {
        let response = await fetch(url, {
            method: 'PUT',
            headers: customHeaders,
            body: JSON.stringify(reqBody)
        })
        let data = await response.json()
        //console.log("DATA = " + JSON.stringify(data))
        return data;
    }
    
    async httpDelete(url, reqBody, customHeaders = this.getDefaultHeaders()) {
        let response = await fetch(url, {
            method: 'DELETE',
            headers: customHeaders,
            body: JSON.stringify(reqBody)
        })
        let data = await response.json()
        //console.log("DATA = " + JSON.stringify(data))
        return data;
    }

    async httpPutMultiartData(url, data , customHeaders) {
        data = await axios.put(url, data, { headers: customHeaders}).then(function (response) {
            return response.data;
        });
        return data;
    }
    
    async httpPostMultiartData(url, data , customHeaders) {
        data = await axios.post(url, data, { headers: customHeaders}).then(function (response) {
                return response.data;
            });
        return data;
    }
}

export default HttpHandler