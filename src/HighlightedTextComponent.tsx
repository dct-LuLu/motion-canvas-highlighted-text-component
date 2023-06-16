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
};



export class HighlightedTxt extends Node {

  protected getConstantCharacterSize(font: string, fontSize: number, content: string): { width: number, height: number } {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = `${fontSize}px ${font}`;
    const width = ctx.measureText(content).width;
    const metrics = ctx.measureText("|");
    const height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    return { width, height };
  }

  //@initial(null)
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

  //@initial(null)
  @canvasStyleSignal()
  public declare readonly fill2: SimpleSignal<string, this>;


  public constructor(props: HighlightedProps) {
    super({
      ...props
    });


    this.add(
      <>
      <Rect
        fill={this.fill2() ?? this.fill}
        radius={this.roundedCorners ? 20 : 0}
        opacity={this.highlightOpacity}
        //position={this.position}
        width={createSignal(this.getConstantCharacterSize(this.fontFamily(), this.fontSize(), this.text()).width+30)}
        height={this.getConstantCharacterSize(this.fontFamily(), this.fontSize(), this.text()).height+30}
        />,
      <Txt
        fill={this.fill}
        fontFamily={this.fontFamily()}
        fontSize={this.fontSize}
        text={this.text}
        //position={this.position}
        opacity={this.textOpacity}
        y={4}
      />
      </>
    );

  }
}
