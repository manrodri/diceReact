import React from 'react';

const ImageCard = ({score}) => {
    return (
            <div className={`ui card row`} style={{gridRowEnd: `span 2`}}>
                <div className="content column">
                    <div className="header">Dice number {score.id + 1} </div>
                    <p>{score.result}</p>
                </div>
            </div>
        )
}


export default ImageCard;