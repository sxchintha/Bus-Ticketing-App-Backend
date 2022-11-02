
async function retryOperation(externalServiceCall, retryCount) {
    let currentTry = 0;

    while (true) {
        try {
            return await externalServiceCall;
        } catch (error) {
            currentTry++;
            console.log(`Failed attempt ${currentTry}`);

            if (currentTry >= retryCount) {
                console.log('Retry maximum reached. Exiting.');
                return error;
            }
        }
    }
}

module.exports = retryOperation;
