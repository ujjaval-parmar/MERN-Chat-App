import express from 'express';
import { Server } from "socket.io"
import http from "http"
import cors from 'cors';
import dotenv from 'dotenv';
import { getUserFromToken } from '../controller/userContollers.js/GetUserFromToken.js';
import UserModel from '../model/userModel.js';
import { ConversationModel, MessageModel } from '../model/conversationModel.js';

dotenv.config();


export const app = express();




export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    }
});


// Online User:
const onlineUser = new Set([]);

io.on('connection', async (socket) => {


    // console.log('User Conected', socket.id);

    const token = socket.handshake.auth.token;


    if (token) {


        const user = await getUserFromToken(token);

        // console.log(user);

        // Create Room:

        if (user) {


            socket.join(user?._id.toString());

            onlineUser.add(user?._id?.toString());

            io.emit('onlineUser', Array.from(onlineUser));

            socket.on('message-page', async (userId) => {

                const userDetails = await UserModel.findById(userId).select('-password');

                const payload = {
                    ...userDetails._doc,
                    online: onlineUser.has(userId)
                }

                socket.emit('message-user', payload);

                // Previous Message

                const getConversationMessage = await ConversationModel.findOne({
                    $or: [
                        {
                            sender: user?._id,
                            receiver: userId
                        },
                        {
                            sender: userId,
                            receiver: user?._id
                        }
                    ]
                }).populate('messages').sort({ createdAt: -1 });


                socket.emit('message', getConversationMessage?.messages);

            });





            // New Message
            socket.on('new message', async (data) => {

                // Check Converstion Avilable for both Users:

                let conversation = await ConversationModel.findOne({
                    $or: [
                        {
                            sender: data?.sender,
                            receiver: data?.receiver
                        },
                        {
                            sender: data?.receiver,
                            receiver: data?.sender
                        }
                    ]
                });


                if (!conversation) {
                    conversation = await ConversationModel.create({
                        sender: data?.sender,
                        receiver: data?.receiver,

                    });

                }

                const messages = await MessageModel.create({
                    text: data?.text || '',
                    imageUrl: data?.imageUrl || '',
                    videoUrl: data?.videoUrl || '',
                    msgByUserId: data?.msgByUserId
                });

                const updateConversation = await ConversationModel.updateOne(
                    {
                        _id: conversation._id
                    },
                    {
                        $push: { messages: messages?._id }
                    }
                )

                const getConversationMessage = await ConversationModel.findOne({
                    $or: [
                        {
                            sender: data?.sender,
                            receiver: data?.receiver
                        },
                        {
                            sender: data?.receiver,
                            receiver: data?.sender
                        }
                    ]
                }).populate('messages').sort({ createdAt: -1 });

                io.to(data?.sender).emit('message', getConversationMessage?.messages || []);

                io.to(data?.receiver).emit('message', getConversationMessage?.messages || []);

            });


            // Sidebar
            socket.on('sidebar', async (currentUserId) => {
                // console.log("sidebar: ", currentUserId);

                const currentUserConversation = await ConversationModel.find({
                    $or: [
                        { sender: currentUserId },
                        { receiver: currentUserId }
                    ]
                }).sort({ updatedAt: -1 }).populate('messages').populate('sender').populate('receiver');

                // console.log("currenUserConversation: ", currentUserConversation);

                const conversation = currentUserConversation.map(item => {

                    const countUnseenMsg = item.messages.reduce((prev, curr) => prev + (curr.seen ? 1 : 0), 0);

                    return {
                        _id: item?._id,
                        sender: item?.sender,
                        receiver: item?.receiver,
                        unseenMsg: countUnseenMsg,
                        lastMsg: item?.messages[item?.messages?.length - 1]
                    }
                })

                socket.emit('conversation', conversation)
            })


            // Disconnect
            socket.on('disconnect', () => {
                onlineUser.delete(user?._id);
                console.log(' User Disconnect', socket.id);
            })
        }

    }

});




