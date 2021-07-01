import React from 'react';
import ImageCard from "./ImageCard";
import '../css/ImageList.css'

const ImageList = (props) => {
    const scores = props.scores.map((score) => {
        return <ImageCard key={score.id} score={score}/>
    });
    return (
        <div className={`ui grid image-list`}>{scores}</div>

    )
}

export default ImageList;