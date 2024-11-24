import UserModel from "../models/UserModel.js";


class UserController {

    async registerUser(request, response) {
        try {
            let requestData = request.query;
            let userDatas = {
                userName: requestData.userName,
                password: requestData.password,
            }
            await UserModel.insert(userDatas)
            response.send('registered- check in database');
        } catch (error) {
            response.send('An Error Occured', error);
        }
    }
    
}

export default new UserController();