// src/components/utils/WritingCanvas.tsx

import React, {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Stage, Layer, Line, Rect } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import type Konva from 'konva';

export type CanvasHandle = {
  reset: () => void;
  getStage: () => Konva.Stage | null;
};

// PERBAIKAN: Tambahkan `imageUrl` ke props untuk membuatnya dinamis
type WritingCanvasProps = {
  imageUrl: string;
};

const WritingCanvas = forwardRef<CanvasHandle, WritingCanvasProps>(
  ({ imageUrl }, ref) => {
    // ... sisa kode tidak perlu diubah ...
    type LineType = { points: number[] };
    const [lines, setLines] = useState<LineType[]>([]);
    const isDrawing = useRef(false);
    const stageRef = useRef<Konva.Stage>(null);

    const resetCanvas = () => {
      setLines([]);
    };

    useImperativeHandle(ref, () => ({
      reset: resetCanvas, // Ekspos fungsi reset
      getStage: () => stageRef.current, // Ekspos akses ke stage
    }));

    const handleMouseDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      isDrawing.current = true;
      const pos = e.target.getStage()?.getPointerPosition();
      if (pos) {
        setLines([...lines, { points: [pos.x, pos.y] }]);
      }
    };

    const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
      if (!isDrawing.current) return;
      const stage = e.target.getStage();
      if (stage) {
        const point = stage.getPointerPosition();
        const lastLine = lines[lines.length - 1];
        if (lastLine && point) {
          lastLine.points = lastLine.points.concat([point.x, point.y]);
          lines.splice(lines.length - 1, 1, lastLine);
          setLines(lines.concat());
        }
      }
    };

    const handleMouseUp = () => {
      isDrawing.current = false;
    };

    const canvasWidth = 500; // Tentukan lebar kanvas
    const canvasHeight = 500; // Tentukan tinggi kanvas

    return (
      <div className="relative h-[500px] w-[500px]">
        <img
          className="absolute top-0 left-0 z-10 h-full w-full object-cover opacity-30"
          src={imageUrl} // PERBAIKAN: Gunakan prop imageUrl yang dinamis
        ></img>
        <Stage
          width={500}
          height={500}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          style={{
            border: '2px dashed #555',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 10,
          }}
          ref={stageRef}
        >
          <Layer>
            <Rect width={canvasWidth} height={canvasHeight} />
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="black"
                strokeWidth={30}
                tension={0.5}
                lineCap="round"
              />
            ))}
          </Layer>
        </Stage>
      </div>
    );
  }
);

export default WritingCanvas;
