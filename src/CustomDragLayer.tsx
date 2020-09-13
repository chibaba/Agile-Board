import { useDragLayer, XYCoord } from "react-dnd";
import { Column } from "./Column";
import { CustomDragLayerContainer } from "./styles";

function getItemStyles(currentOffset: XYCoord | null): Resct.CSSProperties {
    if (!currentOffset) {
        return {
            display: "none",
        };
    }
    const { x, y } = currentOffset;

    const transform = `translate(${x}px, ${y}px)`;

    return {
        transform,
        WebKitTransform: transform,
    };
}

const CustomDragLayer: React.FC = () => {
    const { isDragging, item, currentOffset } = useDragLayer((monitor) => ({
        item: monitor.getItem(),
        isDragging: monitor.isDragging(),
    }));
    return isDragging ? (
        <CustomDragLayerContainer>
            <div style={getItemStyles(currentOffset)}>
                <Column id={item.id} text={item.text} index={item.index} />
            </div>
        </CustomDragLayerContainer>
    ) : null;
};
