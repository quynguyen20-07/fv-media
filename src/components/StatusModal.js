import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTypes";
import { createPost, updatePost } from "../redux/actions/postAction";
import Icons from "../components/Icons";
import { imageShow, videoShow } from "../Utils/mediaShow";

const StatusModal = () => {
  const { auth, theme, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const [camera, setCamera] = useState(false);
  const videoRef = useRef();
  const canvasRef = useRef();
  const [track, setTrack] = useState("");

  const handleFileUpload = (e) => {
    const files = [...e.target.files];
    let error = "";
    let newImgs = [];

    files.forEach((file) => {
      if (!file) return (error = "File does not exist.");

      if (file.size > 1024 * 1024 * 5) {
        return (error = "The image langest is 5mb.");
      }
      return newImgs.push(file);
    });


    if (error) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error } });
    setImages([...images, ...newImgs]);
  };

  const removeImage = (index) => {
    const delArr = [...images];
    delArr.splice(index, 1);
    setImages(delArr);
  };

  const handleCamera = () => {
    setCamera(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((MediaStream) => {
          videoRef.current.srcObject = MediaStream;
          videoRef.current.play();
          const track = MediaStream.getTracks();
          setTrack(track[0]);
        })
        .catch((error) => console.log(error));
    }
  };

  const handleCapture = () => {
    const width = videoRef.current.clientWidth;
    const height = videoRef.current.clientHeight;

    canvasRef.current.setAttribute("width", width);
    canvasRef.current.setAttribute("height", height);

    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, width, height);
    let URL = canvasRef.current.toDataURL();
    setImages([...images, { camera: URL }]);
  };

  const handleStopCamera = () => {
    track.stop();
    setCamera(false);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (images.length === 0)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: "Please choose videos or images to post" },
      });

    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));

    } else {
      dispatch(createPost({ content, images, auth, socket }));

    }
    setContent("");
    setImages([]);
    if (track) track.stop();
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.content)
      setImages(status.images)
    }
  }, [status])




  return (
    <div className="status-modal" >
      <form onSubmit={handlePost}>
        <div className="stt-header">
          <h5 className="text-dark m-0">New post</h5>
          <span
            style={{ cursor: "pointer", fontSize: "24px" }}
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            &times;
          </span>
        </div>

        <div className="stt-body">
          <textarea
            name="content"
            value={content}
            placeholder={`${auth.user.username}, What do you thinking!!`}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="d-flex">
            <div className="flex-fill"></div>
            <Icons setContent={setContent} content={content} theme={theme} />
          </div>
          <div className="upload-show">
            {images.map((img, index) => (
              <div key={index} id="file_img">
                {
                  img.camera ? imageShow(img.camera)
                    : img.url
                      ?
                      <>
                        {
                          img.url.match(/video/i)
                            ? videoShow(img.url, theme)
                            : imageShow(img.url, theme)
                        }
                      </>
                      : <>
                        {
                          img.type.match(/video/i)
                            ? videoShow(URL.createObjectURL(img), theme)
                            : imageShow(URL.createObjectURL(img), theme)
                        }
                      </>
                }
                <span onClick={() => removeImage(index)}>&times;</span>
              </div>
            ))}
          </div>

          {camera && (
            <div className="camera position-relative">
              <video
                src=""
                autoPlay
                muted
                ref={videoRef}
                style={{ filter: theme ? "invert(1" : "invert(0)" }}
                width="100%"
                height="100%"
              />
              <span onClick={handleStopCamera}>&times;</span>
              <canvas ref={canvasRef} style={{ display: "none" }} />
            </div>
          )}

          <div className="file-input">
            {camera ? (
              <i className="fas fa-camera" onClick={handleCapture} />
            ) : (
              <>
                <i className="fas fa-camera" onClick={handleCamera} />
                <div className="file-up">
                  <i className="fas fa-image" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                  />
                </div>
              </>
            )}
          </div>

        </div>

        <div className="stt-footer my-2">
          <button className="btn btn-secondary" type="submit">
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
