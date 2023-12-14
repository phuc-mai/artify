import Work from "@models/Work";
import User from "@models/User";

import { connectToDB } from "@mongodb/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const user = await User.findById(params.id);
    const workList = await Work.find({ creator: params.id }).populate("creator");

    user.works = workList;
    await user.save();

    return new Response(JSON.stringify({ user: user, workList: workList }), { status: 200 });
  } catch (err) {
    return new Response("Failed to fetch work list by user", { status: 500 })
  }
}