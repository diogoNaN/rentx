import React from "react";

import { Container } from "./styles";

type BulletProps = {
  active?: boolean;
};

export const Bullet: React.FC<BulletProps> = (props) => {
  const { active = false } = props;

  return <Container active={active} />;
};
