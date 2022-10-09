import React, { useContext, useState } from "react";
import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../Config/firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { BsCardImage } from "react-icons/bs";
import {IoMdAttach} from 'react-icons/io'
import './index.css'

const Input = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleSend = async () => {
        if (img) {
            const storageRef = ref(storage, uuid());

            const uploadTask = uploadBytesResumable(storageRef, img);

            uploadTask.on(
                (error) => {
                    //TODO:Handle Error
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateDoc(doc(db, "chats", data.chatId), {
                            messages: arrayUnion({
                                id: uuid(),
                                text,
                                senderId: currentUser.uid,
                                date: Timestamp.now(),
                                img: downloadURL,
                            }),
                        });
                    });
                }
            );
        } else {
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                }),
            });
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });
        setText("")
        setImg(null);
    };
    return (
        <div className='input'>
            <input placeholder='Type something'
                onChange={e => setText(e.target.value)}
                value={text}
                style={{
                    width: '100%', border: 'none',
                    outline: 'none', color: '#2f2d52', fontSize: '18px'
                }} />
            <div className='send'>
                <IoMdAttach cursor={"pointer"} size={26} />
                <input type='file' style={{ display: 'none' }} id='file' onChange={e => setImg(e.target.files[0])} />
                <label htmlFor='file'>
                    <BsCardImage cursor={"pointer"} size={26} /> </label>
                <button style={{
                    border: 'none',
                    padding: '10px 10px', marginRight: '10px',
                    color: 'white', backgroundColor: '#8da4f1',
                    cursor:'pointer'
                }}
                    onClick={handleSend}> send</button> </div> </div>

    );
};

export default Input;