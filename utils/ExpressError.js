// Express Error Handling

class ExpressError extends Error {          // Error :- Javascript built-in class 

    constructor(statusCode, message) {      // statusCode, message :- Custom properties 

        super();                            // super() :- Call parent class (Error)

        this.statusCode = statusCode;       // statusCode :- HTTP status
        this.message = message;             // message :- error message

    }
}

module.exports = ExpressError;


/*

# USE CODE :- 

    throw new ExpressError(404, "Page Not Found");

*/
