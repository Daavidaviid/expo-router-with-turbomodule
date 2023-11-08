/*global SkiaApi*/
import { useEffect, useMemo, useState } from "react";
import { Skia } from "../Skia";
import { FontSlant } from "../types";
import { Platform } from "../../Platform";
import { useTypeface } from "./Typeface";
const defaultFontSize = 14;
/**
 * Returns a Skia Font object
 * */

export const useFont = function (font) {
  let size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultFontSize;
  let onError = arguments.length > 2 ? arguments[2] : undefined;
  const typeface = useTypeface(font, onError);
  return useMemo(() => {
    if (typeface) {
      return Skia.Font(typeface, size);
    } else {
      return null;
    }
  }, [size, typeface]);
};
const defaultFontStyle = {
  fontFamily: "System",
  fontSize: defaultFontSize,
  fontStyle: "normal",
  fontWeight: "normal"
};

const slant = s => {
  if (s === "italic") {
    return FontSlant.Italic;
  } else if (s === "oblique") {
    return FontSlant.Oblique;
  } else {
    return FontSlant.Upright;
  }
};

const weight = fontWeight => {
  switch (fontWeight) {
    case "normal":
      return 400;

    case "bold":
      return 700;

    default:
      return parseInt(fontWeight, 10);
  }
};

export const matchFont = function () {
  let inputStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let fontMgr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Skia.FontMgr.System();
  const fontStyle = { ...defaultFontStyle,
    ...inputStyle
  };
  const style = {
    weight: weight(fontStyle.fontWeight),
    width: 5,
    slant: slant(fontStyle.fontStyle)
  };
  const typeface = fontMgr.matchFamilyStyle(fontStyle.fontFamily, style);
  return Skia.Font(typeface, fontStyle.fontSize);
};
export const listFontFamilies = function () {
  let fontMgr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Skia.FontMgr.System();
  return new Array(fontMgr.countFamilies()).fill(0).map((_, i) => fontMgr.getFamilyName(i));
};

const loadTypefaces = typefacesToLoad => {
  const promises = Object.keys(typefacesToLoad).flatMap(familyName => {
    return typefacesToLoad[familyName].map(typefaceToLoad => {
      return Skia.Data.fromURI(Platform.resolveAsset(typefaceToLoad)).then(data => {
        const tf = Skia.Typeface.MakeFreeTypeFaceFromData(data);

        if (tf === null) {
          throw new Error(`Couldn't create typeface for ${familyName}`);
        }

        return [familyName, tf];
      });
    });
  });
  return Promise.all(promises);
};

export const useFonts = sources => {
  const [fontMgr, setFontMgr] = useState(null);
  useEffect(() => {
    loadTypefaces(sources).then(result => {
      const fMgr = Skia.TypefaceFontProvider.Make();
      result.forEach(_ref => {
        let [familyName, typeface] = _ref;
        fMgr.registerFont(typeface, familyName);
      });
      setFontMgr(fMgr);
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return fontMgr;
};
//# sourceMappingURL=Font.js.map