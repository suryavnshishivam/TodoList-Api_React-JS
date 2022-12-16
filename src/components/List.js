import { useDispatch, useSelector } from 'react-redux';
import { setEditItems, setFormReset, setIsValid } from '../reducer/itemsSlice';
import ErrorModul from './ErrorModule';
import './List.css';
import useSendRequest from '../hooks/sendRequest';
import { useCallback } from 'react';
import { useState } from 'react';



const List = (props) => {
    const [error, setError] = useState('');
    const [form, setForm] = useState({ name: '' })
    const { todoList } = useSelector(state => state.abc)


    const dispatch = useDispatch()

    const DeleteHandler = () => {
        setError({ title: "Dou you Want to Delete the Data" })

    }

    const editHandler = (e) => {
        let newEditItem = todoList.filter((element) => {
            return element.id === props.arrayId;
        })
        dispatch(setEditItems(newEditItem))
        dispatch(setIsValid(false)) 
            
    }

    const onCloseHandler = () => {

        sendRequest({
            url: `https://react-workspace-b0d45-default-rtdb.firebaseio.com/todolist/${props.arrayId}.json`,
            method: 'DELETE',
            body: form,
            headers: { "contex-type": 'application/json' }


        });
        setError('');

    }

    const onCancelHandler = () => {
        setError('');
    }

    const handlePostData = useCallback((data) => {
        dispatch(setFormReset());
        props.getLatestData();
    }, []);

    const { sendRequest } = useSendRequest(handlePostData);

    return (

        <div className='mt-2 d-flex flex-row col-12 flex-wrap'>
            {error && <ErrorModul title={error.title} onClose={onCloseHandler} onCancel={onCancelHandler}></ErrorModul>}
            
            <ul className='col-6 d-flex gradient-custom-2 ms-5 '>

                <li className='list-unstyled '>
                    <label>Email Address</label>
                    <h2 className='name '>{props.name}</h2>
                </li>

                <li className='list-unstyled col-1'>
                    <label>Edit</label>
                    <button type='button' className='button card  mask-custom' onClick={editHandler}>
                        <i className="bi bi-pencil"></i></button></li>

                <li className='list-unstyled col-1'>
                    <label>Delete</label>
                    <button type='button' className='button card  mask-custom bg-delete' onClick={DeleteHandler}>
                        <i className="bi bi-trash"></i></button></li>
            </ul>
            
        </div >
    )

}
export default List 