import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";
import { Bullet } from "../Bullet";

import { Container, Bullets, CarWrapper, CarImage } from "./styles";

type ImageSliderProps = {
  images: {
    id: string;
    photo: string;
  }[];
};

type ChangeImageProps = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

export const ImageSlider: React.FC<ImageSliderProps> = (props) => {
  const [imageIndex, setImageIndex] = useState(0);

  const { images } = props;

  const onChangeItem = useRef((info: ChangeImageProps) => {
    const index = info.viewableItems[0].index!;
    setImageIndex(index);
  });

  return (
    <Container>
      <Bullets>
        {images.map((item, index) => (
          <Bullet key={item.id} active={imageIndex === index} />
        ))}
      </Bullets>

      <FlatList
        horizontal
        data={images}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CarWrapper>
            <CarImage source={{ uri: item.photo }} resizeMode={"contain"} />
          </CarWrapper>
        )}
        onViewableItemsChanged={onChangeItem.current}
      />
    </Container>
  );
};
