import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Component/Navbar";
import "./Home.css";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { DataContext } from "../DataContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

toast.configure();

function Home() {
  const access_token = JSON.parse(window.localStorage.getItem("jwt"));
  const [user, setUser] = useContext(DataContext);
  const [data, setData] = useState([]);
  const [text, setText] = useState([]);
  const [viewComments, setViewComments] = useState(false);

  useEffect(() => {
    fetch("https://myinstaclonebackend.herokuapp.com/getsubpost", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.posts);
      });
  }, []);

  const likePost = (id) => {
    fetch("https://myinstaclonebackend.herokuapp.com/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const unlikePost = (id) => {
    fetch("https://myinstaclonebackend.herokuapp.com/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        //   console.log(result)
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeComment = (text, postId) => {
    fetch("https://myinstaclonebackend.herokuapp.com/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        postId,
        text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setText("");
        const newData = data.map((item) => {
          if (item._id == result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleComment() {
    setViewComments(!viewComments);
  }
  const deletePost = (postid) => {
    fetch(`https://myinstaclonebackend.herokuapp.com/deletepost/${postid}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((result, err) => {
        if (result?.err) {
          toast.error(err);
        } else {
          toast.success("Post deleted successfully");
        }
        const newData = data.filter((item) => {
          return item._id !== result._id;
        });
        setData(newData);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="home">
        <div className="card__container">
          {data.map((item) => {
            return (
              <>
                <div className="home__card" key={item._id}>
                  <div className="flex items-center justify-between">
                    <Link
                      to={
                        item.postedBy._id !== user._id
                          ? "/profile/" + item.postedBy._id
                          : "/profile"
                      }
                    >
                      <h1 className="home__heading  mt-1 ml-5">
                        {item.postedName}
                      </h1>
                    </Link>
                    {item.postedBy._id === user._id && (
                      <DeleteIcon
                        className="home__deleteIcon cursor-pointer mr-4"
                        onClick={() => deletePost(item._id)}
                      />
                    )}
                  </div>
                  <img className="homecard__image" src={item.photo} alt="" />
                  <h1 className="home__data mt-3 mb-3 ml-4">
                    <span className="home__userName mr-2">
                      {item.postedName} :
                    </span>
                    {item.title}
                  </h1>
                  <span className="home__userName ml-4 mt-2 margin__homeLike">
                    {item.likes.length} Likes
                  </span>
                  <div className="flex items-center ml-3 mt-3">
                    {item.likes.includes(user._id) ? (
                      <FavoriteIcon
                        fontSize="large"
                        className="home__likeEButton cursor-pointer"
                        onClick={() => {
                          unlikePost(item._id);
                        }}
                      />
                    ) : (
                      <FavoriteIcon
                        fontSize="large"
                        className="home__likeButton cursor-pointer"
                        onClick={() => {
                          likePost(item._id);
                        }}
                      />
                    )}

                    <ChatBubbleOutlineIcon
                      fontSize="large"
                      className="ml-4 cursor-pointer"
                    />
                    <ShareIcon
                      fontSize="large"
                      className="ml-4 cursor-pointer"
                    />
                  </div>

                  <p className="home__comments mt-2 ml-4">Comments :</p>
                  {!viewComments &&
                    item.comments.map((record, index) => {
                      return (
                        index <= 1 && (
                          <h1 className="home__data mt-3  ml-4">
                            <span className="home__userName mr-2">
                              {record.commentName} :
                            </span>
                            {record.text}
                          </h1>
                        )
                      );
                    })}

                  {item.comments.length > 1 && (
                    <p
                      className="home__comments mt-2 ml-4 cursor-pointer"
                      onClick={handleComment}
                    >
                      View all comments
                    </p>
                  )}
                  {viewComments && (
                    <>
                      {item.comments.map((record, index) => {
                        return (
                          <h1 className="home__data mt-3  ml-4">
                            <span className="home__userName mr-2">
                              {record.commentName} :
                            </span>
                            {record.text}
                          </h1>
                        );
                      })}
                    </>
                  )}
                  <div className="chat_footer">
                    <InsertEmoticonIcon
                      fontSize="large"
                      className="chatFooter__icon cursor-pointer"
                    />
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        makeComment(text, item._id);
                      }}
                    >
                      <input
                        type="text"
                        placeholder="Type a comment"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </form>
                    <SendIcon
                      fontSize="large"
                      className="chatFooter__icon cursor-pointer"
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
