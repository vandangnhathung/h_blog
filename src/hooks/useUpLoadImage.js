import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useUpLoadImage({
  setValue,
  getValues,
  imageName = null,
}) {
  const [progress, setProgress] = useState(0);
  const [imageAPI, setImageAPI] = useState("");
  if (!setValue || !getValues) return;
  //Upload image function
  const handleUploadImage = (file) => {
    const storage = getStorage(); //Get data from storage in firebase
    const storageRef = ref(storage, "pictures/" + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progressImage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressImage);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("Nothing");
        }
      },
      (error) => {
        console.log("Error");
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImageAPI(downloadURL);
        });
      }
    );
  };
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue("image_name", file.name);
    handleUploadImage(file);
  };

  //
  //DELETE IMAGE IN FIREBASE
  const handleDeleteImage = () => {
    const storage = getStorage();

    // Create a reference to the file to delete
    const imageRef = ref(
      storage,
      "pictures/" + (imageName || getValues("image_name"))
    );

    // Delete the file
    deleteObject(imageRef)
      .then(() => {
        console.log("delete succesfully");
        setProgress(0);
        setImageAPI("");
      })
      .catch((error) => {
        console.log(error);
        setImageAPI("");
      });
  };
  //
  return {
    handleSelectImage,
    handleDeleteImage,
    progress,
    imageAPI,
    setImageAPI,
    setProgress,
    setImageAPI,
  };
}
