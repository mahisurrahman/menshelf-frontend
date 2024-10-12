import React from 'react';

const CustomSearch = () => {
    return (
        <div className="flex gap-2 items-center">
          <input
            type="search"
            placeholder="Search"
            className="text-xl px-4 py-2 border-4 rounded-lg focus:outline-none"
          />
          <input
            className="px-4 py-2 rounded-lg bg-slate-600 border-2 border-slate-600 text-white text-xl"
            type="submit"
            value="Search"
          />
        </div>
    );
};

export default CustomSearch;