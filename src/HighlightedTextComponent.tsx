import { initial, signal, colorSignal, canvasStyleSignal } from "@motion-canvas/2d/lib/decorators";
import { SignalValue, SimpleSignal, createSignal } from "@motion-canvas/core/lib/signals";
import { cancel, ThreadGenerator } from "@motion-canvas/core/lib/threading";
import { Reference, createRef } from "@motion-canvas/core/lib/utils";
import { loop, waitFor } from "@motion-canvas/core/lib/flow";
import { InterpolationFunction, TimingFunction } from "@motion-canvas/core/lib/tweening";
import { Txt, Rect, RectProps, TxtProps, NodeProps, Node } from "@motion-canvas/2d/lib/components";
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
};



export class HighlightedTxt extends Node {

  protected getConstantCharacterSize(font: string, fontSize: number, content: string): { width: number, height: number } {
    if (content.length === 0) return { width: 0, height: 0 };
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px ${font}`;
    let width = ctx.measureText(content).width;   
    const metrics = ctx.measureText("|");
    const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    console.log("width: " + width + " height: " + height);
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

  @initial(5)//7
  @signal()
  public declare readonly heightFix: SimpleSignal<number, this>;

  @signal()
  public declare readonly heightPadding: SimpleSignal<number, this>;

  @signal()
  public declare readonly widthPadding: SimpleSignal<number, this>;

  public textRef = createRef<Txt>();
  public highlightRef = createRef<Rect>();


  public constructor(props: HighlightedProps) {
    super({
      ...props
    });

    this.heightPadding = createSignal(() => this.fontSize() * 0.4);
    this.widthPadding = createSignal(() => this.fontSize() * 0.4);

    this.add(
      <>
      <Rect
        ref={this.highlightRef}
        fill={this.fill2() ?? this.fill}
        radius={this.roundedCorners() ? 20 : 0}
        opacity={this.highlightOpacity}
        width={() => this.text().length === 0 ? 0 : this.getConstantCharacterSize(this.fontFamily(), this.fontSize(), this.text()).width + this.widthPadding()}
        height={() => this.text().length === 0 ? 0 : this.getConstantCharacterSize(this.fontFamily(), this.fontSize(), this.text()).height+this.heightPadding()}
        />,
      <Txt
        ref={this.textRef}
        fill={this.fill}
        fontFamily={this.fontFamily()}
        fontSize={this.fontSize}
        text={this.text}
        opacity={this.textOpacity}
        y={this.adaptiveHeight() ? this.heightFix : 0}
      />
      </>
    );

  }
}
