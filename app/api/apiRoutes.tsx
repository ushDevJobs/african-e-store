export default class ApiRoutes {

    static BASE_URL_DEV: string = 'http://localhost:3000';
    // static BASE_URL_TEST: string = 'https://test.api.limbsimple.com.ng';

    /**
     * Api routes to register new user(buyer)
     */
    static RegisterBuyer: string = 'api/auth/register';
    /**
     * Api routes to check if user is logged in
     */
    static AccountStatus: string = 'api/auth/account/status';
    /**
     * Api routes to register new user(buyer)
     */
    static RegisterSeller: string = 'api/auth/register/seller';
    /**
     * Api routes to login buyer
     */
    static LoginBuyer: string = 'api/auth/login';
    /**
     * Api routes to verify user
     */
    static VerifyUser: string = 'api/auth/verify';
    /**
     * Api routes to resend verification code
     */
    static ResendVerificationCode: string = 'api/auth/resend';
    /**
     * Api routes to logout
     */
    static Logout: string = 'api/auth/logout';
    /**
     * Api routes to fetch categories
     */
    static FetchCategories: string = 'api/categories';
    /**
     * Api routes to fetch category
     */
    static FetchSingleCategory: string = 'api/categories/category';
    /**
     * Api routes to fetch all stores
     */
    static FetchAllStores: string = 'api/stores/all';
    /**
     * Api routes to fetch a store
     */
    static FetchAStore: string = 'api/stores/store/id';
    /**
     * Api routes to fetch categories from a store
     */
    static FetchCategoriesFromAStore: string = 'api/stores/store/id';

}
