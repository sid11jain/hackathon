/**
 * Sample method to create JSON object which will be sent to sever side.
 *
 */
function insertRecords() {
    var myVar = {
        "Hello": "Welcome",
        "test": "value"
    };
    ajaxSubmitPayload(myVar, getSubmitUrl());
}

function print() {
    var myVar = {
        "Hello": "Welcome",
        "test": "value"
    };
    ajaxSubmitPayload(myVar, getPrintUrl());
}


/**
 * Makes ajax REST call to backend to submit the data.
 *
 * @param dataReceived
 */
function ajaxSubmitPayload(dataReceived, urlPath) {
    var statusOK = 200;
    var statusError = 500;//internal server error code
    var timeOutInMils = 60 * 1000;//set 1 minute of timeout
    var payloadData = {"payloadData": JSON.stringify(dataReceived)};
    $.ajax({
        type: 'POST',
        url: urlPath,
        contentType: 'application/json',
        timeout: timeOutInMils,
        dataType: "json",
        data: JSON.stringify(payloadData),
        success: handleExit(statusOK),
        error: handleExit(statusError)
    });
}

/**
 * Fallback method to handle any exception or successful call.
 *
 * @param status
 */
function handleExit(status) {
}

/**
 * Returns REST URL.
 *
 * @returns {string}
 */
function getSubmitUrl() {
    return "/hub/addIdea";
}

function getPrintUrl() {
    return "/hub/print";
}