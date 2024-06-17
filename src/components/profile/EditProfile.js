import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { checkImage } from "../../Utils/imagesUpload";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { updateProfile } from "../../redux/actions/profileAction";

const EditProfile = ({ setEdit }) => {
  const initState = {
    fullname: "",
    number: "",
    address: "",
    website: "",
    status: "",
    gender: "",
  };
  const [userData, setUserData] = useState(initState);
  const { fullname, number, address, website, status, gender } = userData;
  const [avatar, setAvatar] = useState("");

  const { auth, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const changeAvatar = (e) => {
    const file = e.target.files[0];
    const err = checkImage(file);
    if (err)
      return dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setAvatar(file);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ userData, avatar, auth }));
    setEdit(false)
  };
   

  return (
    <div className="edit_profile">
      <button
        className="btn btn-danger btn_close"
        onClick={() => setEdit(false)}
      >
        Close
      </button>
      <form onSubmit={handleSubmit}>
        <div className="user-avatar">
          <img
            src={avatar ? URL.createObjectURL(avatar) : auth.user.avatar}
            alt="avatar"
            style={{ filter: theme ? "invert(1" : "invert(0)" }}
          />
          <span>
            <i className="fas fa-camera" />
            <p>Change</p>
            <input
              type="file"
              name="file"
              id="file_up"
              accept="image/*"
              onChange={changeAvatar}
            />
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="fullname">Full name</label>
          <div className="position-relative">
            <input
              type="text"
              className="form-controll"
              id="fullname"
              name="fullname"
              value={fullname}
              onChange={handleInput}
            />
            <small
              className="text-danger position-absolute"
              style={{
                top: "50%",
                right: "56%",
                transform: "translateY(-50%)",
              }}
            >
              {fullname.length}/25
            </small>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="number">Phone number</label>
          <div>
            <input
              type="number"
              className="form-controll"
              id="number"
              name="number"
              value={number}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <div>
            <input
              type="text"
              className="form-controll"
              id="address"
              name="address"
              value={address}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="website">Website</label>
          <div>
            <input
              type="text"
              className="form-controll"
              id="website"
              name="website"
              value={website}
              onChange={handleInput}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="status">Status</label>
          <div>
            <textarea
              type="text"
              className="form-controll"
              id="status"
              name="status"
              value={status}
              onChange={handleInput}
              cols="30"
              rows="4"
            />
            <small className="text-danger d-block text-right">
              {status.length}/200
            </small>
          </div>
        </div>
        <label htmlFor="gender">Gender</label>
        <div className="input-group-prepent px-0 mb-4">
          <select
            name="gender"
            id="gender"
            className="custom-select text-capitalize"
            onChange={handleInput}
            value={gender}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          className="btn btn-info w-100"
          type="submit"
          
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
