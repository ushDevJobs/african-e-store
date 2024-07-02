import React, {
    ChangeEvent,
    FormEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import ModalWrapper from "../components/Modal/ModalWrapper";
import styles from "../styles/AddProductModal.module.scss";
import { MateriaSymbolIcon, TimesIcon } from "../components/SVGs/SVGicons";
import { AddProductRequest } from "../components/models/IProduct";
import Image from "next/image";
import {
    useAddProduct,
    useFetchCategoriesWithoutProducts,
} from "../api/apiClients";
import { toast } from "sonner";
import { createCustomErrorMessages } from "../components/constants/catchError";
import { DatePicker } from "@fluentui/react";
import moment from "moment";
import { CategoriesResponse } from "../components/models/AllCategories";

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    handleFetchProducts: () => Promise<void>
};

const AddProductModal = ({ visibility, setVisibility, handleFetchProducts }: Props) => {
    const addProduct = useAddProduct();
    const fetchCategories = useFetchCategoriesWithoutProducts();
    const [formValues, setFormValues] = useState<AddProductRequest>();
    console.log("formValues", formValues);
    const [isLoading, setIsLoading] = useState(false);
    const [file, setFile] = useState<File>();
    const [image1, setImage1] = useState<File>();
    const [image2, setImage2] = useState<File>();
    const [image3, setImage3] = useState<File>();
    const [image4, setImage4] = useState<File>();
    const [selectedConditions, setSelectedConditions] = useState<string>("");
    const [selectedSalesType, setSelectedSalesType] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const [priceErrorMsg, setPriceErrorMsg] = useState(false);
    const [imageErrorMsg, setImageErrorMsg] = useState<boolean | string>(false);
    const [nameErrorMsg, setNameErrorMsg] = useState(false);
    const [quantityErrorMsg, setQuantityErrorMsg] = useState(false);
    const [conditionErrorMsg, setConditionErrorMsg] = useState(false);
    const [saleTypeErrorMsg, setSaleTypeErrorMsg] = useState(false);
    const [endDateErrorMsg, setEndDateErrorMsg] = useState(false);
    const [categoryErrorMsg, setCategoryErrorMsg] = useState(false);
    const [descErrorMsg, setDescErrorMsg] = useState(false);
    const [categories, setCategories] = useState<CategoriesResponse[]>([]);
    const [showEndDateField, setShowEndDateField] = useState(false); // State to manage visibility of bidding end date
    /**
     * Function to handle image file upload and update form values
     * @param e is the event handler
     * @returns void
     */

    async function handleFetchAllCategories() {
        // Start loader

        await fetchCategories()
            .then((response) => {
                console.log("Response: ", response.data.data);
                setCategories(response.data.data);
                // Persist all categories data in session storage
                // sessionStorage.setItem(
                //     StorageKeys.AllCategories,
                //     JSON.stringify(response.data.data)
                // );
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data);
                toast.error(errorMessage);
            })
            .finally(() => { });
    }

    useEffect(() => {
        handleFetchAllCategories();
    }, []);

    const handleFileUpload = (e: any, name: string) => {
        // Get the selected file
        const selectedFile: File = e.target.files[0];

        // If a valid file was selected...
        if (
            selectedFile.type === "image/jpg" ||
            selectedFile.type === "image/png" ||
            selectedFile.type === "image/jpeg" ||
            selectedFile.type === "image/webp"
        ) {
            // Unset validation message
            setImageErrorMsg(false);

            console.log("working", name);
            // Set the image URL
            const imgURL = URL.createObjectURL(selectedFile);

            // Update the image URL state
            if (name === "image") {
                setFile(selectedFile);
            }
            if (name === "imageOne") {
                console.log("nice");
                setImage1(selectedFile);
            }
            if (name === "imageTwo") {
                setImage2(selectedFile);
            }
            if (name === "imageThree") {
                setImage3(selectedFile);
            }
            if (name === "imageFour") {
                setImage4(selectedFile);
            }

            // Optionally, update form values with the URL or the File object itself
            // Here I'm setting the File object
            setFormValues({
                ...(formValues as AddProductRequest),
                [name]: selectedFile,
            });
        }
        // Otherwise...
        else {
            // Set appropriate validation message
            setImageErrorMsg("Please select a valid photo");

            // Exit this method
            return;
        }
    };

    function onFormValueChange(
        e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
        stateFunction?: (value: React.SetStateAction<boolean>) => void
    ) {
        const { name, value } = e.target;

        if (name == "price") {
            setFormValues({
                ...(formValues as AddProductRequest),
                price: Number(value),
            });
            return;
        }

        if (name !== "price") {
            setFormValues({ ...(formValues as AddProductRequest), [name]: value });
        }

        stateFunction && stateFunction(false);
    }

    // Implement a function to handle changes in the conditions selection
    function handleProductCondition(e: ChangeEvent<HTMLSelectElement>) {
        const selectedValue = e.target.value;
        setSelectedConditions(selectedValue);
        setFormValues(
            (prevFormValues) =>
            ({
                ...prevFormValues,
                conditions: selectedValue,
            } as AddProductRequest)
        );
    }
    // Implement a function to handle changes in the sales type selection
    function handleCategory(e: ChangeEvent<HTMLSelectElement>) {
        const selectedValue = e.target.value;
        setSelectedCategory(selectedValue);
        setFormValues(
            (prevFormValues) =>
            ({
                ...prevFormValues,
                category: selectedValue,
            } as AddProductRequest)
        );
    }
    function handleSalesType(e: ChangeEvent<HTMLSelectElement>) {
        const selectedValue = e.target.value;
        setSelectedSalesType(selectedValue);
        setFormValues(
            (prevFormValues) =>
            ({
                ...prevFormValues,
                salesType: selectedValue,
            } as AddProductRequest)
        );
        setShowEndDateField(selectedValue === "BIDDING");
    }

    function validateFields() {

        if (formValues &&
            formValues?.name &&
            formValues?.quantity &&
            selectedSalesType &&
            selectedCategory &&
            selectedConditions &&
            formValues?.date &&
            // formValues?.description &&
            formValues?.price &&
            formValues?.imageOne &&
            formValues?.imageTwo &&
            formValues?.imageThree &&
            formValues?.imageFour) {
            return true;
        } else {
            console.log('form validation failed');

            if (!formValues?.name) {
                setNameErrorMsg(true);
            } else {
                setNameErrorMsg(false);
            }
            if (!formValues?.quantity) {
                setQuantityErrorMsg(true);
            } else {
                setQuantityErrorMsg(false);
            }
            if (!selectedSalesType) {
                setSaleTypeErrorMsg(true);
            } else {
                setSaleTypeErrorMsg(false);
            }
            if (!selectedCategory) {
                setCategoryErrorMsg(true);
            } else {
                setCategoryErrorMsg(false);
            }
            if (!selectedConditions) {
                setConditionErrorMsg(true);
            } else {
                setConditionErrorMsg(false);
            }
            if (!formValues?.date) {
                setEndDateErrorMsg(true);
            } else {
                setEndDateErrorMsg(false);
            }
            // if (formValues?.description) {
            //     setDescErrorMsg(true);
            // } else {
            //     setDescErrorMsg(false);
            // }
            if (!formValues?.price) {
                setPriceErrorMsg(true);
            } else {
                setPriceErrorMsg(false);
            }
            if (!formValues?.imageOne) {
                setImageErrorMsg(true);
            } else {
                setImageErrorMsg(false);
            }
            if (!formValues?.imageTwo) {
                setImageErrorMsg(true);
            } else {
                setImageErrorMsg(false);
            }
            if (!formValues?.imageThree) {
                setImageErrorMsg(true);
            } else {
                setImageErrorMsg(false);
            }
            if (!formValues?.imageFour) {
                setImageErrorMsg(true);
            } else {
                setImageErrorMsg(false);
            }

            return false;
        }
    }


    // Function to reset all form fields
    const resetForm = () => {
        setFormValues(undefined);
        setFile(undefined);
        setImage1(undefined);
        setImage2(undefined);
        setImage3(undefined);
        setImage4(undefined);
        setSelectedConditions("");
        setSelectedSalesType("");
        setSelectedCategory("");
        setPriceErrorMsg(false);
        setImageErrorMsg(false);
        setNameErrorMsg(false);
        setQuantityErrorMsg(false);
        setConditionErrorMsg(false);
        setSaleTypeErrorMsg(false);
        setEndDateErrorMsg(false);
        setCategoryErrorMsg(false);
        setDescErrorMsg(false);
    };

    async function handleCreateProduct(e: FormEvent<HTMLFormElement>) {
        // Prevent deafult actions
        e.preventDefault();

        // Show loader
        setIsLoading(true);

        if (validateFields()) {
            const formData = new FormData();
            formData.append("price", "" + formValues?.price!);
            formData.append("name", formValues?.name as string);
            formData.append("category", formValues?.category as string);
            formData.append("quantity", "" + formValues?.quantity!);
            formData.append("condition", selectedConditions);
            formData.append("salesType", selectedSalesType);
            formData.append("date", formValues?.date as string);
            formData.append("description", formValues?.description as string);
            formData.append("images", formValues?.imageOne as string);
            formData.append("images", formValues?.imageTwo as string);
            formData.append("images", formValues?.imageThree as string);
            formData.append("images", formValues?.imageFour as string);

            // Send request to create product
            await addProduct(formData)
                .then((response) => {
                    // Log response
                    console.log({ response });

                    // Display success
                    toast.success("Product has been created successfully.");
                    setVisibility(false);
                    handleFetchProducts()
                    resetForm();
                })
                .catch((error) => {
                    // Display error
                    const errorMessage = createCustomErrorMessages(error.response?.data);
                    toast.error(errorMessage);
                })
                .finally(() => {
                    // Close laoder
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }

    const departureDateRef = useRef<HTMLDivElement>(null);

    const conditions = [
        {
            condition: "NEW",
        },
        {
            condition: "USED",
        },
        {
            condition: "REFURBISHED",
        },
    ];
    const salesType = [
        {
            sale: "ONCE",
        },
        {
            sale: "BIDDING",
        },
    ];

    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: "transparent" }}
        >
            <form
                action=""
                className={styles.formFieldContainer}
                onSubmit={(e) => handleCreateProduct(e)}
            >
                <span
                    onClick={() => setVisibility(false)}
                    className=" ml-auto cursor-pointer flex items-end justify-end mb-6 w-fit"
                >
                    <TimesIcon />
                </span>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="name">
                            <span>*</span>Name of product
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter product name"
                            value={formValues ? formValues.name : ""}
                            onChange={(e) => onFormValueChange(e, setNameErrorMsg)}
                        />
                        {nameErrorMsg && (
                            <span className="text-red-500 text-sm">
                                Please enter product name
                            </span>
                        )}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="quantity">
                            <span>*</span>Product quantity
                        </label>
                        <input
                            type="text"
                            name="quantity"
                            id="quantity"
                            placeholder="Enter number of product"
                            value={formValues ? formValues.quantity : ""}
                            onChange={(e) => onFormValueChange(e, setQuantityErrorMsg)}
                        />
                        {quantityErrorMsg && <span className="text-red-500 text-sm">Please enter product quantity</span>}
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="condition">
                            <span>*</span>Product state/condition
                        </label>
                        <select
                            name="conditions"
                            value={selectedConditions ?? ""}
                            onChange={(e) => {
                                handleProductCondition(e);
                                onFormValueChange(e, setConditionErrorMsg);
                            }}
                        >
                            <option value="">Select your product condition</option>
                            {conditions.map((item, index) => (
                                <option value={item.condition} key={index}>
                                    {item.condition}
                                </option>
                            ))}
                        </select>
                        {conditionErrorMsg && (
                            <span className="text-red-500 text-sm">
                                Please select product condition
                            </span>
                        )}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="price">
                            <span>*</span>Product Price
                        </label>
                        <input
                            type="text"
                            name="price"
                            id="price"
                            placeholder="Enter product price"
                            value={formValues ? formValues.price : ""}
                            onChange={(e) => onFormValueChange(e, setPriceErrorMsg)}
                        />
                        {priceErrorMsg && (
                            <span className="text-red-500 text-sm">
                                Please enter price
                            </span>
                        )}
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="salesType">
                            <span>*</span>Sale type
                        </label>
                        <select
                            name="salesType"
                            value={selectedSalesType ?? ""}
                            onChange={(e) => {
                                handleSalesType(e);
                                onFormValueChange(e, setSaleTypeErrorMsg);
                            }}
                        >
                            <option value="">Select your sales type</option>
                            {salesType.map((item, index) => (
                                <option value={item.sale} key={index}>
                                    {item.sale}
                                </option>
                            ))}
                        </select>
                        {saleTypeErrorMsg && (
                            <span className="text-red-500 text-sm">
                                Please select sales type
                            </span>
                        )}
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="category">
                            <span>*</span>Select category
                        </label>
                        <select
                            name="category"
                            id=""
                            value={formValues?.category}
                            onChange={(e) => {
                                handleCategory(e);
                                onFormValueChange(e, setCategoryErrorMsg);
                            }}
                        >
                            <option value="">Select category</option>
                            {categories.map((category) => (
                                <option value={category.id} key={category.id + new Date()}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {categoryErrorMsg && (
                            <span className="text-red-500 text-sm">
                                Please select category
                            </span>
                        )}
                    </div>
                </div>
                {showEndDateField &&
                    <div className={styles.formField}>
                        <label htmlFor="date">
                            <span>*</span>End date of bidding
                        </label>
                        <div className={styles.datePickerContainer} ref={departureDateRef}>
                            <DatePicker
                                textField={{
                                    style: {
                                        background: "transparent",
                                    },
                                    borderless: true,
                                }}
                                calloutProps={{
                                    gapSpace: 8,
                                    target: departureDateRef,
                                }}
                                placeholder="Select bidding end date"
                                ariaLabel="Select a date"
                                minDate={new Date()}
                                onSelectDate={(date) => {
                                    // Set the form value
                                    setFormValues({
                                        ...(formValues as AddProductRequest),
                                        date: `${moment(date).format("YYYY-MM-DD")}`,
                                    });
                                    // Unset error message
                                    setEndDateErrorMsg(false);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Tab") {
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
                        {endDateErrorMsg && (
                            <span className="text-red-500 text-sm">
                                Please input the bidding end date
                            </span>
                        )}
                    </div>
                }

                <div className={styles.additionalImage}>
                    <label className="mb-3" htmlFor="image">
                        <span className="text-[#fd6a02] text-sm">*</span>Upload Image file
                    </label>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            {image1 ? (
                                <span className={styles.image}>
                                    <Image
                                        src={URL.createObjectURL(image1)}
                                        alt="product image"
                                        width={262}
                                        height={135}
                                    />
                                </span>
                            ) : (
                                <span className={styles.image}>
                                    <MateriaSymbolIcon />
                                </span>
                            )}
                            <div className={styles.addFlight}>
                                {!image1 ? (
                                    <button type="button">
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, "imageOne")}
                                        />
                                        Select Image
                                    </button>
                                ) : (
                                    <button type="button" className={styles.changeButton}>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, "imageOne")}
                                        />
                                        Change Image
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className={styles.card}>
                            {image2 ? (
                                <span className={styles.image}>
                                    <Image
                                        src={URL.createObjectURL(image2)}
                                        alt="product image"
                                        width={262}
                                        height={135}
                                    />
                                </span>
                            ) : (
                                <span className={styles.image}>
                                    <MateriaSymbolIcon />
                                </span>
                            )}
                            <div className={styles.addFlight}>
                                {!image2 ? (
                                    <button type="button">
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, "imageTwo")}
                                        />
                                        Select Image
                                    </button>
                                ) : (
                                    <button type="button" className={styles.changeButton}>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, "imageTwo")}
                                        />
                                        Change Image
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className={styles.card}>
                            {image3 ? (
                                <span className={styles.image}>
                                    <Image
                                        src={URL.createObjectURL(image3)}
                                        alt="product image"
                                        width={262}
                                        height={135}
                                    />
                                </span>
                            ) : (
                                <span className={styles.image}>
                                    <MateriaSymbolIcon />
                                </span>
                            )}
                            <div className={styles.addFlight}>
                                {!image3 ? (
                                    <button type="button">
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, "imageThree")}
                                        />
                                        Select Image
                                    </button>
                                ) : (
                                    <button type="button" className={styles.changeButton}>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, "imageThree")}
                                        />
                                        Change Image
                                    </button>
                                )}
                            </div>
                        </div>

                        <div className={styles.card}>
                            {image4 ? (
                                <span className={styles.image}>
                                    <Image
                                        src={URL.createObjectURL(image4)}
                                        alt="product image"
                                        width={262}
                                        height={135}
                                    />
                                </span>
                            ) : (
                                <span className={styles.image}>
                                    <MateriaSymbolIcon />
                                </span>
                            )}
                            <div className={styles.addFlight}>
                                {!image4 ? (
                                    <button type="button">
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, "imageFour")}
                                        />
                                        Select Image
                                    </button>
                                ) : (
                                    <button type="button" className={styles.changeButton}>
                                        <input
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, "imageFour")}
                                        />
                                        Change Image
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                    {imageErrorMsg && (
                        <span className="text-red-500 text-sm">
                            Please select product image
                        </span>
                    )}
                </div>
                <div className={styles.formField}>
                    <label htmlFor="description">
                        <span>*</span>Product description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="Enter detailed description here"
                        value={formValues ? formValues.description : ""}
                        onChange={(e) => onFormValueChange(e, setDescErrorMsg)}
                    />
                    {descErrorMsg && (
                        <span className="text-red-500 text-sm">
                            Please enter description
                        </span>
                    )}
                </div>
                <div className={styles.btnContainer}>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Uploading...' : ' Upload Product'}
                    </button>
                    <button>Save as Draft</button>
                </div>
            </form>
        </ModalWrapper>
    );
};

export default AddProductModal;
