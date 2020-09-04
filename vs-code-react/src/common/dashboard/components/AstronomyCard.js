import React from "react";

const AstronomyCard =({datas}) => {

    return (
<div>

    <h1>{datas.title}</h1>
    <a href={datas.hdurl}>
    <img src={datas.url} alt={datas.title}></img>
    </a>
    <h3>
    {datas.date} ,{datas.copyright}
    </h3>
    <p>{datas.explanation}</p>
</div>
    );
};


export default AstronomyCard;