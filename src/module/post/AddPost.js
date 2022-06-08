import { async } from "@firebase/util";
import React, { useState } from "react";
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
import Dropdown from "../../components/dropdown/Dropdown";

import UploadImage from "../../images/UploadImage";
import useUpLoadImage from "../../hooks/useUpLoadImage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase-folder/firebase-config";
import Toggle from "../../components/toggle/Toggle";

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
  const { control, handleSubmit, watch, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      hot: false,
      imageAPI: "",
      category: {},
      user: {},
    },
  });
  //useUpLoadImage custom hook ^^.
  const { handleDeleteImage, handleSelectImage, progress, imageAPI } =
    useUpLoadImage({ setValue, getValues });
  const watchStatus = watch("status");
  const addNewPost = async (values) => {
    const colRef = collection(db, "posts");
    await addDoc(colRef, {
      ...values,
      imageAPI,
      createdAt: serverTimestamp(),
    });
  };
  //
  //TOGGLE HOT
  const watchHot = watch("hot");
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
              <Dropdown></Dropdown>
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
          <Button>Add new post</Button>
        </form>
      </div>
    </AddPostStyles>
  );
};

export default AddPost;
