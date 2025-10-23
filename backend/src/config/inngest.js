import { Inngest } from "inngest";
import { connectDb } from "./db.js";
import { User } from "../models/user.model.js";

export const inngest = new Inngest({ id: "unlink" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDb();
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const newUser = {
      clerkId: id,
      name: `${first_name || ""} ${last_name || ""}`,
      email: email_addresses[0]?.email_address,
      image: image_url,
    };
    await User.create(newUser);
  }
);

const deleteUserFromDb = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event;
    await connectDb();
    await User.deleteOne({ clerkId: id });
  }
);

export const functions = [syncUser, deleteUserFromDb];
