import Spinner from 'react-bootstrap/Spinner';

function Loader() {
    return (
        <div className='back-drop'>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default Loader;