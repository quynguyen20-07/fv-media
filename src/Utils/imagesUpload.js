export const checkImage = (file) => {
  let err = "";
  if (!file) return (err = "File does not exits.");

  if (file.size > 1024 * 1024) err = "The largest image size is 1mb.";

  if (file.type !== "image/jpeg" && file.type !== "image/png")
    err = "Image is not incorrect.";

  return err;
};
export const imageUpload = async (images) => {
  let imgArray = [];
  for (const item of images) {
    const formData = new FormData();

    if (item.camera) {
      formData.append("file", item.camera);
    } else formData.append("file", item);

    formData.append("upload_preset", "yjrboomg");

    formData.append("cloud_name", "food-view-app");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/food-view-app/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    imgArray.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArray;
};
