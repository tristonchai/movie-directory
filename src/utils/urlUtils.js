/**
 * get value of the param
 * @param {*} paramName 
 * @returns 
 */
export const getUrlParam = (paramName) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(paramName);
}

/**
 * get all param and list in object
 */
export const getAllUrlParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    let urlObj = {};
    for(const [key, value] of urlParams){
        urlObj[key] = value;
    }
    return urlObj;
}

/**
 * set or append param to url
 * @param {*} paramName 
 * @param {*} value 
 */
export const setUrlParam = (paramName, value) => {
    const currentPath = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);

    // console.log(currentPath, urlParams)
    // console.log("check param value", urlParams.get(paramName))
    if(!urlParams.get(paramName)){
        // console.log("APPEND PARAMS: ", paramName, value)
        urlParams.append(paramName, value)
    } else {
        // console.log("REPLACED PARAMS: ", paramName, value)
        urlParams.set(paramName, value)
    }
    window.history.pushState({}, "", `${currentPath}?${urlParams}`)
}

export const removeUrlParam = (paramName) => {
    const currentPath = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);

    if(urlParams.get(paramName)){
        // console.log("delete: ", paramName)
        urlParams.delete(paramName)
    }
    window.history.pushState({}, "", `${currentPath}?${urlParams}`)
}

