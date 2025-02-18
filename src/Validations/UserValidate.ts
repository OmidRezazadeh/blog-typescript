
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
})



