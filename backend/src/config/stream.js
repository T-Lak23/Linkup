import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const streamClient = StreamChat.getInstance(
  ENV.STREAM_API_KEY,
  ENV.STREAM_API_SECRET
);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    console.log("user upserted successfully", userData.name);
    return userData;
  } catch (error) {
    console.log(error);
  }
};

export const deleteStreamUser = async (id) => {
  try {
    await streamClient.deleteUser(id);
    console.log("User deleted successfully", id);
  } catch (error) {
    console.log(error);
  }
};

export const generateStreamToken = async (id) => {
  try {
    const userId = id.toString();
    return streamClient.createToken(userId);
  } catch (error) {
    console.log("Error generating stream token", error);
    return null;
  }
};
