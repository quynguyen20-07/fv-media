import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../Utils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import UserCard from "../UserCard";
import loadIcon from "../../images/load.gif";

const SearchBar = (theme) => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      setLoad(true);
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setUsers(res.data.users);
      setLoad(false);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: error.response.data.message,
        },
      });
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch} theme={theme ? 'invert(1)' : 'invert(0)'}>
      <input
        type="text"
        name="search"
        value={search} id="search"
        className="form-control rounded-pill"
        placeholder="Enter to Search"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        } />

      <div
        className="close-search"
        onClick={handleClose}
        style={{ opacity: users.length === 0 ? 0 : 1 }}
      >
        &times;
      </div>
      <button type="submit" style={{ display: "none" }}>
        Search
      </button>

      <div className="userShow">
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              border="border"
              handleClose={handleClose}
            />
          ))}
      </div>
      {load && <img className="loading" src={loadIcon} alt="loading" />}
    </form>
  );
};

export default SearchBar;
