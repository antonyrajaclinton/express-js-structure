import Axios from 'axios';
import React, { useState } from 'react'

function AddProducts() {
    const [productName, setProductName] = useState<string>('');
    const [productNameError, setProductNameError] = useState<string>('');
    const [productPrize, setProductPrize] = useState<string>('');
    const [productPrizeError, setProductPrizeError] = useState<string>('');
    const [productReview, setProductReview] = useState<string>('');
    const [filePreview, setfilePreview] = useState<string>('');
    const [fileSent, setfileSent] = useState<string>('');
    // const [productImage, setProductImage] = useState<string>();


    const storeFile = (evt: any) => {

        setfilePreview(URL.createObjectURL(evt.target.files[0]));
        setfileSent(evt.target.files[0]);


    }

    const saveData = () => {
        setProductNameError('')
        setProductPrizeError('')
        let returnStatus = true;
        if (productName == '') {
            setProductNameError('error');
            returnStatus = false;
        }
        if (productPrize == '') {
            setProductPrizeError('error')
            returnStatus = false;
        }

        if (returnStatus) {
            let token = sessionStorage.getItem('token');
            let formData = new FormData();
            formData.append("productName", productName);
            formData.append("productPrize", productPrize);
            formData.append("productReview", productReview);
            formData.append("productImage", fileSent);

            Axios.post(import.meta.env.VITE_SERVER_URL + '/user/add_product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization": 'Bearer ' + token
                }
            }).then(function (response) {
                if (response.data.status) {

                } else {
                    alert('error')
                }
            }).catch(function (error) {
                console.log(error);
            });


        }


    }


    return (
        <div>
            <div>Add Product</div>

            <div>
                <div>
                    product name <span style={{ color: 'red' }}> *</span>
                </div>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
                {productNameError === 'error' && <div><span style={{ color: 'red', fontSize: 10 }}>product name reuired</span></div>}

            </div>
            <div>
                <div>
                    product prize <span style={{ color: 'red' }}> *</span>
                </div>
                <input type="text" value={productPrize} onChange={(e) => setProductPrize(e.target.value)} />
                {(productPrizeError === 'error') ? <div><span style={{ color: 'red', fontSize: 10 }}>prize require</span></div> : ''}
            </div>
            <div>
                product image
                <div>

                    <input type="file" accept='.jpeg,.jpg,.mp4,.png' onChange={storeFile} />
                </div>
            </div>
            <div>
                product preview
                <div>

                    <img style={{ height: 250, width: 250 }} src={filePreview} alt='product preview' />

                </div>

            </div>
            <div>
                <div>
                    review
                </div>
                <div>
                    <textarea onChange={(e) => setProductReview(e.target.value)} value={productReview}></textarea>

                </div>
            </div>
            <div>
                <button onClick={saveData}>save</button>
            </div>

        </div>
    )
}

export default AddProducts
