import { NodeType } from "../../types";
import { processPath } from "../datatypes";
import { JsiDrawingNode } from "../DrawingNode";
export class TextNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.Text, props);
  }

  deriveProps() {
    const {
      font
    } = this.props;

    if (font === null) {
      return null;
    } else if (font === undefined) {
      console.warn("<Text />: the font property is mandatory on React Native Web");
      return null; // return this.Skia.Font(
      //   this.Skia.FontMgr.System().matchFamilyStyle("System", {
      //     width: 5,
      //     weight: 400,
      //     slant: 0,
      //   }),
      //   14
      // );
    }

    return font;
  }

  draw(_ref) {
    let {
      canvas,
      paint
    } = _ref;
    const {
      text,
      x,
      y
    } = this.props;
    const font = this.derived;

    if (font === undefined) {
      throw new Error("TextNode: font hasn't been derived");
    }

    if (font != null) {
      canvas.drawText(text, x, y, paint, font);
    }
  }

}
export class TextPathNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.TextPath, props);
  }

  deriveProps() {
    const path = processPath(this.Skia, this.props.path);
    const {
      font,
      initialOffset
    } = this.props;

    if (!font) {
      return null;
    }

    let {
      text
    } = this.props;
    const ids = font.getGlyphIDs(text);
    const widths = font.getGlyphWidths(ids);
    const rsx = [];
    const meas = this.Skia.ContourMeasureIter(path, false, 1);
    let cont = meas.next();
    let dist = initialOffset;

    for (let i = 0; i < text.length && cont; i++) {
      const width = widths[i];
      dist += width / 2;

      if (dist > cont.length()) {
        // jump to next contour
        cont = meas.next();

        if (!cont) {
          // We have come to the end of the path - terminate the string
          // right here.
          text = text.substring(0, i);
          break;
        }

        dist = width / 2;
      } // Gives us the (x, y) coordinates as well as the cos/sin of the tangent
      // line at that position.


      const [p, t] = cont.getPosTan(dist);
      const adjustedX = p.x - width / 2 * t.x;
      const adjustedY = p.y - width / 2 * t.y;
      rsx.push(this.Skia.RSXform(t.x, t.y, adjustedX, adjustedY));
      dist += width / 2;
    }

    return this.Skia.TextBlob.MakeFromRSXform(text, rsx, font);
  }

  draw(_ref2) {
    let {
      canvas,
      paint
    } = _ref2;

    if (!this.derived) {
      throw new Error("TextPathNode: blob is null");
    }

    canvas.drawTextBlob(this.derived, 0, 0, paint);
  }

}
export class TextBlobNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.TextBlob, props);
  }

  deriveProps() {
    return null;
  }

  draw(_ref3) {
    let {
      canvas,
      paint
    } = _ref3;
    const {
      blob,
      x,
      y
    } = this.props;
    canvas.drawTextBlob(blob, x, y, paint);
  }

}
export class GlyphsNode extends JsiDrawingNode {
  constructor(ctx, props) {
    super(ctx, NodeType.Glyphs, props);
  }

  deriveProps() {
    return this.props.glyphs.reduce((acc, glyph) => {
      const {
        id,
        pos
      } = glyph;
      acc.glyphs.push(id);
      acc.positions.push(pos);
      return acc;
    }, {
      glyphs: [],
      positions: []
    });
  }

  draw(_ref4) {
    let {
      canvas,
      paint
    } = _ref4;

    if (!this.derived) {
      throw new Error("GlyphsNode: processedGlyphs is null");
    }

    const {
      glyphs,
      positions
    } = this.derived;
    const {
      x,
      y,
      font
    } = this.props;

    if (font) {
      canvas.drawGlyphs(glyphs, positions, x, y, font, paint);
    }
  }

}
//# sourceMappingURL=Text.js.map