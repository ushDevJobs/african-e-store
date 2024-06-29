import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import ModalWrapper from '../components/Modal/ModalWrapper'
import styles from '../styles/AddProductModal.module.scss'
import { MateriaSymbolIcon, TimesIcon } from '../components/SVGs/SVGicons'
import { AddProductRequest } from '../components/models/IProduct'
import Image from 'next/image'
import { useAddProduct } from '../api/apiClients'
import { toast } from 'sonner'
import { createCustomErrorMessages } from '../components/constants/catchError'
import { DatePicker } from '@fluentui/react'
import moment from 'moment'

type Props = {
    visibility: boolean
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

const AddProductModal = ({ visibility, setVisibility }: Props) => {
    const addProduct = useAddProduct();
    const [formValues, setFormValues] = useState<AddProductRequest>();
    console.log('formValues', formValues)
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<string>();
    const [image1, setImage1] = useState<string>();
    const [image2, setImage2] = useState<string>();
    const [image3, setImage3] = useState<string>();
    const [image4, setImage4] = useState<string>();

    const [priceErrorMsg, setPriceErrorMsg] = useState(false);
    const [imageErrorMsg, setImageErrorMsg] = useState<boolean | string>(false);
    const [nameErrorMsg, setNameErrorMsg] = useState(false);
    const [quantityErrorMsg, setQuantityErrorMsg] = useState(false);
    const [conditionErrorMsg, setConditionErrorMsg] = useState(false);
    const [saleTypeErrorMsg, setSaleTypeErrorMsg] = useState(false);
    const [endDateErrorMsg, setEndDateErrorMsg] = useState(false);
    const [categoryErrorMsg, setCategoryErrorMsg] = useState(false);
    const [descErrorMsg, setDescErrorMsg] = useState(false);

    /**
    * Function to handle image file upload and update form values
    * @param e is the event handler
    * @returns void
    */
    // const handleFileUpload = (e: any, name: string) => {

    //     // Get the selected file
    //     const selectedFile: File = e.target.files[0];

    //     // If a valid file was selected...
    //     if (selectedFile.type === "image/jpg" || selectedFile.type === "image/png" || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/webp') {

    //         // Unset validation message
    //         setImageErrorMsg(false);

    //         const file = e.target.files[0]; // Get the selected file

    //         if (file) {
    //             const reader = new FileReader();

    //             reader.onload = (e) => {
    //                 const base64URL: string = e.target?.result as string; // This is the base64 URL of the image

    //                 if (base64URL) {
    //                     // Extract only the base64 string (remove "data:image/jpeg;base64," prefix)
    //                     const base64String = base64URL.split(',')[1];

    //                     console.log('base64URL: ', base64String);

    //                     // Update form values 
    //                     setFormValues({ ...formValues as AddProductRequest, [name]: base64String });
    //                 }
    //             };

    //             // Read the file as a data URL (base64-encoded)
    //             reader.readAsDataURL(file);
    //         }
    //     }
    //     // Otherwise...
    //     else {
    //         // Set appropriate validation message
    //         setImageErrorMsg('Please select a valid photo');

    //         // Exit this method
    //         return;
    //     }

    //     // Set the image url
    //     const imgURL = URL.createObjectURL(selectedFile);

    //     // Update the image url state
    //     if (name === 'image') {
    //         setFile(imgURL);
    //     }
    //     if (name === 'imageOne') {
    //         setImage1(imgURL);
    //     }
    //     if (name === 'imageTwo') {
    //         setImage2(imgURL);
    //     }
    //     if (name === 'imageThree') {
    //         setImage3(imgURL);
    //     }
    //     if (name === 'imageFour') {
    //         setImage4(imgURL);
    //     }
    // };


    const handleFileUpload = (e: any, name: string) => {
        // Get the selected file
        const selectedFile: File = e.target.files[0];

        // If a valid file was selected...
        if (selectedFile.type === "image/jpg" || selectedFile.type === "image/png" || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/webp') {

            // Unset validation message
            setImageErrorMsg(false);

            // Set the image URL
            const imgURL = URL.createObjectURL(selectedFile);

            // Update the image URL state
            if (name === 'image') {
                setFile(imgURL);
            }
            if (name === 'imageOne') {
                setImage1(imgURL);
            }
            if (name === 'imageTwo') {
                setImage2(imgURL);
            }
            if (name === 'imageThree') {
                setImage3(imgURL);
            }
            if (name === 'imageFour') {
                setImage4(imgURL);
            }

            // Optionally, update form values with the URL or the File object itself
            // Here I'm setting the File object
            setFormValues({ ...formValues as AddProductRequest, [name]: selectedFile });
        }
        // Otherwise...
        else {
            // Set appropriate validation message
            setImageErrorMsg('Please select a valid photo');

            // Exit this method
            return;
        }
    };


    function onFormValueChange(e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
        stateFunction?: (value: React.SetStateAction<boolean>) => void
    ) {

        const { name, value } = e.target;

        if (name == "price") {
            setFormValues({ ...formValues as AddProductRequest, price: Number(value) });
            return;
        }

        if (name !== "price") {
            setFormValues({ ...formValues as AddProductRequest, [name]: value });
        }

        stateFunction && stateFunction(false)
    };

    function validateFields() {
        return true
        // if (tourRequest &&
        //     tourRequest.title &&
        //     tourRequest.image &&
        //     tourRequest.location) {

        //     return true;
        // } else {
        //     // console.log('form validation failed');

        //     if (!tourRequest?.title) {
        //         setTitleErrorMsg(true);
        //     } else {
        //         setTitleErrorMsg(false);
        //     }
        //     if (!tourRequest?.image) {
        //         setImageErrorMsg(true);
        //     } else {
        //         setImageErrorMsg(false);
        //     }
        //     if (!tourRequest?.location) {
        //         setLocationErrorMsg(true);
        //     } else {
        //         setLocationErrorMsg(false);
        //     }
        //     if (!tourRequest?.status) {
        //         setStatusErrorMsg(true);
        //     } else {
        //         setStatusErrorMsg(false);
        //     }
        //     if (!tourRequest?.rating) {
        //         setRatingErrorMsg(true);
        //     } else {
        //         setRatingErrorMsg(false);
        //     }
        //     if (!tourRequest?.startDate) {
        //         setStartDateErrorMsg(true);
        //     } else {
        //         setStartDateErrorMsg(false);
        //     }
        //     if (!tourRequest?.endDate) {
        //         setEndDateErrorMsg(true);
        //     } else {
        //         setEndDateErrorMsg(false);
        //     }
        //     if (!tourRequest?.overview) {
        //         setOverviewErrorMsg(true);
        //     } else {
        //         setOverviewErrorMsg(false);
        //     }
        //     // if (!tourRequest?.tourImages) {
        //     //     setTourImagesErrorMsg(true);
        //     // } else {
        //     //     setTourImagesErrorMsg(false);
        //     // }
        //     if (includedItems.length < 1) {
        //         setIncludedItemsErrorMsg(true);
        //     } else {
        //         setIncludedItemsErrorMsg(false);
        //     }
        //     if (excludedItems.length < 1) {
        //         setExcludedItemsErrorMsg(true);
        //     } else {
        //         setExcludedItemsErrorMsg(false);
        //     }
        //     if (!tourRequest?.price) {
        //         setPriceErrorMsg(true);
        //     } else {
        //         setPriceErrorMsg(false);
        //     }

        //     return false;
        // }
    };

    async function handleCreateProduct(e: FormEvent<HTMLFormElement>) {

        // Prevent deafult actions 
        e.preventDefault();

        // Show loader 
        setIsLoading(true);

        if (validateFields()) {

            // Send request to create tour
            await addProduct(formValues as AddProductRequest)
                .then((response) => {

                    // Log response 
                    console.log(response);

                    // Display success 
                    toast.success('Product has been created successfully.');

                    // router.push('/product-tours');
                })
                .catch((error) => {
                    // Display error
                    const errorMessage = createCustomErrorMessages(error.response?.data)
                    toast.error(errorMessage)
                })
                .finally(() => {

                    // Close laoder 
                    setIsLoading(false);
                })
        } else {
            setIsLoading(false)
        }
    };

    const departureDateRef = useRef<HTMLDivElement>(null);

    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: 'transparent' }}
        >
            <form action="" className={styles.formFieldContainer} onSubmit={(e) => handleCreateProduct(e)}>
                <span onClick={() => setVisibility(false)} className=' ml-auto cursor-pointer flex items-end justify-end mb-6 w-fit'>
                    <TimesIcon />
                </span>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="name"><span>*</span>Name of product</label>
                        <input
                            type='text'
                            name="name"
                            id="name"
                            placeholder='Enter product name'
                            value={formValues ? formValues.name : ''}
                            onChange={(e) => onFormValueChange(e, setNameErrorMsg)}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quantity"><span>*</span>Product quantity</label>
                        <input
                            type="text"
                            name="quantity"
                            id="quantity"
                            placeholder='Enter number of product'
                            value={formValues ? formValues.quantity : ''}
                            onChange={(e) => onFormValueChange(e, setQuantityErrorMsg)}
                        />
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="condition"><span>*</span>Product state/condition</label>
                        <input
                            type="text"
                            name="condition"
                            id="condition"
                            placeholder='Brand new, Fairly used, refurbished '
                            value={formValues ? formValues.condition : ''}
                            onChange={(e) => onFormValueChange(e, setConditionErrorMsg)}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="price"><span>*</span>Product Price</label>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            placeholder='Enter product price'
                            value={formValues ? formValues.price : ''}
                            onChange={(e) => onFormValueChange(e, setPriceErrorMsg)}
                        />
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="salesType"><span>*</span>Sale type</label>
                        <input
                            type="text"
                            name="salesType"
                            id="salesType"
                            placeholder='Set for auction or one time'
                            value={formValues ? formValues.salesType : ''}
                            onChange={(e) => onFormValueChange(e, setSaleTypeErrorMsg)}
                        />
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="category"><span>*</span>Select category</label>
                        <select name="category" id="">
                            <option value="">Select category</option>
                        </select>
                    </div>
                </div>

                <div className={styles.formField}>
                    <label htmlFor="date">
                        <span>*</span>End date of bidding 
                    </label>
                    <div className={styles.datePickerContainer} ref={departureDateRef}>
                        <DatePicker
                            textField={{
                                style: {
                                    background: 'transparent'
                                },
                                borderless: true,
                            }}
                            calloutProps={{
                                gapSpace: 8,
                                target: departureDateRef
                            }}
                            placeholder="Select bidding end date"
                            ariaLabel="Select a date"
                            minDate={new Date()}
                            onSelectDate={(date) => {
                                // Set the form value
                                setFormValues({ ...formValues as AddProductRequest, date: `${moment(date).format('YYYY-MM-DD')}` });
                                // Unset error message 
                                setEndDateErrorMsg(false);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Tab') {
                                    // If shit key was enabled...
                                    if (e.shiftKey)
                                        // Exit to aviod backward tab
                                        return;
                                }
                            }}
                            underlined={false}
                            showGoToToday={false}
                            isMonthPickerVisible={false}
                        />

                    </div>
                    {endDateErrorMsg && <span className='text-red-500'>Please input the bidding end date</span>}
                </div>
                <div className={styles.additionalImage}>
                    <label className='mb-3' htmlFor="image">
                        <span className='text-[#fd6a02] text-sm'>*</span>Upload Image file
                    </label>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            {image1 ?
                                <span className={styles.image}>
                                    <Image src={image1} alt='product image' width={262} height={135} />
                                </span>
                                : <span className={styles.image}><MateriaSymbolIcon /></span>
                            }
                            <div className={styles.addFlight}>
                                {!image1 ? <button type='button'>
                                    <input type="file" onChange={(e) => handleFileUpload(e, 'imageOne')} />
                                    Select Image
                                </button> : <button type='button' className={styles.changeButton}>
                                    <input type="file" onChange={(e) => handleFileUpload(e, 'imageOne')} />
                                    Change Image</button>}

                            </div>
                        </div>
                        <div className={styles.card}>
                            {image2 ?
                                <span className={styles.image}>
                                    <Image src={image2} alt='product image' width={262} height={135} />
                                </span>
                                : <span className={styles.image}><MateriaSymbolIcon /></span>
                            }
                            <div className={styles.addFlight}>
                                {!image2 ? <button type='button'>
                                    <input type="file" onChange={(e) => handleFileUpload(e, 'imageTwo')} />
                                    Select Image
                                </button> : <button type='button' className={styles.changeButton}>
                                    <input type="file" onChange={(e) => handleFileUpload(e, 'imageTwo')} />
                                    Change Image</button>}
                            </div>
                        </div>

                        <div className={styles.card}>
                            {image3 ?
                                <span className={styles.image}>
                                    <Image src={image3} alt='product image' width={262} height={135} />
                                </span>
                                : <span className={styles.image}><MateriaSymbolIcon /></span>
                            }
                            <div className={styles.addFlight}>
                                {!image3 ? <button type='button'>
                                    <input type="file" onChange={(e) => handleFileUpload(e, 'imageThree')} />
                                    Select Image
                                </button> : <button type='button' className={styles.changeButton}>
                                    <input type="file" onChange={(e) => handleFileUpload(e, 'imageThree')} />
                                    Change Image</button>}

                            </div>
                        </div>

                        <div className={styles.card}>
                            {image4 ?
                                <span className={styles.image}>
                                    <Image src={image4} alt='product image' width={262} height={135} />
                                </span>
                                : <span className={styles.image}><MateriaSymbolIcon /></span>
                            }
                            <div className={styles.addFlight}>
                                {!image4 ? <button type='button'>
                                    <input type="file" onChange={(e) => handleFileUpload(e, 'imageFour')} />
                                    Select Image
                                </button> : <button type='button' className={styles.changeButton}>
                                    <input type="file" onChange={(e) => handleFileUpload(e, 'imageFour')} />
                                    Change Image</button>}

                            </div>
                        </div>

                    </div>
                </div>
                <div className={styles.formField}>
                    <label htmlFor="description"><span>*</span>Product description</label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder='Enter detailed description here'
                        value={formValues ? formValues.description : ''}
                        onChange={(e) => onFormValueChange(e, setDescErrorMsg)}
                    />
                </div>
                <div className={styles.btnContainer}>
                    <button type='submit' disabled={isLoading}>Upload Product</button>
                    <button>Save as Draft</button>
                </div>
            </form>
        </ModalWrapper>
    )
}

export default AddProductModal