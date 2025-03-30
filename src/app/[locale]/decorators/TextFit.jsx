import React from "react";

class TextFit extends React.Component {
    constructor(props) {
        super(props);
        this.containerRef = React.createRef();
        this.textRef = React.createRef();
        this.state = {
            fontSize: props.minFontSize || 16,
        };

        this.handleResize = this.handleResize.bind(this);
        this.fitText = this.fitText.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        this.fitText();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.children !== this.props.children) {
            this.fitText();
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    handleResize() {
        this.fitText();
    }

    doesTextFit(size) {
        if (!this.containerRef.current || !this.textRef.current) return false;

        this.textRef.current.style.fontSize = size + "px";

        const { scrollWidth, scrollHeight } = this.textRef.current;
        const containerWidth = this.containerRef.current.offsetWidth;
        const containerHeight = this.containerRef.current.offsetHeight;

        return scrollWidth <= containerWidth && scrollHeight <= containerHeight;
    }

    fitText() {
        const minFontSize = this.props.minFontSize || 10;
        const maxFontSize = this.props.maxFontSize || 200;

        if (!this.containerRef.current || !this.textRef.current) return;

        let left = minFontSize;
        let right = maxFontSize;
        let bestSize = left;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);

            if (this.doesTextFit(mid)) {
                bestSize = mid;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        this.setState({ fontSize: bestSize });
    }

    render() {
        const containerStyle = {
            width: "100%",
            height: "100%",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        };

        const textStyle = {
            margin: 0,
            padding: 0,
            fontSize: this.state.fontSize,
            whiteSpace: "nowrap",
        };

        return (
            <div ref={this.containerRef} style={containerStyle}>
                <div ref={this.textRef} style={textStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default TextFit;
