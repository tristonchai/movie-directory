import React from "react";
import { Select } from "antd";
// import Select from "antd/es/select";

const FilterSelection = ({ onChange, years }) => {
    const onYearChange = (value) => {
        // console.log("onYearChange inside SELECT: ", value);
        onChange(value);
    };

    const onSearch = (value) => {
        // console.log("onSearch inside SELECT: ", value);
    };

    const defaultOptionValue = "Select Year...";

    const yearGenerator = (from, to) => {
        let result = [{ value: -1, label: defaultOptionValue }];
        for (let i = from; i <= to; i++) {
            result.push({ value: i, label: i });
        }
        // console.log(result);
        return result;
    };

    // console.log(typeof years, years);

    // yearGenerator(1990, new Date().getFullYear());

    return (
        <div className="filter-container filter-years">
            <div className="filter-container-inner">
                <Select
                    showSearch
                    placeholder="Select year"
                    defaultValue={years === "-1" ? defaultOptionValue : years}
                    options={yearGenerator(1990, new Date().getFullYear())}
                    onSearch={onSearch}
                    onChange={onYearChange}
                />
            </div>
        </div>
    );
};

export default FilterSelection;
