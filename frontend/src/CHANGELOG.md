# Changes Implemented

1. **Center and Auto-fit Diagram**:
   - Modified `Mermaid.jsx` to disable `useMaxWidth`. This prevents the diagram from being artificially constrained or left-aligned.
   - Simplified the `Mermaid` component to use a flex container that fills the available space.
   - Updated `ProjectViewer.jsx`'s `TransformComponent` to use a flex-centered container (`w-full h-full min-w-full min-h-full flex items-center justify-center`). This ensures that small diagrams are centered and large diagrams can expand freely.

2. **High Quality Export**:
   - Updated `exportDiagram` function to use `pixelRatio: 4` (High Resolution) for PNG exports.
   - Improved PDF export to use the `pixelRatio: 4` image and set the PDF page size to match the diagram's dimensions, ensuring no cropping or scaling loss.
   - Cleaned up export logic to ensure background colors are consistent.

3. **Zoom & Interaction**:
   - Retained `react-zoom-pan-pinch` with `centerOnInit` to automatically center the diagram on load.
   - The flexible container allows the user to pan continuously even beyond the diagram borders, providing a comfortable workspace.
