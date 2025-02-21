import {createForm} from "@/helpers/FormService";
import {Controller, useForm} from "react-hook-form";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import TextField from '@mui/material/TextField';
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";


import {useEffect} from "react";

/**
 * Dialog that contains a form that allows to create or update a Pokemon.
 * @param isDialogOpen Indicates if the dialog is open.
 * @param onCloseDialog Callback function to close the dialog.
 * @param onSaveChanges Callback function to save the changes made in the form.
 * @param element Pokemon data to be updated. If not passed, a new Pokemon will be created.
 */
export default function PokemonForm({isDialogOpen, onCloseDialog, onSaveChanges, element,}
                                        : {isDialogOpen: boolean, onCloseDialog: () => void, onSaveChanges : (data:any) => void, element?: any}){

    const form = createForm(useForm({}));

    // Set values passed in Pokemon to be updated.
    const setDefaultValues = () => {
        if(element){
            form.setValue("name", element.name);
            form.setValue("base_experience", element.base_experience);
            form.setValue("height", element.height);
            form.setValue("weight", element.weight);

            form.setValue("order", element.order);
            form.setValue("is_default", element.is_default);
        }
    };

    // Set default values when element changes.
    useEffect(() => {
        setDefaultValues();
    }, [element]);

    return (
        <>
            <Dialog
                open={isDialogOpen}
                onClose={onCloseDialog}
                maxWidth="sm"
                fullWidth={true}
            >
                <DialogTitle id="data-dialog-title">{`${element ? "Update" : "Create"} Pokemon`}</DialogTitle>

                <form onSubmit={form.handleSubmit(onSaveChanges)}>
                    <DialogContent>
                        <div className='flex flex-col gap-y-3'>
                            <TextField id="name" label="Name" variant="filled"
                                       slotProps={{input: {type: "text",}}}
                                       {...(form.register)('name', {required: 'Name is required',})}
                                       error={!!form.errors.name}
                                       helperText={form.errors.name?.message}/>
                            <TextField id="base_experience" label="Base experience" variant="filled"
                                       slotProps={{input: {type: "number",}}}
                                       {...(form.register)('base_experience', {required: 'Base experience is required'})}
                                       error={!!form.errors.base_experience}
                                       helperText={form.errors.base_experience?.message}/>
                            <TextField id="height" label="Height" variant="filled"
                                       slotProps={{input: {type: "number",}}}
                                       {...(form.register)('height', {
                                           required: 'Height is required',
                                           minValue: {value: 0, message: 'Height must be greater than 0'}
                                       })}
                                       error={!!form.errors.height}
                                       helperText={form.errors.height?.message}/>
                            <TextField id="weight" label="Weight" variant="filled"
                                       slotProps={{input: {type: "number",}}}
                                       {...(form.register)('weight', {required: 'Weight is required',})}
                                       error={!!form.errors.weight}
                                       helperText={form.errors.weight?.message}/>
                            <TextField id="order" label="Order" variant="filled"
                                       slotProps={{input: {type: "number",}}}
                                       {...(form.register)('order', {required: 'Order is required',})}
                                       error={!!form.errors.order}
                                       helperText={form.errors.order?.message}/>

                            {/* To check the value inside it, the checkbox needs a separate React Hook Form Controller*/}
                            <FormGroup>
                                <FormControlLabel
                                    label="Is default?"
                                    control={
                                        <Controller
                                            name="is_default"
                                            control={form.control}
                                            render={({ field }) => <Checkbox {...field}
                                                                             {...(form.register)('is_default',)}
                                                                             defaultChecked={true}
                                                                    />}
                                        />
                                }
                                />
                            </FormGroup>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button type='button' variant='contained' color='warning'
                                onClick={onCloseDialog}>Cancel</Button>
                        <Button type='submit' variant='contained'
                                color='primary'>{element ? 'Update' : 'Create'}</Button>
                    </DialogActions>
                </form>
            </Dialog>

        </>
    )
}