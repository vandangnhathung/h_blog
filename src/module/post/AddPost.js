import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Radio from "../../components/FieldCheckBoxAndRadio/Radio";
import DashboardHeading from "../../drafts/DashboardHeading";
import FieldCheckBoxAndRadio from "../../components/FieldCheckBoxAndRadio/FieldCheckBoxAndRadio";
import { status } from "../../utils/constants";
import UploadImage from "../../images/UploadImage";
import useUpLoadImage from "../../hooks/useUpLoadImage";
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-folder/firebase-config";
import Toggle from "../../components/toggle/Toggle";
import { Dropdown } from "../../components/dropdown/index";
import slugify from "slugify";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";
const AddPostStyles = styled.div`
  .add {
    &-post-main {
    }
    &-post-form {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px 40px;
    }
  }
`;
const AddPost = () => {
  const { userInfo } = useAuth();
  const [clickCategory, setClickCategory] = useState("");
  const { control, handleSubmit, watch, setValue, getValues, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      hot: false,
      imageAPI: "",
      categoryId: {},
      user: {},
    },
  });
  //useUpLoadImage custom hook ^^.
  const {
    handleDeleteImage,
    setImageAPI,
    setProgress,
    handleSelectImage,
    progress,
    imageAPI,
  } = useUpLoadImage({ setValue, getValues });
  const watchStatus = watch("status");
  //SEND DATA TO FIRESTORE
  //LOADING
  const [loading, setLoading] = useState(false);
  const addNewPost = async (values) => {
    try {
      setLoading(true);
      const slugifyConvert = slugify(values.title || values.slug, {
        lower: false,
      });
      const statusConvert = Number(values.status);
      const colRef = collection(db, "posts");
      await addDoc(colRef, {
        ...values,
        slug: slugifyConvert,
        imageAPI,
        createdAt: serverTimestamp(),
        status: statusConvert,
        userId: userInfo.uid,
      });
      setLoading(false);
      reset({
        title: "",
        slug: "",
        status: 2,
        hot: false,
        imageAPI: "",
        categoryId: {},
        userId: {},
      });
      setImageAPI("");
      setProgress(0);
      setClickCategory({});
      toast("Success submit your post");
    } catch (error) {
      setLoading(false);
    }
  };
  //
  //TOGGLE HOT
  const watchHot = watch("hot");
  //CATEGORIES DATA
  //GET CATEGORIES DATA
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    async function addCategory() {
      const colRef = collection(db, "categories");
      const querySnapshot = await getDocs(colRef);
      let arrCategories = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        arrCategories.push({ id: doc.id, ...doc.data() });
      });
      setCategories(arrCategories);
    }
    addCategory();
  }, []);
  // handleSelectOption
  const handleSelectOption = (values) => {
    setValue("categoryId", values.id);
    setClickCategory(values);
  };

  return (
    <AddPostStyles>
      <DashboardHeading>Add new post</DashboardHeading>
      <div className="add-post-main">
        <form onSubmit={handleSubmit(addNewPost)}>
          <div className="add-post-form">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                type="text"
                placeholder="Please enter your title"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label htmlFor="slug">Slug</Label>
              <Input
                name="slug"
                type="text"
                placeholder="Please enter slug"
                control={control}
              ></Input>
            </Field>
            <Field>
              <Label>Image</Label>
              <UploadImage
                type="file"
                onChange={handleSelectImage}
                handleDeleteImage={handleDeleteImage}
                progress={progress}
                imageAPI={imageAPI}
              ></UploadImage>
            </Field>

            <Field>
              <Label>Category</Label>
              <Dropdown>
                <Dropdown.SelectYourCategory placeholder="Select your option"></Dropdown.SelectYourCategory>
                <Dropdown.ListCategory>
                  {categories.length > 0 &&
                    categories.map((item) => (
                      <Dropdown.Option
                        key={item.id}
                        onClick={() => {
                          handleSelectOption(item);
                        }}
                      >
                        {item.name}
                      </Dropdown.Option>
                    ))}
                </Dropdown.ListCategory>
                {clickCategory?.name && (
                  <span className="absolute -bottom-full -z-1 inline-block rounded-lg p-3 px-4 bg-green-400 text-white text-sm">
                    {clickCategory?.name}
                  </span>
                )}
              </Dropdown>
            </Field>
            <Field>
              <Label>Status post</Label>
              <FieldCheckBoxAndRadio>
                <Radio
                  control={control}
                  name="status"
                  checked={Number(watchStatus) === status.APPROVED}
                  value={status.APPROVED}
                >
                  Approved
                </Radio>
                <Radio
                  control={control}
                  name="status"
                  checked={Number(watchStatus) === status.PENDING}
                  value={status.PENDING}
                >
                  Pending
                </Radio>
                <Radio
                  control={control}
                  name="status"
                  checked={Number(watchStatus) === status.REJECTED}
                  value={status.REJECTED}
                >
                  Reject
                </Radio>
              </FieldCheckBoxAndRadio>
            </Field>

            <Field>
              <Label>Feature post</Label>
              <Toggle
                on={watchHot}
                onClick={() => {
                  setValue("hot", !watchHot);
                }}
              ></Toggle>
            </Field>
          </div>
          <Button>
            {!loading && <span>Add new post</span>}
            {loading && (
              <div className="w-11 h-11 rounded-full border-8 border-white border-b-transparent animate-spin"></div>
            )}
          </Button>
        </form>
      </div>
    </AddPostStyles>
  );
};

export default AddPost;
