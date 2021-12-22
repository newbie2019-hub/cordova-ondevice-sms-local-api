document.addEventListener('deviceready', onDeviceReady, false);

const consolePrint = document.getElementById('console-print');
const consolePrintMsg = document.getElementById('console-print-2');
const startBtn = document.getElementById('start-server');
startBtn.addEventListener('click', startServer, false);

let smsStatus = 200

function onDeviceReady() {
    requestSMSPermission()
    StatusBar.overlaysWebView(true);
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function startServer(){
    if(startBtn.innerHTML == 'Stop Server'){
        startBtn.innerHTML = 'Stopping Server ...'
        webserver.stop();

        setTimeout(() => {
            consolePrint.innerHTML = `Server is not running`
            startBtn.innerHTML = 'Start Server'
        }, 1100)
    }
    else {
        startBtn.innerHTML = 'Starting Server ...'
        webserver.start();
        webServerEvents()

        setTimeout(() => {
            networkinterface.getWiFiIPAddress( (ipDeviceInfo => {
                consolePrint.innerHTML = `Server: ${ipDeviceInfo.ip}:8080`
            }));
            startBtn.innerHTML = 'Stop Server'
        }, 1100)

    }
}

function checkSMSPermission() {
        var success = function (hasPermission) { 
            if (hasPermission) {
               return true
            }
            else {
               alert('Permission for sending sms is required')
            }
        };
        var error = function (e) { alert('Something went wrong:' + e); };
        sms.hasPermission(success, error);
}

function requestSMSPermission() {
    var success = function (hasPermission) { 
        if (!hasPermission) {
            sms.requestPermission(function() {
                console.log('[OK] Permission accepted')
            }, function(error) {
                console.info('[WARN] Permission not accepted')
                // Handle permission not accepted
            })
        }
    };
    var error = function (e) { alert('Something went wrong:' + e); };
    sms.hasPermission(success, error);
}

function webServerEvents(){
    
    webserver.onRequest(function(request){
    
        console.log(request)
    
        const url = new URL(`http://localhost:8080/?${request.query}`);
        const msg = url.searchParams.get("msg");      
        const num = url.searchParams.get("num");      
        
        consolePrintMsg.innerHTML = msg + num
    
        if(num != null || num != ''){
            sendSMS(num, msg)
        }
    
        webserver.sendResponse(
            request.requestId,
            {
                status: smsStatus,
                body: `<html>${JSON.stringify(request)}</html>`,
                headers: {
                    'Content-Type': 'text/html'
                }
            },
        );
    })
}

function sendSMS(num, msg) {

    var options = {
        replaceLineBreaks: true,
        android: {
            intent: ''
        }
    };

    var success = function () { console.log('Message sent successfully'); smsStatus = 200 };
    var error = function (e) { console.log('Message Failed:' + e); smsStatus = 500 };

    sms.send(num, msg, options, success, error);
}
