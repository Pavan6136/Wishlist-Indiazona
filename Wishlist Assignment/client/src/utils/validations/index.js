import * as Yup from "yup";

export const Password = Yup.string()
  .min(8, "Password is short")
  .max(50, "Password is long")
  .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
  .matches(/[0-9]/, 'Password must contain at least one number')
  .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
  .required("This field is required");

export const ConfirmPassword = Yup.string()
  .min(8, "Password is short")
  .max(50, "Password is long")
  .oneOf([Yup.ref("password"), null], "Password doesn't match")
  .required("This field is required");

export const con_password = Yup.string()
  .min(8, "Password is short")
  .max(50, "Password is long")
  .oneOf([Yup.ref("new_password"), null], "Password doesn't match")
  .required("This field is required");

export const email = Yup.string()
  .email("please enter a valid email")
  .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Invalid email")
  .required("This field is required");
export const name = Yup.string().required("This field is required");

export const otp = Yup.string()
  .length(6, "OTP must be exactly 6 digits")
  .required("This field is required");

export const phone_number = Yup.string()
  .required("This field is required")
  .matches(/^\+?\d{10}$/, "Phone number is not valid")

export const adhaar_card= Yup.string()
  .required("Adhaar card number is required")
  .min(12, "Enter a valid adhar card number")
  .max(12, "Enter a valid adhar card number")
  
// export const image= Yup.string()
//   .required("image is required")
// export const adhaar_card_image= Yup.string()
//   .required("Adhaar card image is required")
export const required= Yup.string()
  .required("This field is required")

export const pan_card_number= Yup.string()
  .required("Pan card number is required")
  .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN card format. Please enter a valid PAN.")
  .min(10, "Enter a valid pan card number")
  .max(10, "Enter a valid pan card number")


  export const GstNumber= Yup.string()
  .required('GST number is required')
  .matches(
    /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/,
    'Enter a valid GST number'
  )

//user desh validation

//user address 
export const validAddress = Yup.string()
  .required('Address is required')
  .min(5, 'Address must be at least 5 characters long')
export const address_type = Yup.string()
  .required('Address type is required')
export const customertName = Yup.string()
  .required('Name is required')
export const country_id = Yup.string()
  .required('Country is required')
export const state_id = Yup.string()
  .required('State is required')
export const city_id = Yup.string()
  .required('City is required')

export const postal_code = Yup.string()
  .matches(/^\d{6}$/, 'Pincode is not valid')
  .required('Postal code is required')

export const phone = Yup.string()
.matches(
  /^[0-9]{10}$/,
  "Phone number is not valid."
)
export const profilPassword = Yup.string()
export const ProfileConfirmPassword = Yup.string()
  .min(6, "Password is short")
  .max(50, "Password is long")
  .oneOf([Yup.ref("password"), null], "Password doesn't match")

// Bank account validation
export const acountHoldername = Yup.string().required("Name required");
export const accountNumber = Yup.string()
  .required('Account number is required')
  .matches(/^\+?\d{9,18}$/, "Account number is not valid")
export const conAccountNumber = Yup.string()
  .required('Account number is required')
  .oneOf([Yup.ref("accountNumber"), null], "Account number doesn't match")

export const IFSCcode = Yup.string()
  .required('IFSC number is required')
  .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC code.")

export const referenceCode = Yup.string()
.matches(/^[A-Z0-9]{6}$/, "Must be exactly 6 characters long and contain only numbers or uppercase letters")

export const images = Yup.mixed().required('Document is required')
.test('fileType', 'Image files are allowed', (value) => {
  return value && ['image/jpeg', 'image/png'].includes(value.type)
});

export const imagesNPdf = Yup.mixed().required('Document is required')
.test('fileType', 'Image files are allowed', (value) => {
  return value && ['image/jpeg', 'image/png','application/pdf'].includes(value.type)
});





