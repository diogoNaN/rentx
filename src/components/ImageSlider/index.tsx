import React from "react";
import { useTheme } from "styled-components";

import { Container, Indexes, Index, CarWrapper, CarImage } from "./styles";

type ImageSliderProps = {
  images: string[];
};

export const ImageSlider: React.FC<ImageSliderProps> = (props) => {
  const theme = useTheme();

  const { images } = props;

  return (
    <Container>
      <Indexes>
        <Index active={true} />
        <Index active={false} />
        <Index active={false} />
        <Index active={false} />
      </Indexes>

      <CarWrapper>
        <CarImage source={{ uri: images[0] }} resizeMode={"contain"} />
      </CarWrapper>
    </Container>
  );
};
