import UserModel from "../models/UserModel.js";
import jwtToken from "jsonwebtoken";
import crypto from "node:crypto";
import ProductModel from "../models/ProductModel.js";



class UserController {

    async registerUser(request, response) {
        try {
            let requestData = request.body;
            let returnData = { status: false, message: 'An Error Occured' };
            if ((requestData.userName && requestData.userName.trim() != '') && (requestData.password && requestData.password.trim() != '')) {

                if (requestData.password.length >= 8) {
                    let getPassword = crypto.createHash('md5').update(requestData.password).digest('hex').toString();
                    let userDatas = {
                        userName: requestData.userName,
                        password: getPassword,
                        mobileNo: requestData.mobileNo,
                        emailId: requestData.emailId,
                        role: requestData.role,
                    }

                    await UserModel.insert(userDatas);
                    returnData = { status: true, message: 'Registered' };
                } else {
                    returnData = { status: false, message: 'password must be min 8 char' };
                }

            } else {
                returnData = { status: false, message: 'in valid request' };
            }


            response.send(returnData);
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
    async getUserDetailsByid(request, response, next) {
        try {
            let userId = request.body.userId;
            let getData = await UserModel.model.findOne({ _id: userId });
            response.send({ status: true, getData, message: 'success' });
        } catch (error) {
            response.send({ status: false, message: 'An Error Occured', error });
        }
    }
    async add_product(request, response, next) {
        try {
            let fileName = "";
            if (request.file?.filename) {
                fileName = request.file.filename;
            }




            let insertData = {
                productName: request.body.productName,
                productPrize: request.body.productPrize,
                productFileName: fileName
            }


            let productId = request.body.productId;
            if (productId && productId != '') {
                await ProductModel.update(productId, insertData)
            } else {
                await ProductModel.insert(insertData)
            }


            response.send({ status: true, message: 'success' });
        } catch (error) {
            response.send({ status: false, message: 'An Error Occured', error });
        }
    }

    async productLists(request, response, next) {
        try {

            let getProducts = await ProductModel.getProducts();
            let productData = [];
            for (let productData1 of getProducts) {
                productData.push({
                    id: productData1._id,
                    name: productData1.productName,
                    prize: productData1.productPrize,
                    productImage: 'http://localhost:4000/uploads/products/' + productData1.productFileName
                })
            }
            response.send({ status: true, message: 'success', productData: productData });
        } catch (error) {
            response.send({ status: false, message: 'An Error Occured', error });
        }
    }
    async getProduct(request, response, next) {
        try {

            let requestData = request.query;
            let productId = requestData.productId;

            let productData = await ProductModel.getProductById(productId);




            productData = { ...productData._doc, image: 'http://localhost:4000/uploads/products/' + productData.productFileName }


            response.send({ status: true, message: 'success', productData: productData });
        } catch (error) {
            response.send({ status: false, message: 'An Error Occured', error });
        }
    }

}

export default new UserController();