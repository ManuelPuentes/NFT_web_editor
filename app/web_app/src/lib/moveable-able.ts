export const DimensionViewable = {
    name: 'dimensionViewable',
    props: [],
    events: [],
    render(moveable: any, React: any) {
        const rect = moveable.getRect();
        return React.createElement(
            'div',
            {
                key: 'dimension-viewer',
                className: 'moveable-dimension',
                style: {
                    position: 'absolute',
                    left: `${rect.width / 2}px`,
                    top: `${rect.height + 20}px`,
                    background: '#4af',
                    borderRadius: '2px',
                    padding: '2px 4px',
                    color: 'white',
                    fontSize: '13px',
                    whiteSpace: 'nowrap',
                    fontWeight: 'bold',
                    willChange: 'transform',
                    transform: `translate(-50%, 0px)`
                }
            },
            [
                '\n            ',
                Math.round(rect.offsetWidth),
                ' x ',
                Math.round(rect.offsetHeight),
                '\n        '
            ]
        );
    }
};