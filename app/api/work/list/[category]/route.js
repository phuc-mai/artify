import { connectToDB } from "@mongodb/database";
import Work from "@models/Work";

export const GET = async (req, { params }) => {
  try {
    await connectToDB()

    const { category } = params

    let workList

    if (category !== "All") {
      workList = await Work.find ({ category }).populate("creator")
    } else {
      workList = await Work.find().populate("creator")
    }

    return new Response(JSON.stringify(workList), { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Failed to fetch Work List", { status: 500 })
  }
}