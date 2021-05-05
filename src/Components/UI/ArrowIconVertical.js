function ArrowIconVertical(props) {
    if (props.arrowDir === 'up') {
       return  (<svg id="up-arrow-above-raise-high" version="1.1" viewBox="0 0 8.706 15.698" width="50px" height="20px" fill='green'>
            <polygon points="8.706,4.344 4.353,0 0,4.344 0.706,5.052 3.853,1.912 3.853,15.698 4.853,15.698 4.853,1.912 8,5.052 "/>
        </svg>)
    }
    return (
        <svg viewBox="0 0 32 32" width="50px" height="20px" fill='red'>
            <g data-name="Layer 2" id="Layer_2">
                <path d="M23.05,22a1,1,0,0,0-1.41,0L17,26.56V3a1,1,0,1,0-2,0V26.53L10.47,22a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l6.37,6.37a.9.9,0,0,0,1.27,0l6.36-6.37A1,1,0,0,0,23.05,22Z"/></g>
        </svg>
    );
}

export default ArrowIconVertical