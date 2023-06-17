import { initial, signal, canvasStyleSignal } from "@motion-canvas/2d/lib/decorators";
import { SignalValue, SimpleSignal, createSignal } from "@motion-canvas/core/lib/signals";
import { createRef } from "@motion-canvas/core/lib/utils";
import { Txt, Rect, NodeProps, Node } from "@motion-canvas/2d/lib/components";
import { PossibleCanvasStyle } from "@motion-canvas/2d/lib/partials";

export interface HighlightedProps extends NodeProps {
  text: string;
  fontSize?: number;
  fontFamily?: string;
  roundedCorners?: boolean;
  highlightOpacity?: number;
  textOpacity?: number;
  fill: SignalValue<PossibleCanvasStyle>;
  fill2?: SignalValue<PossibleCanvasStyle>;
  adaptiveHeight?: boolean;
  heightFix?: number;
  heightPadding?: number;
  widthPadding?: number;
  outlined?: boolean;
};



export class HighlightedTxt extends Node {

  private static ctx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d');

  protected getConstantCharacterSize(font: string, fontSize: number, content: string): { width: number, height: number } {
    if (content.length === 0) return { width: 0, height: 0 };
    HighlightedTxt.ctx.font = `${fontSize}px ${font}`;
    const width = HighlightedTxt.ctx.measureText(content).width;
    const metrics = HighlightedTxt.ctx.measureText("|");
    const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return { width, height };
  }


  @signal()
  public declare readonly text: SimpleSignal<string, this>;

  @initial(50)
  @signal()
  public declare readonly fontSize: SimpleSignal<number, this>;

  @initial('JetBrains Mono')
  @signal()
  public declare readonly fontFamily: SimpleSignal<string, this>;

  @initial(true)
  @signal()
  public declare readonly roundedCorners: SimpleSignal<boolean, this>;

  @initial(0.3)
  @signal()
  public declare readonly highlightOpacity: SimpleSignal<number, this>;

  @initial(1)
  @signal()
  public declare readonly textOpacity: SimpleSignal<number, this>;

  @canvasStyleSignal()
  public declare readonly fill: SimpleSignal<string, this>;

  @canvasStyleSignal()
  public declare readonly fill2: SimpleSignal<string, this>;

  @initial(true)
  @signal()
  public declare readonly adaptiveHeight: SimpleSignal<boolean, this>;

  @initial(5)
  @signal()
  public declare readonly heightFix: SimpleSignal<number, this>;

  @signal()
  public declare readonly heightPadding: SimpleSignal<number, this>;

  @signal()
  public declare readonly widthPadding: SimpleSignal<number, this>;

  @initial(false)
  @signal()
  public declare readonly outlined: SimpleSignal<boolean, this>;


  public constructor(props: HighlightedProps) {
    super({
      ...props
    });

    this.heightPadding = createSignal(() => this.fontSize() * 0.4);
    this.widthPadding = createSignal(() => this.fontSize() * 0.4);

    this.add(
      <>
      <Rect
        fill={() => {
          if (this.outlined() === true) return null;
          if (this.fill2() == undefined) return this.fill();
          return this.fill2();
        }}
        radius={() => this.roundedCorners() ? 20 : 0}
        opacity={() => this.text().length === 0 ? 0 : this.highlightOpacity()}
        width={() => this.getConstantCharacterSize(this.fontFamily(), this.fontSize(), this.text()).width + this.widthPadding()}
        height={() => this.getConstantCharacterSize(this.fontFamily(), this.fontSize(), this.text()).height+this.heightPadding()}
        stroke={() => this.outlined() ? this.fill() : null}
        lineWidth={() => this.outlined() ? 6 : null}
        />,
      <Txt
        fill={() => this.fill()}
        fontFamily={() => this.fontFamily()}
        fontSize={() => this.fontSize()}
        text={() => this.text()}
        opacity={() => this.textOpacity()}
        y={() => this.adaptiveHeight() ? this.heightFix() : 0}
      />
      </>
    );

  }
}
