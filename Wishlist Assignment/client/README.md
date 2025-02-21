# Project Documentation

## Do not use Bootstrap ,tailwind Css or any other liberary other than material ui
## Do not use Style.css files for styling use sx prop of MUI only
## For Icons Use material ui Icons if icon is not Present use similary icon from MUI
## Only use Redux if Required like for Carts and other important things. Do not use them unnecessarity
## Try To break your page in multiple Reusable components 
## For any helper function or any function that will be used at multiple places make them in `src/utils/helper`


## API Integration
We use `axios` for API calls in this project. Below is the guide to set up and use API calls effectively:

### Basic API Configuration
- The core API setup is located in the `services` folder, specifically in the `index.js` file.
- You can directly use predefined methods (`get`, `post`, `put`, `postFormData`) in your pages by importing them.

### How to Make API Calls
1. **GET Request:**
   ```javascript
   import { get } from 'path_to_services';
   
   get('your_url')
       .then((res) => {
           // Handle success
       })
       .catch((e) => {
           // Handle error
       });
   ```

2. **POST Request:**
   ```javascript
   import { post } from 'path_to_services';
   
   post('your_url', payload)
       .then((res) => {
           // Handle success
       })
       .catch((e) => {
           // Handle error
       });
   ```

**Note:**
- Do not include the base URL (e.g., `http://localhost:3000`) in `your_url`.
- Use only the sub-URL (e.g., `/get/personal-info`). The base URL will automatically be appended from the `BaseUrl.js` file.

### Base URL Management
- Base URLs are defined in the `BaseUrl.js` file.
- If modifications are required, duplicate the file, make your changes, and comment out the original for reference.

## Page and Component Creation

### Creating Pages
- Navigate to the `pages` folder.
- If a folder for your page already exists, use it; otherwise, create a new folder with a relevant name.
- Inside this folder, create the necessary files for your page.
- every page name should end with `Page` eg. `ProfilePage`

### Creating Layout
- Navigate to the `layouts` folder.
- If a folder for your page already exists, use it; otherwise, create a new folder with a relevant name.
- Inside this folder, create the necessary files for your page.
- every page name should end with `Layout` eg. `ProfileLayout`

### Creating Components
- Navigate to the `components` folder.
- If a folder for your component already exists, use it; otherwise, create a new folder with a relevant name.

## Theme and Styling
- The project theme is located in the `theme` folder.
- **Color Palette:**
  - Primary: Blue
  - Secondary: Orange
- Always use the theme palette for colors to maintain consistency.

## Image Management
- Use the `public` folder for storing images.
- Inside the `public` folder, navigate to the `assets/images` folder.
- Create a sub-folder with a relevant name for your image files.

## Form Validation
- Form validation schemas are located in the `utils/validations` folder.
- Create new validation schemas if required or use existing ones wherever possible.
- you can directly use the import the schema for you formik validation schema

```javascript


//------------------------for Validation Schema -----------------------------

// create your validation on new file if required in the `utils/validations` folder ----------

export const accountNumber = Yup.string()       
  .required('Account number is required')
  .matches(/^\+?\d{9,18}$/, "Account number is not valid")


// ** Note: ** the above accountNumber function should be written in validation folder in existing index or new file and then imported to your page





///---------------------------Handle form submit-------------------------------------

const onSubmit=()=>{
    //any additional code if required


    //---for form without any images or any content
    const payload={
        'account_number':accountNumber,
        'benificiary_name':benificiaryName,
        etc..
    }
    
    post('/account-details',payload).then((res)=>{
        const {message,data}=res;
        console.log(message);
        toast.success('write your message to show after successful form submit ');

    }).catch((e)=>{
        console.error(e);
        toast.error('write your message to show error to user');
    })

    //---for form with any images or any content

    const formData=new FormData();

    formData.append('account_number',accountNumber);

    postFormData('/account-details',formData).then((res)=>{
        const {message,data}=res;
        console.log(message);
        toast.success('write your message to show after successful form submit ');

    }).catch((e)=>{
        console.error(e);
        toast.error('write your message to show error to user');
    });


}


///------------------------------validation Schema-------------------------------------------------     

const personalSchema = Yup.object({
        accountNumber:accountNumber,
        conAccountNumber:conAccountNumber,
        benificiaryName:required,
        bankName:required,
        IFSCcode:IFSCcode,
        bankBranch:required,

    });

    ///------------------------------formik-handler-------------------------------------------------     
    const {values,touched,handleBlur,handleChange,errors,setFieldValue}=useFormik({
      initialValues:{
          accountNumber:"",
          conAccountNumber:"",
          benificiaryName:"",
          bankName:"",
          IFSCcode:"",
          bankBranch:"",
          
      },
      validationSchema: personalSchema,
      onSubmit,

    });

    ```
---
This documentation ensures consistency and clarity in project development. For further queries, feel free to refer to the respective folders and files mentioned above.

