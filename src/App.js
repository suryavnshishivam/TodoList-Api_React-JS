import './App.css';
import {  useEffect, useCallback } from 'react';
import List from './components/List';
import { useDispatch, useSelector } from 'react-redux';
import Form from './components/Form';
import useSendRequest from './hooks/sendRequest';
import { setIsLoading, setTodoList } from './reducer/itemsSlice';



const App = () => {

  const { todoList , isLoading } = useSelector(state => state.abc)
  const dispatch = useDispatch();


  const handleFetchData = useCallback((data) => {
    
    const fetchData = []

    for (let key in data) {

      fetchData.push({ id: key, item: data[key] })
    }
    dispatch(setTodoList(fetchData));
    dispatch(setIsLoading(false));
  }, [])



  const { error, sendRequest } = useSendRequest(handleFetchData)

  const fetchListHandler = useCallback(() => {
    dispatch(setIsLoading(true));
    sendRequest({ url: 'https://react-workspace-b0d45-default-rtdb.firebaseio.com/todolist.json' })

  },[])

  useEffect(() => {
    fetchListHandler();
  }, [])

 


  return (
    <div >
      <h1 className='ms-5 text-center fs-1 fw-bolder' >TodoList </h1>
     
      {isLoading && <p className='ms-5 mt-1 text-center spinner-border'  role="status">  <span className="visually-hidden">Loading...</span></p>}
      {!isLoading && error && <p className='ms-5 mt-1 text-center'>Something went wrong</p>}
      <Form getLatestData={fetchListHandler} />

      {
        todoList.length > 0
          ?
          todoList.map((element, index) => {
            return <List name={element.item.name} key={index} arrayId={element.id} getLatestData={fetchListHandler} />
          })
          :
          <h1 className='ms-5'>Data Not Found</h1>

      }
    </div>
  );
}

export default App;
