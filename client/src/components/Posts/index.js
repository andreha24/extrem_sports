import React, { useState, useEffect } from "react";
import axios from "axios";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import PostForm from "./PostForm";
import formatDateAndTime from "../../utils/formatDateAndTime";
import plus from "../../assets/plus.png";
import editIcon from "../../assets/edit-icon.png";
import deleteIcon from "../../assets/garbage.png";

import "./index.scss";

const Posts = ({ user, userId }) => {
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [postsId, setPostsId] = useState([]);
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) {
      axios.get("http://localhost:5000/post/getAllPersonalPosts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setPosts(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
    axios.get(`http://localhost:5000/post/getAllUserPosts/${userId}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeAddFormView = () => {
    setIsAddFormOpen((prev) => !prev);
  };

  const clearEditFormView = (id) => {
    setPostsId((prev) => prev.filter((postId) => postId !== id));
  };

  const addPost = (values) => {
    axios.post("http://localhost:5000/post/addPost", {
      ...values,
      token,
    })
      .then((response) => {
        setPosts((prev) => [response.data.post, ...prev]);
        changeAddFormView();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editPost = (id) => (values) => {
    axios.patch("http://localhost:5000/post/editPost", {
      ...values,
      id,
    })
      .then((response) => {
        console.log(response.data);
        setPosts((prev) => prev.map((post) => {
          if (post.id === response.data.post.id) {
            return response.data.post;
          }

          return post;
        }));

        clearEditFormView(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePost = (postId) => {
    axios.delete(`http://localhost:5000/post/deletePost/${postId}`)
      .then((response) => {
        console.log(response);
        alert("WOW");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="posts-container">
      <span className="posts-container-paragraph">Posts</span>
      { !user
        && (
        <button
          type="button"
          className="add-post-btn"
          onClick={changeAddFormView}
        >
          <img src={plus} alt="plus" />
        </button>
        ) }
      <CSSTransition
        in={isAddFormOpen}
        timeout={300}
        classNames="post-form-animation"
        unmountOnExit
      >
        <PostForm changeFormView={changeAddFormView} onSubmit={addPost} buttonName="Add post" />
      </CSSTransition>
      {posts.length === 0 ? <div style={{ fontSize: "20px" }}>No posts yet</div>
        : (
          <div className="posts">
            {posts.map(({
              id, topic, text, dateOfCreation,
            }) => (
              postsId.includes(id) ? (
                <CSSTransition
                  in={postsId.includes(id)}
                  timeout={300}
                  classNames="post-form-animation"
                  unmountOnExit
                  key={id}
                >
                  <PostForm
                    changeFormView={() => clearEditFormView(id)}
                    initialValues={{ topic, text }}
                    onSubmit={editPost(id)}
                    buttonName="Edit post"
                  />
                </CSSTransition>
              ) : (
                <div className="posts-item" key={id}>
                  {!user
                    && (
                      <div className="posts-item-btns">
                        <button
                          type="button"
                          onClick={() => {
                            setPostsId((prev) => [...prev, id]);
                          }}
                        >
                          <img src={editIcon} alt="edit" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deletePost(id)}
                        >
                          <img src={deleteIcon} alt="delete" />
                        </button>
                      </div>
                    )}
                  <span className="posts-item-topic">{topic}</span>
                  <span>
                    {text}
                  </span>
                  <span>
                    publication date:
                    {formatDateAndTime(dateOfCreation)}
                  </span>
                </div>
              )))}
          </div>
        )}
    </div>
  );
};

Posts.propTypes = {
  user: PropTypes.bool,
  userId: PropTypes.string,
};

export default Posts;
