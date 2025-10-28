import z from 'zod';

// const passwordRegexValidation = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g;

export const registerSchema = z
  .object({
    email: z.email('البريد المستخدم ليس بريداً').min(1, { message: 'البريد المستخدم ليس بريداً' }),
    name: z.string().min(1, { message: 'الاسم مطلوب' }),
    phone: z.string().min(10, { message: 'رقم الهاتف ليس صحيح' }),
    // lastName: z.string().min(1, { message: 'الاسم الثاني مطلوب' }),
    password: z.string().min(8, { message: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' }),
    password_confirmation: z.string()
    // auth: z.string({ error: 'الصلاحية مطلوبه' }).min(1, { message: 'اختيار الصلاحية مطلوب' })
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'تاكيد كلمة المرور لا تتوافق مع كلمة المرور',
    path: ['confirmPassword']
  });

export const loginSchema = z.object({
  email: z.email({ message: 'أدخل بريدا صحيحا' }),
  password: z.string().min(1, { message: 'كلمة السر مطلوبة' })
});

export const subscribeSchema = z.object({
  email: z.email({ message: 'أدخل بريدا صحيحا' }),
  first_name: z.string().min(1, { message: 'الاسم مطلوب' })
});

export const contactSchema = z.object({
  name: z.string().nonempty({ message: 'الاسم مطلوب' }),
  email: z.email({ message: 'أدخل بريدا صحيحا' }),
  phone: z.string().min(10, { message: 'أدخل رقما صحيحا' }),
  subject: z.string(),
  message: z.string().min(15, { message: 'محتوي الرساله يجب ان يكون هادف و مفصل' })
});

export type RegisterForm = z.infer<typeof registerSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type SubscribeForm = z.infer<typeof subscribeSchema>;
export type ContactForm = z.infer<typeof contactSchema>;
