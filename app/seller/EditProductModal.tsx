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
    useUpdateProduct,
} from "../api/apiClients";
import { toast } from "sonner";
import { createCustomErrorMessages } from "../components/constants/catchError";
import { DatePicker } from "@fluentui/react";
import moment from "moment";
import { CategoriesResponse } from "../components/models/AllCategories";
import { SellerProductsResponse } from "../components/models/ISellerStore";

type Props = {
    visibility: boolean;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    handleFetchProducts({
        clearPreviousProducts,
    }: {
        clearPreviousProducts?: boolean | undefined;
    }): Promise<void>;
    selectedProduct: SellerProductsResponse | undefined
    setSelectedProduct: React.Dispatch<React.SetStateAction<SellerProductsResponse | undefined>>
};

const EditProductModal = ({
    visibility,
    setVisibility,
    handleFetchProducts,
    selectedProduct,
    setSelectedProduct
}: Props) => {
    const updateProduct = useUpdateProduct();
    const fetchCategories = useFetchCategoriesWithoutProducts();

    const [formValues, setFormValues] = useState<AddProductRequest>();
    const [isLoading, setIsLoading] = useState(false);

    const [file, setFile] = useState<File>();
    const [image1, setImage1] = useState<File>();
    const [image2, setImage2] = useState<File>();
    const [image3, setImage3] = useState<File>();
    const [image4, setImage4] = useState<File>();

    const [selectedConditions, setSelectedConditions] = useState<string>("");
    const [selectedSalesType, setSelectedSalesType] = useState<string>("");
    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const [categories, setCategories] = useState<CategoriesResponse[]>([]);

    const [showEndDateField, setShowEndDateField] = useState(false); // State to manage visibility of bidding end date

    const handleFileUpload = (e: any, name: string) => {
        const selectedFile: File = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            const imgURL = reader.result as string;

            if (name === "imageOne") {
                setImage1(selectedFile);
                setFormValues(prev => ({
                    ...prev,
                    imageOne: imgURL
                } as AddProductRequest));
            }

            if (name === "imageTwo") {
                setImage2(selectedFile);
                setFormValues(prev => ({
                    ...prev,
                    imageTwo: imgURL
                } as AddProductRequest));
            }
            if (name === "imageThree") {
                setImage3(selectedFile);
                setFormValues(prev => ({
                    ...prev,
                    imageThree: imgURL
                } as AddProductRequest));
            }
            if (name === "imageFour") {
                setImage4(selectedFile);
                setFormValues(prev => ({
                    ...prev,
                    imageFour: imgURL
                } as AddProductRequest));
            }
            // Repeat for other images...
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    // const handleFileUpload = (e: any, name: string) => {
    //     // Get the selected file
    //     const selectedFile: File = e.target.files[0];

    //     // If a valid file was selected...
    //     if (
    //         selectedFile.type === "image/jpg" ||
    //         selectedFile.type === "image/png" ||
    //         selectedFile.type === "image/jpeg" ||
    //         selectedFile.type === "image/webp"
    //     ) {
    //         // Set the image URL
    //         const imgURL = URL.createObjectURL(selectedFile);

    //         // Update the image URL state
    //         if (name === "imageOne") {
    //             setImage1(selectedFile);
    //             setFormValues(prev => ({
    //                 ...prev,
    //                 imageOne: imgURL
    //             } as AddProductRequest));
    //         }
    //         if (name === "imageTwo") {
    //             setImage2(selectedFile);
    //             setFormValues(prev => ({
    //                 ...prev,
    //                 imageTwo: imgURL
    //             } as AddProductRequest));
    //         }
    //         if (name === "imageThree") {
    //             setImage3(selectedFile);
    //             setFormValues(prev => ({
    //                 ...prev,
    //                 imageThree: imgURL
    //             } as AddProductRequest));
    //         }
    //         if (name === "imageFour") {
    //             setImage4(selectedFile);
    //             setFormValues(prev => ({
    //                 ...prev,
    //                 imageFour: imgURL
    //             } as AddProductRequest));
    //         }
    //     }
    // }

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

    /**
     * Function to handle image file upload and update form values
     * @param e is the event handler
     * @returns void
     */

    async function handleFetchAllCategories() {
        // Start loader

        await fetchCategories()
            .then((response) => {
                // console.log("Response: ", response.data.data);
                setCategories(response.data.data);
            })
            .catch((error) => {
                const errorMessage = createCustomErrorMessages(error.response?.data);
                toast.error(errorMessage);
            })
            .finally(() => { });
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

    async function handleUpdateProduct(e: FormEvent<HTMLFormElement | HTMLButtonElement>) {
        // Prevent deafult actions
        e.preventDefault();

        // Show loader
        setIsLoading(true);
        const formData = new FormData();
        // console.log({ formData });
        formData.append("price", "" + formValues?.price!);
        formData.append("name", formValues?.name as string);
        formData.append("category", formValues?.category as string);
        formData.append("quantity", "" + formValues?.quantity!);
        formData.append("condition", selectedConditions);
        formData.append("salesType", selectedSalesType);
        //   formData.append("publish", false);
        formData.append("date", formValues?.date as string);
        formData.append("description", formValues?.description as string);
        formData.append("images", formValues?.imageOne as string);
        formData.append("images", formValues?.imageTwo as string);
        formData.append("images", formValues?.imageThree as string);
        formData.append("images", formValues?.imageFour as string);
        formData.append("publish", "true");

        // Send request to create product
        await updateProduct(selectedProduct?.id as string, formData)
            .then((response) => {
                // Log response
                // console.log({ response });

                // Display success
                toast.success("Product has been updated successfully.");
                setVisibility(false);
                handleFetchProducts({ clearPreviousProducts: true });
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

    }


    useEffect(() => {
        handleFetchAllCategories();
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            setFormValues({
                price: selectedProduct.amount,
                name: selectedProduct.name,
                quantity: selectedProduct.quantity,
                condition: selectedProduct.itemCondition,
                salesType: selectedProduct.salesType,
                // category: selectedProduct.,
                date: selectedProduct.endBiddingDate,
                description: selectedProduct.details,
                imageOne: selectedProduct.images[0] || "",
                imageTwo: selectedProduct.images[1] || "",
                imageThree: selectedProduct.images[2] || "",
                imageFour: selectedProduct.images[3] || "",
                publish: selectedProduct.publish,
            } as AddProductRequest);
            // setImage states if needed
        }
    }, [selectedProduct])
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(formValues?.imageOne as string);
            URL.revokeObjectURL(formValues?.imageTwo as string);
            URL.revokeObjectURL(formValues?.imageThree as string);
            URL.revokeObjectURL(formValues?.imageFour as string);
        };
    }, [formValues]);

    const departureDateRef = useRef<HTMLDivElement>(null);

    return (
        <ModalWrapper
            visibility={visibility}
            setVisibility={setVisibility}
            styles={{ backgroundColor: "transparent" }}
        >
            <form
                action=""
                className={styles.formFieldContainer}
            >
                <span
                    onClick={() => setVisibility(false)}
                    className=" ml-auto cursor-pointer flex items-end justify-end mb-6 w-fit hover:bg-green-200"
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
                            onChange={(e) => onFormValueChange(e)}
                        />
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
                            onChange={(e) => onFormValueChange(e)}
                        />
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="condition">
                            <span>*</span>Product state/condition
                        </label>
                        <select
                            name="conditions"
                            value={formValues && formValues.condition}
                            onChange={(e) => {
                                handleProductCondition(e);
                                onFormValueChange(e);
                            }}
                        >
                            <option value="">Select your product condition</option>
                            {conditions.map((item, index) => (
                                <option value={item.condition} key={index}>
                                    {item.condition}
                                </option>
                            ))}
                        </select>
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
                            value={formValues && formValues.price}
                            onChange={(e) => onFormValueChange(e)}
                        />
                    </div>
                </div>
                <div className={styles.rowForm}>
                    <div className={styles.formField}>
                        <label htmlFor="salesType">
                            <span>*</span>Sale type
                        </label>
                        <select
                            name="salesType"
                            value={formValues && formValues.salesType}
                            onChange={(e) => {
                                handleSalesType(e);
                                onFormValueChange(e);
                            }}
                        >
                            <option value="">Select your sales type</option>
                            {salesType.map((item, index) => (
                                <option value={item.sale} key={index}>
                                    {item.sale}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.formField}>
                        <label htmlFor="category">
                            <span>*</span>Select category
                        </label>
                        <select
                            name="category"
                            id=""
                            value={formValues && formValues.category}
                            onChange={(e) => {
                                handleCategory(e);
                                onFormValueChange(e);
                            }}
                        >
                            <option value="">Select category</option>
                            {categories.map((category) => (
                                <option value={category.id} key={category.id + new Date()}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {showEndDateField && (
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
                                value={formValues && formValues.date ? new Date(formValues.date) : undefined}
                                ariaLabel="Select a date"
                                minDate={new Date()}
                                onSelectDate={(date) => {
                                    // Set the form value
                                    setFormValues({
                                        ...(formValues as AddProductRequest),
                                        date: `${moment(date).format("YYYY-MM-DD")}`,
                                    });
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
                    </div>
                )}

                <div className={styles.additionalImage}>
                    <label className="mb-3" htmlFor="image">
                        <span className="text-[#fd6a02] text-sm">*</span>Upload Image file
                    </label>
                    <div className={styles.cardContainer}>
                        <div className={styles.card}>
                            {formValues && formValues.imageOne && (
                                <span className={`${styles.image} h-[300px]`}>
                                    <Image
                                        src={formValues.imageOne}
                                        alt="product image"
                                        fill
                                    />
                                </span>
                            )}
                            <div className={styles.addFlight}>
                                <button type="button" className={`${styles.changeButton} hover:bg-[#2c7865] hover:text-white`}>
                                    <input
                                        type="file"
                                        id="imageOne"
                                        name="imageOne"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, "imageOne")}
                                    />
                                    Change Image
                                </button>
                            </div>
                        </div>
                        <div className={styles.card}>
                            {formValues && formValues.imageTwo && (
                                <span className={`${styles.image} h-[300px]`}>
                                    <Image
                                        src={formValues.imageTwo}
                                        alt="product image"
                                        fill
                                    />
                                </span>
                            )}
                            <div className={styles.addFlight}>
                                <button type="button" className={`${styles.changeButton} hover:bg-[#2c7865] hover:text-white`}>
                                    <input
                                        type="file"
                                        id="imageTwo"
                                        name="imageTwo"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, "imageTwo")}
                                    />
                                    Change Image
                                </button>
                            </div>
                        </div>
                        <div className={styles.card}>
                            {formValues && formValues.imageThree && (
                                <span className={`${styles.image} h-[300px]`}>
                                    <Image
                                        src={formValues.imageThree}
                                        alt="product image"
                                        fill
                                    />
                                </span>
                            )}
                            <div className={styles.addFlight}>
                                <button type="button" className={`${styles.changeButton} hover:bg-[#2c7865] hover:text-white`}>
                                    <input
                                        type="file"
                                        id="imageThree"
                                        name="imageThree"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, "imageThree")}
                                    />
                                    Change Image
                                </button>
                            </div>
                        </div>
                        <div className={styles.card}>
                            {formValues && formValues.imageFour && (
                                <span className={`${styles.image} h-[300px]`}>
                                    <Image
                                        src={formValues.imageFour}
                                        alt="product image"
                                        fill
                                    />
                                </span>
                            )}
                            <div className={styles.addFlight}>
                                <button type="button" className={`${styles.changeButton} hover:bg-[#2c7865] hover:text-white`}>
                                    <input
                                        type="file"
                                        id="imageFour"
                                        name="imageFour"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload(e, "imageFour")}
                                    />
                                    Change Image
                                </button>
                            </div>
                        </div>
                    </div>
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
                        onChange={(e) => onFormValueChange(e)}
                    />
                </div>
                <div className={styles.btnContainer}>
                    <button
                        type="submit"
                        disabled={isLoading}
                        onClick={(e) => handleUpdateProduct(e)}
                    >
                        {isLoading ? "Uploading..." : " Upload Product"}
                    </button>
                    {/* <button
                        type="submit"
                        disabled={isLoadingDraft}
                        onClick={(e) => handleDraftProduct(e)}
                    >
                        {isLoadingDraft ? "Saving..." : " Save as Draft"}
                    </button> */}
                </div>
            </form>
        </ModalWrapper>
    );
};

export default EditProductModal;
