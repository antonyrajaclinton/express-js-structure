import UserModel from "../models/UserModel.js";
import jwtToken from "jsonwebtoken";
 


class UserController {

    async registerUser(request, response) {
        try {
            let requestData = request.body;
            let userDatas = {
                userName: requestData.userName,
                password: requestData.password,
                mobileNo: requestData.mobileNo,
                emailId: requestData.emailId,
                role: requestData.role,
            }
            await UserModel.insert(userDatas);
            response.send({ status: true, message: 'registered- check in database' });
        } catch (error) {
            response.send({ status: false, message: 'An Error Occured', error });
        }
    }
    async login(request, response) {
        try {
            let loginValidate = false;
            let token = "";
            let requestData = request.body;
            let getData = await UserModel.findByQueries({ emailId: requestData.emailId, password: requestData.password });
            if (getData) {
                loginValidate = true;
                let jwtData = {
                    userName: getData.userName,
                    userId: getData.id
                }
                token = jwtToken.sign(jwtData, process.env.JWT_SECRET);
            }

            response.send({ status: loginValidate, token, message: (loginValidate) ? 'success' : 'failed' });
        } catch (error) {
            response.send({ status: false, message: 'An Error Occured', error });
        }
    }

    async getUserList(request, response, next) {
        try {
            let getData = await UserModel.model.find();
            response.send({ status: true, getData, message: 'success' });
        } catch (error) {
            response.send({ status: false, message: 'An Error Occured', error });
        }
    }

}

export default new UserController();