import React, { useRef, useState } from "react";
import { FlatList, ViewToken } from "react-native";

import { Container, Indexes, Index, CarWrapper, CarImage } from "./styles";

type ImageSliderProps = {
  images: string[];
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
    console.log(info.viewableItems.length);
    setImageIndex(index);
  });

  return (
    <Container>
      <Indexes>
        {images.map((_, index) => (
          <Index key={String(index)} active={imageIndex === index} />
        ))}
      </Indexes>

      <FlatList
        horizontal
        data={images}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CarWrapper>
            <CarImage source={{ uri: item }} resizeMode={"contain"} />
          </CarWrapper>
        )}
        onViewableItemsChanged={onChangeItem.current}
      />
    </Container>
  );
};
