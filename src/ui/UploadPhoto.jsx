import styled from "styled-components";
import { useEffect, useState } from "react";
import Label from "./Label";
import { IoCloudUploadOutline } from "react-icons/io5";
import InputErrorMsg from "./ErrorMsgText";
import { uploadImage } from "../hooks/uploadImage";
import toast from "react-hot-toast";

const PhotoArea = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  border: 2px dashed
    ${(props) =>
      props.hasError ? "var(--color-red-400)" : "var(--color-grey-200)"};
  border-radius: 12px;
  background-color: var(--color-grey-50);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: var(--color-brand-400);
    background-color: var(--color-grey-100);
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const PhotoLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  cursor: pointer;
  color: var(--color-grey-600);
  font-size: 1.3rem;

  svg {
    font-size: 2.5rem;
    color: var(--color-brand-600);
  }
`;

const FileName = styled.span`
  font-size: 1.2rem;
  color: var(--color-brand-600);
  font-weight: 500;
`;

function UploadPhoto({ errors, setValue, isUploading, setIsUploading, reset }) {
  const [fileName, setFileName] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setIsUploading(true);

    try {
      const url = await uploadImage(file);

      setValue("photo", url, {
        shouldValidate: true,
        shouldDirty: true,
      });
    } catch (err) {
      toast.error("Error to upload the photo" + err.message);
      setFileName("");
    } finally {
      setIsUploading(false);
    }
  }

  useEffect(() => {
    setFileName("");
  }, [reset]);

  return (
    <>
      <PhotoArea hasError={errors.photo}>
        <HiddenFileInput
          type="file"
          id="photo"
          accept="image/*"
          disabled={!isUploading}
          onChange={handleFileChange}
        />

        <PhotoLabel htmlFor="photo">
          <IoCloudUploadOutline size={32} />
          <span>
            {isUploading
              ? "Uploading..."
              : fileName || "Click here to upload the photo"}
          </span>
          {fileName && !isUploading && <FileName>✓ {fileName}</FileName>}
        </PhotoLabel>
        {errors.photo && <InputErrorMsg>{errors.photo.message}</InputErrorMsg>}
      </PhotoArea>
    </>
  );
}

export default UploadPhoto;
