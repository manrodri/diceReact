import React from 'react';
import "../css/ImageList.css"
import ImageCard from "./ImageCard";

const ImageList = (props) => {
    const scores = props.scores.map((score) => {
        return <ImageCard key={score.id} score={score}/>
    });
    return (
        <div>{scores}</div>

    )
}

export default ImageList;