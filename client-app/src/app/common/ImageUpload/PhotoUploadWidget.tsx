import React, { useState, useEffect } from 'react';
import {
  Button,
  ButtonGroup,
  Grid,
  GridColumn,
  Header,
} from 'semantic-ui-react';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';

interface Props {
  uploading: boolean;
  handlePhotoUpload: (file: Blob) => void;
}

const PhotoUploadWidget = ({ uploading, handlePhotoUpload }: Props) => {
  const [files, setFiles] = useState<any>([]);

  const [cropper, setCropper] = useState<Cropper>();

  const onCrop = () => {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => handlePhotoUpload(blob!));
    }
  };

  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <GridColumn width={4}>
        <Header sub color='teal' content='Step 1 - Add Photo' />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </GridColumn>
      <GridColumn width={1} />
      <GridColumn width={4}>
        <Header sub color='teal' content='Step 2 - Resize Photo' />
        {files && files.length > 0 && (
          <PhotoWidgetCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </GridColumn>
      <GridColumn width={1} />
      <GridColumn width={4}>
        <Header sub color='teal' content='Step 3 - Preview and Upload Photo' />
        {files && files.length > 0 && (
          <>
            <div
              className='img-preview'
              style={{ minHeight: 200, overflow: 'hidden' }}
            />
            <ButtonGroup widths={2}>
              <Button
                onClick={onCrop}
                positive
                icon='check'
                loading={uploading}
              />
              <Button
                onClick={() => setFiles([])}
                icon='close'
                disabled={uploading}
              />
            </ButtonGroup>
          </>
        )}
      </GridColumn>
    </Grid>
  );
};

export default PhotoUploadWidget;
