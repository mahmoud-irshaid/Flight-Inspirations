import { Component } from "react";
import { Props, State } from "./ErrorBoundary.type";
import "./ErrorBoundary.style.css";

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-root">
          <h1>Something went wrong !</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
