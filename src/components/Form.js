import { useEffect, useState, useCallback } from 'react';
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';
import useSendRequest from '../hooks/sendRequest';
import { setFormReset, setIsValid } from '../reducer/itemsSlice';

const Form = (props) => {
    const [form, setForm] = useState({ name: '' })
    const { editItems, isEdit, isValid } = useSelector(state => state.abc)

    const dispatch = useDispatch();

   

    useEffect(() => {
        if (editItems && editItems.length > 0) {
            setForm({ name: editItems[0].item.name });
           
        }
        else {
            setForm({ name: '' });
            
        }
    }, [editItems])

    const submitHandler = (events) => {
        events.preventDefault();

        if(form.name.trim().length !==0){
            dispatch(setIsValid(false))
        }else{
            dispatch(setIsValid(true))
            return false
        }

        
        if (!isEdit) {
            sendRequest({
                url: 'https://react-workspace-b0d45-default-rtdb.firebaseio.com/todolist.json',
                method: 'POST',
                body: form,
                headers: { "contex-type": 'application/json' }
            });
        } else {
            sendRequest({
                url: `https://react-workspace-b0d45-default-rtdb.firebaseio.com/todolist/${editItems[0].id}.json`,
                method: 'PATCH',
                body: form,
                headers: { "contex-type": 'application/json' }

            });
        }
    }

    const handlePostData = useCallback((data) => {
        dispatch(setFormReset());
        props.getLatestData();
    }, []);

    const { sendRequest } = useSendRequest(handlePostData);

    return (
        <div className='gradient-custom-2 col-4 ms-5'>
            <form onSubmit={submitHandler} className='form'>
                <div className={"form-control " + (isValid ? "invalid" : "")}>
                    <label htmlFor='name' className='label'>Input Name </label>
                    <input type='text' className='input' value={form.name}
                        onChange={(e) => {
                            setForm({ ...form, name: e.target.value })
                            if(e.target.value.trim().length>0){
                                dispatch(setIsValid(false)) 
                            }else{
                                 dispatch(setIsValid(true))
                            }
                        }} />
                         {isValid && <p className="error-text">*Name  is requried</p>}
                </div>
                <div className=''>
                    {!isEdit ? <button className='button'> <i className="bi bi-plus-circle-fill"></i></button> : <button className='button'><i className="bi bi-pencil-square"></i></button>}
                </div>
            </form>
        </div>
    )
}
export default Form;

