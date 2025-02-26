import React from "react";

// const Search = (props) => {
const Search = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search">
            <div>
                <img src="search.svg" alt="search" />
                <input
                    type="text"
                    placeholder="Search through thousands of movies"
                    value={searchTerm}
                    onChange={(e) => {
                        return setSearchTerm(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default Search;
