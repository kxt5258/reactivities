import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Header, Icon } from 'semantic-ui-react';

interface Props {
  setFiles: (files: any) => void;
}

const PhotoWidgetDropzone = ({ setFiles }: Props) => {
  const dzSTyle = {
    border: 'dashed 3px #eee',
    borderColor: '#eee',
    borderRaduis: '5px',
    paddingTop: '30px',
    textAlign: 'center' as 'center',
    height: 200,
  };

  const dzActive = {
    borderColor: 'green',
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      // Do something with the files
      setFiles(
        acceptedFiles.map((file: any) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
    [setFiles],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={isDragActive ? { ...dzSTyle, ...dzActive } : { ...dzSTyle }}>
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop Image Here' />
    </div>
  );
};

export default PhotoWidgetDropzone;
