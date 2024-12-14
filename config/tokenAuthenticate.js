import jwtToken from "jsonwebtoken";



function authenticate(request, response, next) {

    jwtToken.verify(request.headers.authorization.split(" ")[1], process.env.JWT_SECRET, function (err, decoded) {
        if (err) {
            response.send({ status: false, message: err.message });
        } else {
            next();
        }


    });


}



export { authenticate }