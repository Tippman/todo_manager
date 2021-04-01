import React from 'react';
import {Link} from "react-router-dom";
import {Typography} from "antd";

const {Title} = Typography

const NotFound404 = ({location}) => {
    return (
        <div>
            <Title level={2}>404. Страница по адресу "{location.pathname}" не найдена</Title>
        </div>
    )
}

export {NotFound404}