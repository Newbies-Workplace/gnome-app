import BottomSheet, { BottomSheetModal } from "@gorhom/bottom-sheet";
import { cssInterop } from "nativewind";
import Svg, { Circle, Rect, Text as SvgText } from "react-native-svg";

export const setupCssInterop = () => {
  cssInterop(BottomSheet, {
    backgroundClassName: { target: "backgroundStyle" },
    handleIndicatorClassName: { target: "handleIndicatorStyle" },
  });
  cssInterop(BottomSheetModal, {
    backgroundClassName: { target: "backgroundStyle" },
    handleIndicatorClassName: { target: "handleIndicatorStyle" },
  });

  cssInterop(Svg, {
    className: {
      target: "style",
      nativeStyleToProp: { width: true, height: true },
    },
  });
  cssInterop(Circle, {
    className: {
      target: "style",
      nativeStyleToProp: {
        width: true,
        height: true,
        stroke: true,
        strokeWidth: true,
        fill: true,
      },
    },
  });
  cssInterop(Rect, {
    className: {
      target: "style",
      nativeStyleToProp: {
        width: true,
        height: true,
        stroke: true,
        borderRadius: true,
        strokeWidth: true,
        fill: true,
      },
    },
  });
  cssInterop(SvgText, {
    className: {
      target: "style",
      nativeStyleToProp: {
        stroke: true,
        fill: true,
      },
    },
  });
};
