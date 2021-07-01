import React from 'react';
import '../css/ImageCard.css'

const pStyle = {
  textAlign: 'center'
};

const ImageCard = ({score}) => {
    return (
            <div className={`mycard four wide column`} >
                <div className="content ">
                    <div className="header">Dice number {score.id + 1} </div>
                    <p style={pStyle}>{score.result} </p>
                </div>
            </div>
        )
}


export default ImageCard;