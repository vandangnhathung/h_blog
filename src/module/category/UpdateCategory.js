import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import slugify from "slugify";
import Button from "../../components/button/Button";
import Field from "../../components/field/Field";
import FieldCheckBoxAndRadio from "../../components/FieldCheckBoxAndRadio/FieldCheckBoxAndRadio";
import Radio from "../../components/FieldCheckBoxAndRadio/Radio";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import DashboardHeading from "../../drafts/DashboardHeading";
import { db } from "../../firebase-folder/firebase-config";
import { categoryStatus } from "../../utils/constants";

const UpdateCategory = () => {
  const [idParams] = useSearchParams();
  const id = idParams.get("id");
  const {
    handleSubmit,
    control,
    watch,
    reset,
    formState: { isSubmitting },
  } = useForm({ mode: "onChange", defaultValues: {} });
  useEffect(() => {
    (async () => {
      const colRef = doc(db, "categories", id);
      const document = await getDoc(colRef);
      reset({ ...document.data() });
    })();
  }, []);
  const updateCategory = async (values) => {
    console.log("ok");
    const colRef = doc(db, "categories", id);
    const slugReset = "";
    values.slug = slugReset;
    await updateDoc(colRef, {
      name: values.name,
      slug: slugify(values.slug || values.name, { lower: true }),
      status: Number(values.status),
    });
    console.log(slugify(values.slug || values.name, { lower: true }));
  };
  const watchStatus = watch("status");
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update the category id: ${id}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(updateCategory)}>
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
          <span>Update category</span>
        </Button>
      </form>
    </div>
  );
};

export default UpdateCategory;
