import Work from "@models/Work";
import { connectToDB } from "@mongodb/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const work = await Work.findById(params.id).populate("creator");

    if (!work) return new Response("The Work Not Found", { status: 404 });

    return new Response(JSON.stringify(work), { status: 200 });
  } catch (err) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  try {
    await connectToDB();

    const data = await req.formData();

    /* Extract info from the data */
    const creator = data.get("creator");
    const category = data.get("category");
    const title = data.get("title");
    const description = data.get("description");
    const price = data.get("price");

    /* Get an array of uploaded photos */
    const photos = data.getAll("workPhotoPaths");

    const workPhotoPaths = [];

    /* Process and store each photo  */
    for (const photo of photos) {
      if (photo instanceof Object) {
        // Read the photo as an ArrayBuffer
        const bytes = await photo.arrayBuffer();

        // Convert it to a Buffer
        const buffer = Buffer.from(bytes);

        // Define the destination path for the uploaded file
        const workImagePath = `C:/Users/Phuc/Desktop/artify/public/uploads/${photo.name}`;

        // Write the buffer to the filessystem
        await writeFile(workImagePath, buffer);

        // Store the file path in an array
        workPhotoPaths.push(`/uploads/${photo.name}`);
      } else {
        // If it's an old photo
        workPhotoPaths.push(photo);
      }
    }

    /* Find the existing Work */
    const existingWork = await Work.findById(params.id)

    if (!existingWork) {
      return new Response("The Work Not Found", { status: 404 });
    }

    /* Update the Work with the new data */
    existingWork.category = category
    existingWork.title = title
    existingWork.description = description
    existingWork.price = price
    existingWork.workPhotoPaths = workPhotoPaths

    await existingWork.save()

    return new Response("Successfully updated the Work", { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Error updating the Work", { status: 500 })
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB()
    await Work.findByIdAndDelete(params.id)
  
    return new Response("Successfully deleted the Work", { status: 200 })
  } catch (err) {
    console.log(err)
    return new Response("Error deleting the Work", { status: 500 })
  }
}
