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
            headers: customHeaders,
            mode: 'no-cors'
        })
        let data = await response.json()
        //console.log("DATA = " + JSON.stringify(data))
        return data;
    }


    async httpPost(url, reqBody, customHeaders = this.getDefaultHeaders()) {
        console.log(customHeaders)
        let response = await fetch(url, {
            method: 'POST',
            headers: customHeaders,
            mode: 'no-cors',
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
            mode: 'no-cors',
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
            mode: 'no-cors',
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