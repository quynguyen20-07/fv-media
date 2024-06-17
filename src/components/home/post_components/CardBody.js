import React, { useState } from "react";
import Carousel from "../../Carousel";
import { ArrowDropDownOutlined, ArrowDropUpOutlined } from "@material-ui/icons";

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <div className="card-B">
      <div className="my-2 h5 font-weight-light"
        style={{
          filter: theme ? 'invert(1)' : 'invert(0)',
          color: theme ? '#fff' : '#111',
        }}>
        {
          post.content.length < 60
            ? post.content
            : readMore
              ? post.content + " "
              : post.content.slice(0, 60) + "...."
        }
        {post.content.length > 60 && (
          <span className="readMore" onClick={() => setReadMore(!readMore)}>
            {readMore ? (
              <ArrowDropUpOutlined
                htmlColor="#5463FF"
                style={{ fontSize: "30px" }}
              />
            ) : (
              <ArrowDropDownOutlined
                htmlColor="#5463FF"
                style={{ fontSize: "30px" }}
              />
            )}
          </span>
        )}
      </div>
      <div className="card-content">
        {post.images.length > 0 && (
          <Carousel images={post.images} id={post._id} />
        )}
      </div>
    </div>
  );
};

export default CardBody;
