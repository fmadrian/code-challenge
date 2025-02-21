/**
 * Receives custom hook created with useForm and returns an object with the properties that allows us to handle the form.
 * Put into a separate function to avoid repeating the same code for each created form.
 * @param form
 */
export const createForm = (form: any)=>{
    const { register, handleSubmit, formState: {errors}, reset, setValue, control, getValues  } = form;
    return { register, handleSubmit, errors, reset, setValue, control, getValues };
}