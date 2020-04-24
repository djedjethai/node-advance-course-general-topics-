// node my file.js

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

// new timers, tasks, operations are recorded from myFile runnng
myFile.runContents();

function shouldContinue() {
    // Check one: Any pending req setTimeout(), setInterval(), setImmediate(); 
    // check two: Any pending os task (like server listening to port)
    // check three: any pending long running operation (like fileSystem module)
    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length 
}

// entire body execute in one 'tick' (in every event loop)
while(shouldContinue()) {
    //1. node looks at pendingTimers ans sees if any functions are ready to be call.
    // setTimeout(), setInterval()

    //2. node looks at pendingOSTasks and pendingOperations and call relevant callBacks

    //3. pause execution. Continue when 
    // - a new pendingOSTask is done
    // - a new pendingOperation is done
    // - a timer is about to complete

    //4. look at pendingTimers. call any setImmediate()
    
    //5. handle any 'close' events (mainly, at closing event we will run a cleaning code, to keep the program execution clean)
}

// exit back to terminal