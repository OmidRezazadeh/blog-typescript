
import Joi from 'joi';

const emailValidate= Joi.string()
.email()
.required()
.messages({
 'string.base': 'ایمیل باید یک رشته باشد',
 'string.email': 'ایمیل باید یک آدرس ایمیل معتبر باشد',
 'any.required': 'ایمیل اجباری است', 
});
const passwordValidate =Joi.string()
.min(4)
.max(19)
.required().messages({
    'string.min': 'رمز عبور باید حداقل ۴ کاراکتر باشد', // Custom error message for minimum length
    'string.max': 'رمز عبور نمی‌تواند بیشتر از 19 کاراکتر باشد', // Custom error message for maximum length
    'any.required': 'رمز عبور اجباری است', // Custom error message for required field
});
const phoneRegex = /^09\d{9}$/;


export const registerValidate=
Joi.object({
    name: Joi.string().required().min(2).max(255)
    .messages({
        'any.required': 'نام کامل اجباری است', // Custom error message for required field
        'string.min': 'نام کامل باید حداقل 2 کاراکتر باشد', // Custom error message for minimum length
        'string.max': 'نام کامل نمی‌تواند بیشتر از ۲۵۵ کاراکتر باشد', // Custom error message for maximum length
    }),
    email:emailValidate,
    password:passwordValidate,
     bio:Joi.string().allow(null),
     address:Joi.string().required(),
     phone: Joi.string().pattern(phoneRegex).required().messages({
        'string.pattern.base': 'شماره موبایل باید با 09 شروع شده و 11 رقم باشد',
        'any.required': 'شماره موبایل اجباری است',
      }),
})


export const validationLogin=Joi.object({
    email:emailValidate,
   password:passwordValidate,
})



