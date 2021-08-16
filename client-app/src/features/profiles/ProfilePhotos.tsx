import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Card,
  CardGroup,
  Grid,
  GridColumn,
  Header,
  Image,
  TabPane,
} from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/ImageUpload/PhotoUploadWidget';
import { Photo, Profile } from '../../app/models/Profile';
import { useStore } from '../../app/stores/store';

interface Props {
  profile: Profile;
}

const ProfilePhotos = ({ profile }: Props) => {
  const {
    profileStore: {
      isCurrentUser,
      uploadPhoto,
      uploading,
      setMainPhoto,
      loading,
      deletePhoto,
    },
  } = useStore();
  const [addPhotoMode, setAddPhotoMode] = useState(false);
  const [target, setTarget] = useState('');

  const handlePhotoUpload = (file: Blob) => {
    uploadPhoto(file).then(() => setAddPhotoMode(false));
  };

  const handleSetMainPhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>,
  ) => {
    setTarget(e.currentTarget.name);
    setMainPhoto(photo);
  };

  const handleDeletePhoto = (
    photo: Photo,
    e: SyntheticEvent<HTMLButtonElement>,
  ) => {
    setTarget(e.currentTarget.name);
    deletePhoto(photo);
  };

  return (
    <TabPane>
      <Grid>
        <GridColumn width={16}>
          <Header icon='image' content='Photos' floated='left' />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={addPhotoMode ? 'Cancel' : 'Add Photo'}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </GridColumn>
        <GridColumn width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget
              handlePhotoUpload={handlePhotoUpload}
              uploading={uploading}
            />
          ) : (
            <CardGroup itemsPerRow={5}>
              {profile.photos?.map((photo) => (
                <Card key={photo.id}>
                  <Image src={photo.url} />
                  {isCurrentUser && (
                    <ButtonGroup fluid widths={2}>
                      <Button
                        basic
                        color='green'
                        content='Main'
                        name={'main' + photo.id}
                        disabled={photo.isMain}
                        onClick={(e) => handleSetMainPhoto(photo, e)}
                        loading={target === 'main' + photo.id && loading}
                      />

                      <Button
                        basic
                        color='red'
                        icon='trash'
                        name={photo.id}
                        loading={target === photo.id && loading}
                        onClick={(e) => handleDeletePhoto(photo, e)}
                        disabled={photo.isMain}
                      />
                    </ButtonGroup>
                  )}
                </Card>
              ))}
            </CardGroup>
          )}
        </GridColumn>
      </Grid>
    </TabPane>
  );
};

export default observer(ProfilePhotos);
