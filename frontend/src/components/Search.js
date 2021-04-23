import React from 'react';
import {Input} from 'antd';

const {Search} = Input;

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onSearch(value) {
        console.log(value)
    }

    render() {
        return (
            <Search placeholder="input search text" allowClear onSearch={this.onSearch} style={{ width: 200, marginBottom: 10 }} />
        )
    }

}

export {SearchInput}
