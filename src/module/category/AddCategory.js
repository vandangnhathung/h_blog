import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import FieldCheckBoxAndRadio from "../../components/FieldCheckBoxAndRadio/FieldCheckBoxAndRadio";
import Radio from "../../components/FieldCheckBoxAndRadio/Radio";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import { useActiveDashboard } from "../../contexts/activeItemDashboardContext";
import DashboardHeading from "../../drafts/DashboardHeading";
import { db } from "../../firebase-folder/firebase-config";
import { categoryStatus } from "../../utils/constants";
import Loading from "../../components/loading/Loading";
const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const { setDeleteActive } = useActiveDashboard();
  setDeleteActive(true);
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
    },
  });
  const watchStatus = watch("status");
  //ADD CATEGORY INTO DATABASE
  const sendCategory = async (values) => {
    console.log(values);
    setLoading(true);
    try {
      const statusConvert = Number(values.status);
      const slugConvert = slugify(values.name || values.slug, { lower: true });
      const colRef = collection(db, "categories");
      await addDoc(colRef, {
        ...values,
        status: statusConvert,
        createdAt: serverTimestamp(),
        slug: slugConvert,
      });
      reset({
        name: "",
        slug: "",
        status: 1,
      });
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(sendCategory)}>
        <div className="form-grid">
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your category slug"
            ></Input>
          </Field>
        </div>
        <div className="form-grid">
          <Field>
            <span>Status</span>
            <FieldCheckBoxAndRadio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approve
              </Radio>{" "}
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                value={categoryStatus.UNAPPROVED}
              >
                Unapprove
              </Radio>
            </FieldCheckBoxAndRadio>
          </Field>
        </div>
        <Button disabled={isSubmitting} isLoading={isSubmitting}>
          <span>Add new category</span>
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;
