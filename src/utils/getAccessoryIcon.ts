import SpeedSvg from "../assets/speed.svg";
import AccelerationSvg from "../assets/acceleration.svg";
import ForceSvg from "../assets/force.svg";
import GasolineSvg from "../assets/gasoline.svg";
import ElectricSvg from "../assets/energy.svg";
import HybridSvg from "../assets/hybrid.svg";
import ExchangeSvg from "../assets/exchange.svg";
import PeopleSvg from "../assets/people.svg";
import DefaultSvg from "../assets/car.svg";

export const getAccessoryIcon = (accessoryName: string) => {
  switch (accessoryName) {
    case "speed": {
      return SpeedSvg;
    }
    case "acceleration": {
      return AccelerationSvg;
    }
    case "turning_diameter": {
      return ForceSvg;
    }
    case "gasoline_motor": {
      return GasolineSvg;
    }
    case "electric_motor": {
      return ElectricSvg;
    }
    case "hybrid_motor": {
      return HybridSvg;
    }
    case "exchange": {
      return ExchangeSvg;
    }
    case "seats": {
      return PeopleSvg;
    }
    default: {
      return DefaultSvg;
    }
  }
};
