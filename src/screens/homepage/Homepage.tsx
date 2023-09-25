import React from 'react';
import {Image} from 'antd';
import image from "../../public/1.jpg"


const Homepage: React.FC = () => {
    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <Image width={"600px"} height={"800px"} src={image}></Image>

        </div>

    );
};

export default Homepage;