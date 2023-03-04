
import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const Button = (props) => {
    const btnRef = useRef();
    return (
        <button
            ref={btnRef}
            className='--btn --btn-primary --btn-block'
            onClick={props.onClick}
        >
            <span className={`spinner ${props.loading ? 'active' : ''}`}>
                <i className='bx bx-loader-alt bx-spin'></i>
            </span>
            <span className="txt">
                {props.children}
            </span>
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
    onClick: PropTypes.func
};

export default Button;