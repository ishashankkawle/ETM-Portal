
    export function generateJSONObject(arrKey, arrValue) {
        if (arrKey.length !== arrValue.length) {
            return;
        }
        let objJSON = {};
        for (let index = 0; index < arrKey.length; index++) {
            objJSON[arrKey[index]] = arrValue[index];
        }
        return objJSON;
    }

    export function generateCustomArrayString(wrapper, arr, arrIndexToIgnore) {
        let str = "";

        if (arr.length == 1) {
            return wrapper + arr[0] + wrapper
        }

        for (let index = 0; index < (arr.length) - 1; index++) {
            let igoreFlag = false;
            if (arrIndexToIgnore != undefined) {
                for (let index2 = 0; index2 < arrIndexToIgnore.length; index2++) {
                    if (index == arrIndexToIgnore[index2]) {
                        igoreFlag = true;
                    }

                }
            }
            if (!igoreFlag) {
                if (index == 0) {
                    str = wrapper + arr[index] + wrapper + ",";
                }
                else {
                    str = str + wrapper + arr[index] + wrapper + ",";
                }
            }
            else {
                str = str + arr[index] + ",";
            }
        }
        return str + wrapper + arr[(arr.length) - 1] + wrapper
    }

    export function getCurrentDateString() {
        let currentDateObj = new Date();
        let dateStr = (currentDateObj.getMonth() + 1) + "-" + currentDateObj.getDate() + "-" + currentDateObj.getFullYear();
        return dateStr;
    }

    export function getSelectOptionsList(arrData, dataKey, dataValue , ifAddDefaultOption = false , defaultOptionText = "") {
        let dataArray = [];

        if(ifAddDefaultOption)
        {
            dataArray.push(<option key={-1} value={''}>{defaultOptionText}</option>)
        }
        for (let index = 0; index < arrData.length; index++) {
            
            dataArray.push(<option key={arrData[index][dataKey]} value={arrData[index][dataKey]}>{arrData[index][dataValue]}</option>);
        }
        return dataArray;
    }

    export function removeElementsFromArray(arrData , arrElementsToBeRemoved) 
    {
        return arrData.filter( ( el ) => !arrElementsToBeRemoved.includes( el ) );
    }

    export function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    export function generateCustomWrapperArray(wrapper, arr, arrIndexToIgnore) 
    {
        let finalArray = [];

        for (let index = 0; index < (arr.length); index++) {
            let igoreFlag = false;
            if (arrIndexToIgnore != undefined) 
            {
                for (let index2 = 0; index2 < arrIndexToIgnore.length; index2++) {
                    if (index == arrIndexToIgnore[index2]) 
                    {
                        igoreFlag = true;
                    }

                }
            }
            if (!igoreFlag) 
            {
                finalArray.push(wrapper + arr[index] + wrapper)
            }
            else 
            {
                finalArray.push(arr[index]);
            }
        }
        return finalArray;
    }

    export function getSubArray(arrKey , arrData)
    {
        let arrFinal = [];
        for (let indexData = 0; indexData < arrData.length; indexData++) {
            let obj = arrData[indexData];
            let currentObj = {};
            for (let indexKey = 0; indexKey < arrKey.length; indexKey++) {
                currentObj[arrKey[indexKey]] = obj[arrKey[indexKey]];
            }
            arrFinal.push(currentObj);
        }
        return arrFinal
    }

    export function readFile(fileData)
    {
        let reader = new FileReader();
        return new Promise((resolve , reject) => {
            reader.onload = () => {
                resolve(reader.result);
            }
            reader.readAsText(fileData)
        })
    }

    export function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    export async function sleep(milliseconds)
    {
        await new Promise((resolve) => 
            setTimeout(resolve , milliseconds)
        )
    }

    export function getDateDifference(startDate , endDate) 
    {
        let date1 = new Date(startDate); 
        let date2 = new Date(endDate);         
        let Difference_In_Time = date2.getTime() - date1.getTime();         
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
        return Difference_In_Days
    }