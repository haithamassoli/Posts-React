import React, { useState, useEffect, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import AddComment from "./AddComment";

function Comments(props) {
  const [comment, setComment] = useState([]);

  const [showEdit, setShowEdit] = useState(false);
  const [showEditId, setShowEditId] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (localStorage.getItem("comments")) {
      let arr = JSON.parse(localStorage.getItem("comments"));
      let commnets = arr.filter((comment) => {
        return comment.postID === props.postId;
      });
      setComment(commnets);
    }
  }, [props.postId]);

  const deleteHandler = (e, id) => {
    let comments = comment.filter((el) => el.id !== id);
    localStorage.setItem("comments", JSON.stringify(comments));
    setComment(comments);
  };

  const editHandler = (e, comments) => {
    setNewComment(comments.comment);
    setShowEditId(comments.id);
    setShowEdit(true);
  };

  const saveHandler = (e, id) => {
    let comments = comment.map((el) => {
      if (el.id === id) {
        return { ...el, comment: newComment };
      } else {
        return el;
      }
    });
    localStorage.setItem("comments", JSON.stringify(comments));
    setComment(comments);
    setShowEdit(false);
  };

  return (
    <div className="container">
      {comment.length === 0
        ? ""
        : comment.map((comments, index) => (
            <div key={index}>
              <div>
                <div className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      className="rounded-full w-12"
                      src={comments.img}
                      alt="avatar"
                    />
                    <div className="text-xl">{comments.name}</div>
                  </div>
                  <div>
                    <div className="">{comments.date}</div>
                  </div>
                </div>
                <div className="">
                  <div className="flex justify-between mb-5 items-center">
                    <p className="bg-white rounded-3xl px-10 py-5 w-4/5 mt-5">
                      {comments.comment}
                    </p>

                    <div className="">
                      <Menu
                        as="div"
                        className="relative  mt-5 inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex h-14 w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 sm:text-[15px]">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                          </Menu.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute w-[100px] right-0 mt-2  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 flex flex-col items-center justify-center">
                              <button
                                onClick={(e) => deleteHandler(e, comments.id)}
                                className="block w-full px-4 py-2 text-sm bg-gray-100 text-gray-900"
                              >
                                Delete
                              </button>
                              {showEdit && showEditId === comments.id ? (
                                <>
                                  <div className="">
                                    <input
                                      type="text"
                                      value={newComment}
                                      className="border border-gray-400 rounded-lg p-2 w-full mb-5"
                                      onChange={(e) =>
                                        setNewComment(e.target.value)
                                      }
                                    />
                                  </div>
                                  <button
                                    className="px-4 py-1 ring-2 mb-5 ring-red-400 rounded-3xl"
                                    onClick={(e) => saveHandler(e, comments.id)}
                                  >
                                    Save
                                  </button>
                                </>
                              ) : (
                                <button
                                  onClick={(e) => editHandler(e, comments)}
                                  className="block w-[100px] px-4 py-2 text-sm bg-gray-100 text-gray-900"
                                >
                                  Edit
                                </button>
                              )}
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

      <AddComment
        key={Date.now()}
        postId={props.postId}
        setComment={setComment}
        comment={comment}
      />
    </div>
  );
}

export default Comments;
