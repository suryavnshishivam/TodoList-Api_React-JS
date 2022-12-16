import './ErrorModule.css';
const ErrorModul =(props)=>{
    
    return (
        <div className='backdrop '>
            <div className='modal  '>
                <header className='header gradient-custom-2'>
                    <h2>{props.title}</h2>
                </header>
                <footer className='actions gradient-custom-2'>
                    <button className='errorbuttom' onClick={props.onClose}><i className="bi bi-trash"></i></button>
                    <button className='errorbuttom' onClick={props.onCancel}><i className="bi bi-skip-backward-fill"></i></button>
                </footer>
            </div>

        </div>
    )
}
export default ErrorModul